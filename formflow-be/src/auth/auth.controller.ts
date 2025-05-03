import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivateAccountDto, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from 'src/types/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @ApiOperation({ summary: 'Reset password' })
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @ApiOperation({ summary: 'Activate account' })
  @Post('activate-account')
  async activateAccount(@Body() body: ActivateAccountDto) {
    return this.authService.activateAccount(body);
  }
}
