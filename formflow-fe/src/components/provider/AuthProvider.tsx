import { ReactNode, useEffect } from 'react'
import { useAuthStore } from '../../store/auth-store'
import { useNavigate } from '@tanstack/react-router'

interface Props {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const { accessToken } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      navigate({ to: '/auth' })
    }
  }, [accessToken, navigate])

  return <>{children}</>
}
