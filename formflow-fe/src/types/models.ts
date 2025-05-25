export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface RegisterResponse {
  message: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface ActivateAccountRequest {
  token: string
}

export interface ActivateAccountResponse {
  message: string
}

export interface GetMeResponse {
  profile: {
    id: string
    name: string
    dob: Date
    avatarUrl: string
    accountId: string
    createdAt: Date
    updatedAt: Date
  } | null
}

export interface LogoutRequest {
  refreshToken: string
}

export interface LogoutResponse {
  message: string
}
