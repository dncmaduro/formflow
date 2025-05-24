import { useAuthStore } from '../store/auth-store'
import { GetMeResponse } from '../types/models'
import { callApi } from '../utils/call-api'

export const useProfileService = () => {
  const { accessToken } = useAuthStore()

  const getMe = () => {
    return callApi<null, GetMeResponse>({
      method: 'GET',
      path: '/profile/me',
      accessToken
    })
  }

  return { getMe }
}
