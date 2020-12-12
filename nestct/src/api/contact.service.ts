import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
	ContactUpdateInput,
	Contact,
	ContactCreateInput,
	ContactWhereUniqueInput,
	ContactWhereInput,
	
	EmailUpdateManyMutationInput
} from '@prisma/client';

import { CreateContact } from './dto/CreateContact'
import { UpdateEmail, UpdateNumber, CreateNumber, CreateEmail } from './dto/UpdateContact'
import { Ret } from '../shared/return'

@Injectable()
export class ContactService {
	constructor(private prisma: PrismaService) {}

	async getContact(contactWhereUniqueInput: ContactWhereUniqueInput): Promise< Ret<Contact> > {
		const ret = new Ret<Contact>()

		try {
			const contact = await this.prisma.contact.findOne({
				include: {
					//all other properties are true by default
					email: true,
					number: true,
				},
				where: contactWhereUniqueInput,
			});

			ret.o = contact
			ret.success = true
			return ret
		}
		catch (err) {
			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}	

	async getContacts(userId: number): Promise< Ret<any> > {
		const ret = new Ret<any>()

		try {
			const contacts = await this.prisma.contact.findMany({

				where: {
					users: {
						some: {
							user: {
								id: {
									equals: userId
								}
							}
						}
					}
				}
			})

			ret.o = contacts
			ret.success = true
			return ret
		}
		catch (err) {
			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getContactsSearch(userId: number, searchQuery: string): Promise< Ret<any> > {
		const ret = new Ret<any>()

		try {
			const contacts = await this.prisma.contact.findMany({
				where: {
					users: {
						some: {
							user: {
								id: {
									equals: userId
								},
							}
						}
					},
					AND: {
						firstName: {
							startsWith: searchQuery,
							mode: 'insensitive'
						}
					}
				}
			})

			ret.o = contacts
			ret.success = true
			return ret
		}
		catch (err) {
			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async createContact(createContact: CreateContact, id: number): Promise< Ret<Contact> > {
		const ret = new Ret<Contact>()
		
		try {
			const contact = await this.prisma.contact.create({
				include: {
					//all other properties are true by default
					email: true,
					number: true,
				},
				data: {
					firstName: createContact.firstName,
					lastName: createContact.lastName,
					photo: createContact.photo,
					email: {
						create: createContact.email,
					},
					number: {
						create: createContact.number,
					},

					users: {
						create: {
							user: {
								connect: {
									id: id
								}
							}
						}
					},
				}
			})

			ret.o = contact
			ret.success = true

			return ret
		}
		catch (err) {
			if (err.code === 'P2002') {
				ret.message = 'Error creating user, user already exists!'
				return ret
			}

			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async updateContact(updateReq: any): Promise< Ret<Contact> > {
		const ret = new Ret<any>()
		let createEmails = []
		let updateEmails = []
		
		let createNumbers = []
		let updateNumbers = []

		try {
			if (updateReq.email && updateReq.email.length) { //if property exists
				updateReq.email.forEach( i => {
					if (i.id) {
						updateEmails.push( new UpdateEmail(i) )
					}
					else  {
						createEmails.push( new CreateEmail(i) )
					}
				})
			}

			if (updateReq.number && updateReq.number.length) { //if property exists
				updateReq.number.forEach( i => {
					if (i.id) {
						updateNumbers.push( new UpdateNumber(i) )
					}
					else  {
						createNumbers.push( new CreateNumber(i) )
					}
				})
			}

			const updateContact = await this.prisma.contact.update({
				data: {
					firstName: updateReq.firstName,
					lastName: updateReq.lastName,
					photo: updateReq.photo,
					email: {
						update: updateEmails
					},
					number: {
						update: updateNumbers
					}
				},
				where: {
					id: updateReq.id
				}
			})

			const createContactFields = await this.prisma.contact.update({
				where: {
					id: updateReq.id
				},
				data: {
					email: {
						create: createEmails
					},
					number: {
						create: createNumbers
					}
				}
			})

			ret.o = createContactFields
			ret.success = true
			return ret
		}
		catch (err) {
			if (err.code === 'P2016') {
				ret.message = `You do not have permission to access this relation`
				return ret
			}

			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deleteContactFields(userReq: any): Promise< Ret<Contact> > {
		const ret = new Ret<any>()

		const deleteNums = []
		const deleteEmails = []

		try {
			if (userReq.number && userReq.number.length) { //if property exists
				userReq.number.forEach(i => {
					deleteNums.push(i.id)
				})
			}
			
			if (userReq.email && userReq.email.length) { //if property exists
				userReq.email.forEach(i => {
					deleteEmails.push(i.id)
				})
			}

			const deleteNumFields = await this.prisma.number.deleteMany({
				where: {
					id: {
						in: deleteNums
					}
				}
			})

			const deleteEmailFields = await this.prisma.email.deleteMany({
				where: {
					id: {
						in: deleteEmails
					}
				}
			})

			ret.o = deleteNumFields //combine num and email response?
			ret.success = true
			return ret
		}
		catch (err) {
			console.log(err)
			if (err.code === 'P2016') {
				ret.message = `You do not have permission to access this relation`
				return ret
			}

			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deleteContact(userId: number, contactId: number): Promise< Ret<any> > {
		const ret = new Ret<any>()

		try {
			const userContact = this.prisma.userContact.delete({
				where: {
					userId_contactId: {
						userId: userId,
						contactId: contactId,
					}
				}
			});

			const numbers = this.prisma.number.deleteMany({
				where: {
					contactId: contactId
				}
			})

			const emails = this.prisma.email.deleteMany({
				where: {
					contactId: contactId
				}
			})

			const contact = this.prisma.contact.delete({
				where: {
					id: contactId
				}
			})

			const [res1, res2, res3, res4] = await this.prisma.$transaction([userContact, numbers, emails, contact])

			ret.o = contact
			ret.success = true
			return ret
		}
		catch (err) {
			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}	

	async authContact(userId: number, contactId: number): Promise< boolean > {
		try {
			const contact = await this.prisma.userContact.findOne({
				where: {
					userId_contactId: {
						userId: userId,
						contactId: contactId
					}
				}
			})

			
			if (!contact) { //if null (invalid relation/perms)
				throw new HttpException('', HttpStatus.UNAUTHORIZED)
			}

			return true
		}
		catch (err) {
			//if contact doesn't exist
			// if (err.code === 'ERRCODE123') {

			// 	ret.message = `contact doesn't exist`
			// 	return ret
			// }
			console.log(err)
			if (err.status === 401) {
				throw new HttpException('You do not have permission to access this contact', HttpStatus.UNAUTHORIZED)
			}
			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	// async posts(params: {
	// 	skip?: number;
	// 	take?: number;
	// 	cursor?: PostWhereUniqueInput;
	// 	where?: PostWhereInput;
	// 	orderBy?: PostOrderByInput;
	// }): Promise<Post[]> {
	// 	const { skip, take, cursor, where, orderBy } = params;
	// 	return this.prisma.post.findMany({
	// 		skip,
	// 		take,
	// 		cursor,
	// 		where,
	// 		orderBy,
	// 	});
	// }

	// async createPost(data: PostCreateInput): Promise<Post> {
	// 	return this.prisma.post.create({
	// 		data,
	// 	});
	// }

	// async updatePost(params: {
	// 	where: PostWhereUniqueInput;
	// 	data: PostUpdateInput;
	// }): Promise<Post> {
	// 	const { data, where } = params;
	// 	return this.prisma.post.update({
	// 		data,
	// 		where,
	// 	});
	// }

	// async deletePost(where: PostWhereUniqueInput): Promise<Post> {
	// 	return this.prisma.post.delete({
	// 		where,
	// 	});
	// }
}