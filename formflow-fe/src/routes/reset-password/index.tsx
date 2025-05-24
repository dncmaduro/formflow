import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { AppShell, Button, Card, Container, Flex, Group, PasswordInput, Stack, Text, Title } from '@mantine/core'
import { FIcon } from '../../components/FIcon'
import { Controller, useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { useAuthService } from '../../services/auth-service'
import { ResetPasswordRequest } from '../../types/models'
import { FToast } from '../../components/FToast'

type ResetPasswordFormType = {
  newPassword: string
  confirmPassword: string
}

export const Route = createFileRoute('/reset-password/')({
  component: RouteComponent,
  validateSearch: search =>
    search as {
      token: string
    }
})

function RouteComponent() {
  const { token } = useSearch({ from: Route.fullPath })
  const navigate = useNavigate()
  const [showPassword, { toggle: togglePassword }] = useDisclosure(false)
  const { resetPassword } = useAuthService()

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<ResetPasswordFormType>({
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  })

  const password = watch('newPassword')

  const { mutate: mutateResetPassword, isPending } = useMutation({
    mutationFn: (req: ResetPasswordRequest) => resetPassword({ token, newPassword: req.newPassword }),
    onSuccess: () => {
      FToast.success({
        title: 'Your password has been reset successfully!',
        subtitle: 'You can now log in with your new password.'
      })
      navigate({ to: '/auth' })
    },
    onError: () => {
      FToast.error({
        title: 'Reset link invalid or expired',
        subtitle: 'Please request a new password reset link.'
      })
    }
  })

  const submit = (values: ResetPasswordFormType) => {
    mutateResetPassword({ token, newPassword: values.newPassword })
  }

  return (
    <AppShell w={'100vw'}>
      <AppShell.Main>
        <Container size="xs" py="xl" h={'100vh'} className="flex flex-col justify-center">
          <Card shadow="md" radius="md" p="xl" withBorder className="mx-auto my-auto max-w-md">
            <Flex direction="column" align="center" mb="md">
              <FIcon name="Lock" size={48} className="mb-4 text-indigo-600" />
              <Title order={2} className="text-center">
                Reset your password
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt="sm">
                Enter your new password below to reset access to your account.
              </Text>
            </Flex>

            <form onSubmit={handleSubmit(submit)}>
              <Stack>
                <Controller
                  control={control}
                  name="newPassword"
                  rules={{
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                      message: 'Password must contain both letters and numbers'
                    }
                  }}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      label="New Password"
                      placeholder="Enter your new password"
                      withAsterisk
                      error={errors.newPassword?.message}
                      visible={showPassword}
                      onVisibilityChange={togglePassword}
                      leftSection={<FIcon name="Lock" size={16} />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  }}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      label="Confirm Password"
                      placeholder="Confirm your new password"
                      withAsterisk
                      error={errors.confirmPassword?.message}
                      visible={showPassword}
                      onVisibilityChange={togglePassword}
                      leftSection={<FIcon name="Lock" size={16} />}
                    />
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  loading={isPending}
                  className="mt-4"
                  disabled={!!errors.newPassword || !!errors.confirmPassword}
                >
                  Set New Password
                </Button>

                <Group justify="center" mt="md">
                  <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<FIcon name="ArrowLeft" size={14} />}
                    onClick={() => navigate({ to: '/auth' })}
                  >
                    Back to Login
                  </Button>
                </Group>
              </Stack>
            </form>
          </Card>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
