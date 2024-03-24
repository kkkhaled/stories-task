import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { StoryService } from './story.repositry';

@Controller('stories')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post()
  async addStory(
    @Body('title') title: string,
    @Body('body') body: string,
    @Body('userId') userId: number,
  ) {
    const story = await this.storyService.addStory(title, body, userId);
    return story;
  }

  @Get(':userId')
  async getUserStories(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
  ) {
    const stories = await this.storyService.getUserStories(
      page,
      perPage,
      userId,
    );
    return stories;
  }

  @Get('/top')
  async getTopStories(
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
  ) {
    const stories = await this.storyService.getTopStories(page, perPage);
    return stories;
  }
}
