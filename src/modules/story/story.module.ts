import { Module } from '@nestjs/common';
import { StoryService } from './story.repositry';
import { StoryController } from './story.controller';
import { PrismaService } from '../../prisma.client';

@Module({
  providers: [StoryService, PrismaService],
  controllers: [StoryController],
})
export class StoriesModule {}
