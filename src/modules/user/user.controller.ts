import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.repositry';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: { username: string }) {
    const { username } = body;
    const user = await this.userService.signUp(username);
    return { user };
  }
}
