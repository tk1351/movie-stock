import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CurrentUser } from './get-user.decorator';
import { User } from '../users/models/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAuthUser(@CurrentUser() user: User): Promise<User> {
    return this.authService.getAuthUser(user);
  }
}
