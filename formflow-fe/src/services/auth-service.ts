import {
  ActivateAccountRequest,
  ActivateAccountResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from '../types/models'
import { callApi } from '../utils/call-api'

export const authService = () => {
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

  return { login, register, activateAccount }
}
