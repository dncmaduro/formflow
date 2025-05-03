import { Box, Button, Divider, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { FIcon } from '../FIcon'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

type RegisterType = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const [showPassword, { toggle: togglePassword }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<RegisterType>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const password = watch('password')

  const submit = async (values: RegisterType) => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(values)
      // TODO: Implement actual registration logic
    } catch (err) {
      console.error(err)
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
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
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => <TextInput {...field} label="Email" withAsterisk error={errors.email?.message} />}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            }}
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
                withAsterisk
                error={errors.confirmPassword?.message}
                visible={showPassword}
                onVisibilityChange={togglePassword}
              />
            )}
          />

          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}

          <Button type="submit" loading={loading} className="mt-4">
            Register
          </Button>

          <Divider label="Or continue with" labelPosition="center" my="md" />

          <Group grow>
            <Button variant="outline" leftSection={<FIcon name="BrandGoogle" />}>
              Google
            </Button>
            <Button variant="outline" leftSection={<FIcon name="BrandGithub" />}>
              GitHub
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}
