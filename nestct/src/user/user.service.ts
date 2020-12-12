import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
	UserUpdateInput,
	User,
	UserCreateInput,
	UserWhereUniqueInput,
	UserWhereInput,
	UserOrderByInput,
} from '@prisma/client';

import { Ret } from '../shared/return'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async register(userCreateInput: UserCreateInput): Promise< Ret<User | null> > {
		const ret = new Ret<User>()

		try {
			const user = await this.prisma.user.create({
				data: userCreateInput
			})

			delete user.password //remove password
			
			ret.o = user
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
	
	async getUser(userWhereUniqueInput: UserWhereUniqueInput): Promise< Ret<User> > {
		const ret = new Ret<User>()

		try {
			const user = await this.prisma.user.findOne({
				where: userWhereUniqueInput,
			});

			ret.o = user
			ret.success = true

			return ret
		}
		catch (err) {

			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getUsers(params: {
		skip?: number;
		take?: number;
		cursor?: UserWhereUniqueInput;
		where?: UserWhereInput;
		orderBy?: UserOrderByInput;
	}): Promise< Ret<any> > {
		const { skip, take, cursor, where, orderBy } = params;
		const ret = new Ret<any>()

		try {
			const users = await this.prisma.user.findMany({
				skip,
				take,
				cursor,
				where,
				orderBy,
			})

			ret.o = users
			ret.success = true
			return ret
		}
		catch (err) {
			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deleteUser(userWhereUniqueInput: UserWhereUniqueInput): Promise< Ret<User> > {
		const ret = new Ret<User>()

		try {
			const user = await this.prisma.user.delete({
				where: userWhereUniqueInput
			})
			
			ret.o = user
			ret.success = true

			return ret
		}
		catch (err) {
			if (err.code === 'P2016') {
				ret.message = `User doesn't exist`
				return ret
			}

			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async updateUser(params: { where: UserWhereUniqueInput; data: UserUpdateInput;}): Promise< Ret<User> > {
		const ret = new Ret<any>()
		const { where, data } = params;

		try {
			const user = await this.prisma.user.update({
				where,
				data
			})

			ret.o = user
			ret.success = true
			return ret
		}
		catch (err) {

			throw new HttpException('internal error', HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	// async updateUser ( 
	// params: { where: UserWhereUniqueInput; data: UserUpdateInput;}): Promise<User> {

	// 	const { where, data } = params;
	// 	return this.prisma.user.update({
	// 		data,
	// 		where,
	// 	});
	// }

}

// 	async user(userWhereUniqueInput: UserWhereUniqueInput): Promise<User | null> {
// 		return this.prisma.user.findOne({
// 			where: userWhereUniqueInput,
// 		});
// 	}

// 	async users(params: {
// 		skip?: number;
// 		take?: number;
// 		cursor?: UserWhereUniqueInput;
// 		where?: UserWhereInput;
// 		orderBy?: UserOrderByInput;
// 	}): Promise<User[]> {
// 		const { skip, take, cursor, where, orderBy } = params;
// 		return this.prisma.user.findMany({
// 			skip,
// 			take,
// 			cursor,
// 			where,
// 			orderBy,
// 		});
// 	}

// 	async createUser(data: UserCreateInput): Promise<User> {
// 		return this.prisma.user.create({
// 			data,
// 		});
// 	}

// 	async updateUser(params: {
// 		where: UserWhereUniqueInput;
// 		data: UserUpdateInput;
// 	}): Promise<User> {
// 		const { where, data } = params;
// 		return this.prisma.user.update({
// 			data,
// 			where,
// 		});
// 	}

// 	async deleteUser(where: UserWhereUniqueInput): Promise<User> {
// 		return this.prisma.user.delete({
// 			where,
// 		});
// 	}
// }