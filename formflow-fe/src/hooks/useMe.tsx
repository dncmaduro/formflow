import { useQuery } from '@tanstack/react-query'
import { useProfileService } from '../services/profile-service'

export const useMe = () => {
  const { getMe } = useProfileService()

  const { data, isFetching } = useQuery({
    queryKey: ['profile.getMe'],
    queryFn: getMe,
    select: data => {
      return data.data.profile
    }
  })

  return { meData: data, isGettingMe: isFetching }
}
