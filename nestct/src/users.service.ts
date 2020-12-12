import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
	UserUpdateInput,
	User,
	UserCreateInput,
	UserWhereUniqueInput,
	UserWhereInput,
	UserOrderByInput,
} from '@prisma/client';

// export type User = any;

@Injectable()
export class UsersService {
	private readonly users: User[];

	constructor(private prisma: PrismaService) {}
	
	async findOne(emailStr: string): Promise<User | undefined> {
		
		const user = await this.prisma.user.findOne({
			where: {
				email: emailStr
			}
		})

		return user
	}
}
