import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  newPassword: string;
}

export class ActivateAccountDto {
  @ApiProperty()
  token: string;
}
