import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.client';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async addReview(createReviewDto: CreateReviewDto) {
    const { rating, comment, storyId, userId } = createReviewDto;

    // Check if the user has already reviewed the post
    const existingReview = await this.prisma.client.review.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (existingReview) {
      throw new Error('User has already reviewed this post.');
    }

    // Create the review
    const review = await this.prisma.client.review.create({
      data: {
        rating,
        comment,
        userId,
        storyId,
      },
    });

    return review;
  }
}
