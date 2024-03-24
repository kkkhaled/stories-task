import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.client';

@Injectable()
export class StoryService {
  constructor(private readonly prisma: PrismaService) {}

  async addStory(title: string, body: string, userId) {
    const story = await this.prisma.client.story.create({
      data: { title, body, authorId: userId },
    });
    return story;
  }

  async getUserStories(page: number, perPage: number, userId: number) {
    const skip = (page - 1) * perPage;
    return this.prisma.client.story.findMany({
      where: {
        authorId: userId, // Assuming you have the userId available
      },
      skip,
      take: perPage,
    });
  }
  async getTopStories(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    // Aggregate the average rating for each story
    const topStories = await this.prisma.client.story.findMany({
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Calculate the average rating for each story
    const storiesWithAvgRating = topStories.map((story) => ({
      ...story,
      avgRating:
        story.reviews.reduce((sum, review) => sum + review.rating, 0) /
        story.reviews.length,
    }));

    // Sort stories based on average rating in descending order
    const sortedStories = storiesWithAvgRating.sort(
      (a, b) => b.avgRating - a.avgRating,
    );

    // Retrieve paginated top stories
    return sortedStories.slice(skip, skip + perPage);
  }
}
