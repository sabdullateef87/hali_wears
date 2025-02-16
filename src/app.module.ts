import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './features/user/user.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
