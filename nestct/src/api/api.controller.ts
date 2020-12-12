import {
	Controller,
	Get, Post, Put, Delete,
	Param,
	Body,
	Session,
	Request,
	UseGuards
} from '@nestjs/common';

//auth
import { SessionAuthGuard } from '../auth/session-auth-guard';
import { SessionGuard } from '../auth/session-guard';

//services
import { ContactService } from './contact.service';

//types
import { User, Contact, ContactCreateInput, ContactUpdateInput } from '@prisma/client';
import { Ret } from '../shared/return'

@UseGuards(SessionGuard)
@Controller('api')
export class ApiController {
	constructor(
		//private readonly userService: UserService,
		private readonly contactService: ContactService,
		
	) {}

	@Get('contact/:id')
	async getContactById(@Param('id') id: string): Promise< Ret<Contact> >{
		return await this.contactService.getContact({ id: Number(id) });
	}

	@UseGuards(SessionGuard)
	@Get('contacts')
	async getContacts( @Session() session: any ): Promise< Ret<any> > {
		const id = session.passport.user.id
		const contacts = await this.contactService.getContacts(id)

		return contacts
	}

	@UseGuards(SessionGuard)
	@Get('contacts/:searchQuery')
	async getContactsByLetter( @Param('searchQuery') searchQuery: string, @Session() session: any ): Promise< Ret<any> > {
		const id = session.passport.user.id
		const contacts = await this.contactService.getContactsSearch(id, searchQuery)

		return contacts
	}

	@UseGuards(SessionGuard)
	@Post('contact')
	async createContact( @Request() req, @Body() userReq: any ): Promise< Ret<any> > {
		const id = req.user.id
		const contact = await this.contactService.createContact(userReq, id);
		return contact
	}

	@Put('contact')
	async updateContact( @Body() userReq: any, @Request() req ): Promise< Ret<Contact> > {
		const userId = req.user.id
		const hasPermission = await this.contactService.authContact(userId, userReq.id)
		const basicContact = await this.contactService.updateContact(userReq)
		
		return basicContact
	}
	
	@Post('contact/fields')
	async deleteContactFields( @Body() userReq: any, @Request() req ): Promise< Ret<Contact> > {
		const userId = req.user.id
		// const hasPermission = await this.contactService.authContact(userId, userReq.id)
		const contact = await this.contactService.deleteContactFields(userReq)
		
		return contact
	}

	@Delete('contact/:id')
	async deleteContact( @Param('id') contactId: string, @Body() userReq: any, @Request() req ): Promise< Ret<any> > {
		const userId = req.user.id
		// const hasPermission = await this.contactService.authContact(userId, userReq.id)
		const contact = await this.contactService.deleteContact(userId, Number( contactId ))
		console.log(contact)
		
		return contact
	}
	// @Get('post/:id')
	// async getPostById(@Param('id') id: string): Promise<PostModel> {
	// 	return this.postService.post({ id: Number(id) });
	// }

	// @Get('feed')
	// async getPublishedPosts(): Promise<PostModel[]> {
	// 	return this.postService.posts({
	// 		where: { published: true },
	// 	});
	// }

	// @Get('filtered-posts/:searchString')
	// async getFilteredPosts(
	// 	@Param('searchString') searchString: string,
	// ): Promise<PostModel[]> {
	// 	return this.postService.posts({
	// 		where: {
	// 			OR: [
	// 				{
	// 					title: { contains: searchString },
	// 				},
	// 				{
	// 					content: { contains: searchString },
	// 				},
	// 			],
	// 		},
	// 	});
	// }

	// @Post('post')
	// async createDraft(
	// 	@Body() postData: { title: string; content?: string; authorEmail: string },
	// ): Promise<PostModel> {
	// 	const { title, content, authorEmail } = postData;
	// 	return this.postService.createPost({
	// 		title,
	// 		content,
	// 		User: {
	// 			connect: { email: authorEmail },
	// 		},
	// 	});
	// }

	// @Post('user')
	// async signupUser(
	// 	@Body() userData: { name?: string; email: string },
	// ): Promise<UserModel> {
	// 	return this.userService.createUser(userData);
	// }

	// @Put('publish/:id')
	// async publishPost(@Param('id') id: string): Promise<PostModel> {
	// 	return this.postService.updatePost({
	// 		where: { id: Number(id) },
	// 		data: { published: true },
	// 	});
	// }

	// @Delete('post/:id')
	// async deletePost(@Param('id') id: string): Promise<PostModel> {
	// 	return this.postService.deletePost({ id: Number(id) });
	// }
}