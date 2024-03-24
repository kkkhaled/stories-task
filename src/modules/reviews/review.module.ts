import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.repositry';
import { PrismaService } from '../../prisma.client';

@Module({
  providers: [ReviewService, PrismaService],
  controllers: [ReviewController],
})
export class ReviewModule {}
