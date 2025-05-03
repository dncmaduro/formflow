import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppShell, Button, Card, Container, Flex, Group, Text, TextInput, Title } from '@mantine/core'
import { FIcon } from '../../components/FIcon'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/auth-service'
import { ForgotPasswordRequest } from '../../types/models'
import { FToast } from '../../components/FToast'

type ForgotPasswordFormType = {
  email: string
}

export const Route = createFileRoute('/forgot-password/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { forgotPassword } = authService()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ForgotPasswordFormType>({
    defaultValues: {
      email: ''
    }
  })

  const { mutate: mutateForgotPassword, isPending } = useMutation({
    mutationFn: (req: ForgotPasswordRequest) => forgotPassword(req),
    onSuccess: () => {
      FToast.success({
        title: "We've sent you a reset link! Check your email."
      })
    },
    onError: () => {
      FToast.error({
        title: 'Email not found',
        subtitle: 'Please check your email address and try again.'
      })
    }
  })

  const submit = (values: ForgotPasswordFormType) => {
    mutateForgotPassword(values)
  }

  return (
    <AppShell w={'100vw'}>
      <AppShell.Main>
        <Container size="xs" py="xl" h={'100vh'} className="flex flex-col justify-center">
          <Card shadow="md" radius="md" p="xl" withBorder className="mx-auto my-auto max-w-md">
            <Flex direction="column" align="center" mb="md">
              <FIcon name="Lock" size={48} className="mb-4 text-indigo-600" />
              <Title order={2} className="text-center">
                Forgot your password?
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt="sm">
                Enter your email below, and we'll send you a link to reset your password.
              </Text>
            </Flex>

            <form onSubmit={handleSubmit(submit)}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Email"
                    placeholder="your.email@example.com"
                    withAsterisk
                    error={errors.email?.message}
                    leftSection={<FIcon name="Mail" size={16} />}
                    mb="md"
                  />
                )}
              />

              <Button type="submit" fullWidth loading={isPending} className="mt-4">
                Send Reset Link
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
            </form>
          </Card>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
