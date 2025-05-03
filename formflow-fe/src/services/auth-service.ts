import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/models'
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

  return { login, register }
}
