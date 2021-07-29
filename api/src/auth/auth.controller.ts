import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './get-user.decorator';
import { User } from '../users/models/users.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAuthUser(@CurrentUser() user: User): Promise<User> {
    return this.authService.getAuthUser(user);
  }
}
