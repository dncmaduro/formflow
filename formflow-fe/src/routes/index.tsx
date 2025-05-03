import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Button,
  Container,
  Group,
  Text,
  Title,
  Card,
  SimpleGrid,
  Box,
  AppShell,
  Flex,
  Stack,
  Anchor,
  Image
} from '@mantine/core'
import { FIcon } from '../components/FIcon'
import { ReactTyped } from 'react-typed'
import Logo from '../public/formflow.png'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  const steps = [
    {
      icon: 'FileText',
      bgColor: 'bg-indigo-100',
      text: 'Create Questions',
      textColor: 'text-indigo-600',
      iconColor: 'text-indigo-600'
    },
    {
      icon: 'ArrowFork',
      bgColor: 'bg-green-100',
      text: 'Add Conditions',
      textColor: 'text-green-600',
      iconColor: 'text-green-600'
    },
    {
      icon: 'ChartBar',
      bgColor: 'bg-red-100',
      text: 'Share & Collect',
      textColor: 'text-red-600',
      iconColor: 'text-red-600'
    },
    {
      icon: 'ChartLine',
      bgColor: 'bg-blue-100',
      text: 'Analyze Results',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-600'
    }
  ]

  return (
    <AppShell w={'100vw'}>
      <AppShell.Main>
        <div className="min-h-screen">
          {/* Hero Section */}
          <Box
            pos="relative"
            w="100%"
            py={80}
            style={{
              backgroundImage: 'linear-gradient(90deg, #312e81, #4c1d95, #312e81)',
              color: 'white',
              overflow: 'hidden'
            }}
          >
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 60%)',
                animation: 'pulse 3s infinite',
                zIndex: 0
              }}
            />
            <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
              <Box ta="center" maw={700} mx="auto">
                {/* <Title order={1} mb="md" fz={{ base: 36, sm: 48 }} fw={900}>
                  FormFlow
                </Title> */}
                <Image src={Logo} />
                <Text mb="xl" fz={{ base: 20, sm: 24 }}>
                  <ReactTyped
                    strings={['Build smart forms in minutes', 'Personalize your surveys effortlessly']}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                  />
                </Text>
                <Group justify="center" gap="md">
                  <Button
                    size="lg"
                    component={Link}
                    to="/auth"
                    variant="gradient"
                    gradient={{ from: 'green', to: 'lime', deg: 105 }}
                    radius="xl"
                    className="shadow-lg transition-transform hover:scale-105"
                  >
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="white"
                    color="dark"
                    radius="xl"
                    className="shadow transition-transform hover:scale-105"
                  >
                    Learn More
                  </Button>
                </Group>
              </Box>
            </Container>
          </Box>

          {/* How It Works Section */}
          <Box className="w-full bg-gray-50 py-24">
            <Container size="xl">
              <Title order={2} className="mb-16 text-center text-4xl font-extrabold text-indigo-800">
                How It Works
              </Title>

              <Flex justify="center" wrap="wrap" gap="xl" mt={32}>
                {steps.map((step, index) => (
                  <Box key={index} className="w-[66%] sm:w-[44%] md:w-[22%]">
                    <Stack
                      align="center"
                      className="rounded-2xl bg-white p-8 shadow-xl transition-transform duration-300 hover:scale-105"
                      style={{ minHeight: 300 }}
                    >
                      <Flex
                        justify="center"
                        align="center"
                        className={`mb-2 h-14 w-14 rounded-full ${step.bgColor} ${step.textColor} text-xl font-bold`}
                      >
                        {index + 1}
                      </Flex>

                      <Flex justify="center" align="center" className={`mb-4 h-16 w-16 rounded-full ${step.iconColor}`}>
                        <FIcon name={step.icon} size={28} />
                      </Flex>

                      <Text className="text-center text-lg font-semibold">{step.text}</Text>
                    </Stack>
                  </Box>
                ))}
              </Flex>
            </Container>
          </Box>

          {/* Feature Highlights */}
          <div className="bg-gray-50 py-16">
            <Container size="lg">
              <Title order={2} className="mb-12 text-center text-3xl font-bold" c="indigo.8">
                Feature Highlights
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt={36}>
                <Card shadow="sm" padding="xl" radius="md" className="border-t-4 border-indigo-500">
                  <Title order={3} className="mb-4 text-indigo-700">
                    Conditional Logic
                  </Title>
                  <Text>
                    Create personalized form experiences by showing or hiding questions based on previous answers.
                  </Text>
                </Card>
                <Card shadow="sm" padding="xl" radius="md" className="border-t-4 border-green-500">
                  <Title order={3} className="mb-4 text-green-700">
                    Poll Support
                  </Title>
                  <Text>Easily create polls with various question types and collect responses in real-time.</Text>
                </Card>
                <Card shadow="sm" padding="xl" radius="md" className="border-t-4 border-red-500">
                  <Title order={3} className="mb-4 text-red-700">
                    Real-time Analytics
                  </Title>
                  <Text>Get instant insights with powerful analytics dashboards that update as responses come in.</Text>
                </Card>
              </SimpleGrid>
            </Container>
          </div>

          {/* Demo Section */}
          <Container size="lg" className="py-16 text-center">
            <Title order={2} className="mb-8 text-3xl font-bold text-indigo-800">
              See FormFlow in Action
            </Title>
            <Box className="mx-auto flex aspect-video max-w-3xl items-center justify-center bg-gray-200" mt={36}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="FormFlow Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          </Container>

          {/* Footer */}
          <Box component="footer" className="bg-indigo-900 py-12 text-white">
            <Container size="lg">
              <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl">
                <Box>
                  <Title order={4} className="mb-4">
                    FormFlow
                  </Title>
                  <Text size="sm" mt={12}>
                    Build smart forms in minutes with our powerful form builder platform.
                  </Text>
                </Box>

                <Box>
                  <Title order={5} className="mb-4">
                    Product
                  </Title>
                  <Stack gap="xs" mt={12}>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Features
                    </Anchor>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Pricing
                    </Anchor>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Templates
                    </Anchor>
                  </Stack>
                </Box>

                <Box>
                  <Title order={5} className="mb-4">
                    Resources
                  </Title>
                  <Stack gap="xs" mt={12}>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Documentation
                    </Anchor>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Blog
                    </Anchor>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Support
                    </Anchor>
                  </Stack>
                </Box>

                <Box>
                  <Title order={5} className="mb-4">
                    Company
                  </Title>
                  <Stack gap="xs" mt={12}>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      About
                    </Anchor>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Careers
                    </Anchor>
                    <Anchor href="#" className="text-gray-300 hover:text-white">
                      Contact
                    </Anchor>
                  </Stack>
                </Box>
              </SimpleGrid>

              <Box className="mt-8 border-t border-indigo-800 pt-8 text-center">
                <Text size="sm" className="text-gray-300">
                  © {new Date().getFullYear()} FormFlow. All rights reserved.
                </Text>
              </Box>
            </Container>
          </Box>
        </div>
      </AppShell.Main>
    </AppShell>
  )
}
