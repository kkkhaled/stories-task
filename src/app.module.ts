import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { StoriesModule } from './modules/story/story.module';
import { ReviewModule } from './modules/reviews/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    StoriesModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
