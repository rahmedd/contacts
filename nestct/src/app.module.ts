import { Module } from '@nestjs/common';

//auth
import { AppController } from './app.controller';
import { UsersService } from './users.service';
import { CookieSerializer } from './auth/cookie-serializer';
import { SessionGuard } from './auth/session-guard';
import { SessionAuthGuard } from './auth/session-auth-guard';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth/local-strategy';
import { CustomRedisStore } from './auth/custom-redis-store.service';

import { PrismaService } from './prisma.service';

// import { AppController } from './app.controller'
// import { AppService } from './app.service'
import { ApiModule } from './api/api.module'
import { UserModule } from './user/user.module';


@Module({
	imports: [ApiModule, UserModule],
	controllers: [AppController],
	providers: [
		PrismaService,
		//auth
		SessionAuthGuard,
        AuthService,
        UsersService,
        CookieSerializer,
        SessionGuard,
        LocalStrategy,
		CustomRedisStore,
	],
})
export class AppModule {}
