import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IUser } from '@penny-app/shared';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Query('limit') limit = 25, @Query('offset') offset = 0): Promise<{ users: IUser[], count: number }> {
    return await this.userService.getUsers(+limit, +offset);
  }
}
