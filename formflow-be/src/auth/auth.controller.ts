import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ActivateAccountDto,
  ForgotPasswordDto,
  LoginDto,
  LogoutDto,
  RegisterDto,
  ResetPasswordDto,
} from 'src/types/dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/strategies/jwt-auth.guard';

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
  async login(@Body() body: LoginDto, @Req() req: Request) {
    const ip = req.ip || req.connection?.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'unknown';
    return this.authService.login({ ...body, ipAddress: ip, deviceId: userAgent });
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

  @ApiOperation({ summary: 'User logout' })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Body() body: LogoutDto, @Req() req) {
    const userId = req.user.sub
    return this.authService.logout(body, userId);
  }
}
