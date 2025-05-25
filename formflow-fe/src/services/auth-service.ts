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
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse
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

  return { login, register, activateAccount, forgotPassword, resetPassword, logout }
}
