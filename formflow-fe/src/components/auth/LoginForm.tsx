import { Box, Button, Group, PasswordInput, Stack, TextInput, Text } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { useAuthService } from '../../services/auth-service'
import { useMutation } from '@tanstack/react-query'
import { FToast } from '../FToast'
import { useAuthStore } from '../../store/auth-store'
import { Link } from '@tanstack/react-router'

type LoginType = {
  username: string
  password: string
}

export const LoginForm = () => {
  const [showPassword, { toggle: togglePassword }] = useDisclosure(false)
  const { login } = useAuthService()
  const { setAuth } = useAuthStore()

  const {
    formState: { errors },
    handleSubmit,
    control
  } = useForm<LoginType>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationFn: (values: LoginType) => login(values),
    onSuccess: data => {
      FToast.success({
        title: 'Login Successful'
      })
      setAuth(data.data)
    },
    onError: () => {
      FToast.error({
        title: 'Login Failed'
      })
    }
  })

  const submit = (values: LoginType) => {
    mutateLogin(values)
  }

  return (
    <Box className="w-full">
      <form onSubmit={handleSubmit(submit)}>
        <Stack>
          <Controller
            control={control}
            name="username"
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <TextInput {...field} label="Username" withAsterisk error={errors.username?.message} />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                label="Password"
                withAsterisk
                error={errors.password?.message}
                visible={showPassword}
                onVisibilityChange={togglePassword}
              />
            )}
          />
          <Group justify="right" mt="-xs">
            <Text component={Link} to="/forgot-password/" size="xs" className="text-indigo-600 hover:underline">
              Forgot password?
            </Text>
          </Group>
          <Button type="submit" loading={isLoginPending} className="mt-4">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
