import { 
	Body,
	Controller,
	Get, Post, Put, Delete,
	Param,
	UseGuards,
	Session,
	HttpException,
	HttpStatus
} from '@nestjs/common';

//auth
import { SessionAuthGuard } from '../auth/session-auth-guard';
import { SessionGuard } from '../auth/session-guard';

//services
import { UserService } from './user.service';

//types
import { User, UserUpdateInput } from '@prisma/client';
import { Ret } from '../shared/return'

@Controller('user')
export class UserController {
	constructor( private readonly userService: UserService ) {}

	@Post('register') //needs to be an unauthorized route
	async registerUser( @Body() userReq: User ): Promise< Ret<User> > {
		const user = await this.userService.register(userReq);
		return user
	}

	// @Get() //implement get users funcionality for multiple contacts
	// async getUsers(): Promise< any > {
	// 	const users = await this.userService.getUsers({})
	// 	return users
	// }

	@UseGuards(SessionGuard)
	@Get()
	async getUser( @Session() session: any ): Promise< Ret<User> > {
		const id = session.passport.user.id
		const userId = { id: id }
		const user = await this.userService.getUser(userId)
		return user
	}

	//only for dev (raed@raed.raed)
	@UseGuards(SessionGuard)
	@Delete('/:id')
	async deleteUser( @Param('id') id: string, @Session() session: any ): Promise< any > {
		if (session.passport.user.id !== 1) {
			throw new HttpException ('not authorized to access this route', HttpStatus.FORBIDDEN)
		}

		const userId = { id: Number(id) }
		const user = await this.userService.deleteUser(userId);
		return user
	}

	@UseGuards(SessionGuard)
	@Put()
	async updateUser( @Body() userReq: UserUpdateInput, @Session() session: any ): Promise< Ret<User> > {
		const id = session.passport.user.id
		const userId = { id: id }
		
		const user = await this.userService.updateUser({
			where: userId,
			data: userReq
		})
		
		return user
	}

}	