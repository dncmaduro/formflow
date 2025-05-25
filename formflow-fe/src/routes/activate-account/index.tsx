import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useAuthService } from '../../services/auth-service'
import { useMutation } from '@tanstack/react-query'
import { ActivateAccountRequest } from '../../types/models'
import { FToast } from '../../components/FToast'
import { AppShell, Loader, Stack, Text } from '@mantine/core'
import { useEffect } from 'react'

export const Route = createFileRoute('/activate-account/')({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      token: string
    }
})

function RouteComponent() {
  const { token } = useSearch({ from: Route.fullPath })
  const { activateAccount } = useAuthService()
  const navigate = useNavigate()

  const { mutate: mutateActivate } = useMutation({
    mutationFn: (req: ActivateAccountRequest) => activateAccount(req),
    onSuccess: () => {
      FToast.success({
        title: 'Account Activated Successfully. Please login to continue.'
      })
      navigate({ to: '/auth' })
    },
    onError: () => {
      FToast.error({
        title: 'Account Activation Failed. Please try again.'
      })
      navigate({ to: '/' })
    }
  })

  useEffect(() => {
    if (token) {
      mutateActivate({ token })
    }
  }, [token])

  return (
    <AppShell>
      <AppShell.Main>
        <Stack>
          <Loader />
          <Text>Activating Account...</Text>
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}
