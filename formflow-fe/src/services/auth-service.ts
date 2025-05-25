import { useAuthStore } from '../store/auth-store'
import {
  ActivateAccountRequest,
  ActivateAccountResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateTokenRequest,
  ValidateTokenResponse
} from '../types/models'
import { callApi } from '../utils/call-api'

export const useAuthService = () => {
  const { accessToken } = useAuthStore()

  const login = (req: LoginRequest) => {
    return callApi<LoginRequest, LoginResponse>({
      method: 'POST',
      path: '/auth/login',
      data: req
    })
  }

  const register = (req: RegisterRequest) => {
    return callApi<RegisterRequest, RegisterResponse>({
      method: 'POST',
      path: '/auth/register',
      data: req
    })
  }

  const activateAccount = (req: ActivateAccountRequest) => {
    return callApi<ActivateAccountRequest, ActivateAccountResponse>({
      method: 'POST',
      path: '/auth/activate-account',
      data: req
    })
  }

  const forgotPassword = (req: ForgotPasswordRequest) => {
    return callApi<ForgotPasswordRequest, ForgotPasswordResponse>({
      method: 'POST',
      path: '/auth/forgot-password',
      data: req
    })
  }

  const resetPassword = (req: ResetPasswordRequest) => {
    return callApi<ResetPasswordRequest, ResetPasswordResponse>({
      method: 'POST',
      path: '/auth/reset-password',
      data: req
    })
  }

  const logout = (req: LogoutRequest) => {
    return callApi<LogoutRequest, LogoutResponse>({
      method: 'POST',
      path: '/auth/logout',
      accessToken,
      data: req
    })
  }

  const refreshToken = (req: RefreshTokenRequest) => {
    return callApi<RefreshTokenRequest, RefreshTokenResponse>({
      method: 'POST',
      path: '/auth/refresh-token',
      data: req
    })
  }

  const validateToken = (req: ValidateTokenRequest) => {
    return callApi<ValidateTokenRequest, ValidateTokenResponse>({
      method: 'POST',
      path: '/auth/validate-token',
      data: req
    })
  }

  return { login, register, activateAccount, forgotPassword, resetPassword, logout, refreshToken, validateToken }
}
