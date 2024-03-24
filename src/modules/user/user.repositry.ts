import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // sign up
  async signUp(username: string) {
    const newUser = await this.prisma.client.user.create({
      data: { username },
    });
    return {
      newUser,
    };
  }
}
