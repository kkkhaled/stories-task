import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.repositry';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async addReview(@Body() createReviewDto: CreateReviewDto) {
    // Pass the user ID to the service
    const review = await this.reviewService.addReview(createReviewDto);
    return review;
  }
}
