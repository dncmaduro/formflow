import { LoginRequest, LoginResponse } from '../types/models'
import { callApi } from '../utils/call-api'

export const authService = () => {
  const login = (req: LoginRequest) => {
    return callApi<LoginRequest, LoginResponse>({
      method: 'POST',
      path: '/auth/login',
      data: req
    })
  }

  return { login }
}
