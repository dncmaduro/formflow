import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '../../components/layouts/AuthLayout'
import { Box, Card, Container, Flex, Image, Tabs, Title, Text } from '@mantine/core'
import { LoginForm } from '../../components/auth/LoginForm'
import { RegisterForm } from '../../components/auth/RegisterForm'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <AuthLayout>
      <Container size="xl" py="xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap="xl"
          align="center"
          justify="center"
          className="min-h-[80vh]"
        >
          {/* Left side - Hero illustration */}
          <Box className="flex w-full flex-col items-center justify-center p-4 md:w-1/2">
            <Title order={2} className="mb-6 text-center text-indigo-800">
              Build Your Form Flow
            </Title>
            <Text className="mb-8 text-center text-gray-600">
              Create smart, conditional forms in minutes. Collect and analyze data with ease.
            </Text>
            <Image
              src="https://placehold.co/600x400/e2e8f0/4c1d95?text=Form+Flow+Illustration"
              alt="Form Flow Illustration"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </Box>

          {/* Right side - Auth forms */}
          <Box className="w-full p-4 md:w-1/2">
            <Card shadow="md" radius="md" p="xl" withBorder className="mx-auto max-w-md">
              <Tabs defaultValue="login" variant="outline">
                <Tabs.List grow mb="md">
                  <Tabs.Tab value="login">Login</Tabs.Tab>
                  <Tabs.Tab value="register">Register</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="login">
                  <LoginForm />
                </Tabs.Panel>

                <Tabs.Panel value="register">
                  <RegisterForm />
                </Tabs.Panel>
              </Tabs>
            </Card>
          </Box>
        </Flex>
      </Container>
    </AuthLayout>
  )
}
