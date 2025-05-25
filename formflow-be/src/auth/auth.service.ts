import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schema/user.entity';
import {
  ActivateAccountRequest,
  ActivateAccountResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from 'src/types/models';
import { activationEmailTemplate } from 'src/utils/activation-mail-content';
import transporter from 'src/utils/mail-transporter';
import { RefreshToken } from 'src/schema/refresh_token.entity';

interface LoginParams {
  ipAddress?: string;
  deviceId?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshToken: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async register({ email, username, password }: RegisterRequest): Promise<RegisterResponse> {
    const existing = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existing) throw new BadRequestException('Email or username already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      username,
      passwordHash: hashed,
      role: 'user',
      isActivated: false,
    });
    await this.userRepository.save(user);
    const activationToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '1d' });
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to FormFlow - Activate your account',
        html: activationEmailTemplate(
          username,
          `${process.env.FRONTEND_URL}/activate-account?token=${activationToken}`,
        ),
      });
    } catch (err) {
      console.warn('Failed to send activation email:', err);
    }

    return { message: 'User registered' };
  }

  async activateAccount({ token }: ActivateAccountRequest): Promise<ActivateAccountResponse> {
    try {
      const payload = this.jwtService.verify<{ sub: string }>(token);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) throw new BadRequestException('Invalid token');

      if (user.isActivated) {
        return { message: 'Account is already activated.' };
      }

      user.isActivated = true;
      await this.userRepository.save(user);

      return { message: 'Account activated successfully!' };
    } catch (err) {
      console.error('Activation error:', err);
      throw new BadRequestException('Invalid or expired activation token');
    }
  }

  async login({ username, password, ipAddress, deviceId }: LoginRequest & LoginParams): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!user.isActivated) throw new UnauthorizedException('Account is not activated');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const token = this.refreshToken.create({
      token: refreshToken,
      user,
      userId: user.id,
      deviceId,
      ipAddress,
    });

    await this.refreshToken.save(token);

    return { accessToken, refreshToken };
  }

  async forgotPassword({ email }: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const resetToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '15m' });

    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Reset your FormFlow password',
        html: `
          <h1>Password Reset Request</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">
            Reset Password
          </a>
          <p>If you didn’t request this, ignore this email.</p>
        `,
      });
    } catch (err) {
      console.warn('Failed to send reset email:', err);
    }

    return { message: 'Reset link sent to email' };
  }

  async resetPassword({ token, newPassword }: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user) throw new BadRequestException('Invalid token');

      user.passwordHash = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);

      return { message: 'Password reset successful' };
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Invalid or expired token');
    }
  }

  async logout({ refreshToken }: LogoutRequest, userId: string): Promise<LogoutResponse> {
    try {
      await this.refreshToken.delete({ token: refreshToken, userId });
      return { message: 'Logout successful' };
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Invalid token');
    }
  }
}
