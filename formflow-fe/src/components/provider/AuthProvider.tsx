import { ReactNode, useEffect } from 'react'
import { useAuthStore } from '../../store/auth-store'
import { useNavigate } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthService } from '../../services/auth-service'
import { getFromCookies } from '../../utils/cookies'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const { accessToken, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const { validateToken, logout } = useAuthService()
  const refreshToken = getFromCookies('refreshToken')

  const { data: isTokenValid } = useQuery({
    queryKey: ['auth.validateToken'],
    queryFn: () => validateToken({ accessToken }),
    enabled: !!accessToken && !!refreshToken,
    refetchInterval: 1000 * 30,
    select: data => {
      return data.data.isValid
    },
    staleTime: 1000 * 30
  })

  const { mutate: mutateLogout } = useMutation({
    mutationFn: () => logout({ refreshToken }),
    onSuccess: () => {
      clearAuth()
    }
  })

  useEffect(() => {
    if (isTokenValid === false) {
      mutateLogout()
    }
  }, [isTokenValid])

  useEffect(() => {
    if (!accessToken) {
      navigate({ to: '/auth' })
    }
  }, [accessToken, navigate])

  return <>{children}</>
}
