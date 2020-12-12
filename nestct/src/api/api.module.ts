import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { ApiController } from './api.controller'
import { ContactService } from './contact.service'

@Module({
  imports: [PrismaService],
  controllers: [ApiController],
  providers: [PrismaService, ContactService],
})
export class ApiModule {}
