import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schema/user.entity';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from 'src/types/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register({ email, username, password }: RegisterRequest): Promise<RegisterResponse> {
    const existing = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existing) throw new BadRequestException('Email or username already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, username, passwordHash: hashed, role: 'user' });
    await this.userRepository.save(user);
    return { message: 'User registered' };
  }

  async login({ username, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async forgotPassword({ email }: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const resetToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '15m' });

    // TODO: Send resetToken via email (simulate log in console for dev)
    console.log(`RESET LINK: https://your-frontend.com/reset-password?token=${resetToken}`);

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
}
