import { Avatar, Box, Button, Container, Flex, Group, Menu } from '@mantine/core'
import { useMe } from '../../../hooks/useMe'
import { Link, useNavigate } from '@tanstack/react-router'
import { AppIconLogo } from './AppIconLogo'
import { FIcon } from '../../FIcon'
import { useAuthStore } from '../../../store/auth-store'

export const AppHeader = () => {
  const { meData } = useMe()

  const navItems = [
    {
      label: 'Dashboard',
      href: '/app/dashboard'
    },
    {
      label: 'Forms',
      href: '/app/forms'
    },
    {
      label: 'Marketplace',
      href: '/app/marketplace'
    }
  ]

  const NavItem = ({ label, href }: { label: string; href: string }) => {
    return (
      <Button size="compact-sm" variant="subtle" component={Link} to={href}>
        {label}
      </Button>
    )
  }

  const ProfileMenu = () => {
    const navigate = useNavigate()
    const { clearAuth } = useAuthStore()

    const menuItems = [
      {
        section: 'Profile',
        items: [
          {
            icon: 'User',
            label: 'Profile',
            href: '/app/profile',
            color: 'black',
            onClick: () => {
              console.log('')
            }
          },
          {
            icon: 'Settings',
            label: 'Settings',
            href: '/app/settings',
            color: 'black',
            onClick: () => {
              console.log('')
            }
          }
        ]
      },
      {
        section: 'Logout',
        items: [
          {
            icon: 'Logout',
            label: 'Logout',
            href: '/auth',
            color: 'red',
            onClick: () => {
              clearAuth()
            }
          }
        ]
      }
    ]

    return (
      <Menu>
        <Menu.Target>
          <Avatar src={meData?.avatarUrl} />
        </Menu.Target>

        <Menu.Dropdown w={180}>
          <Menu.Item>{meData?.name}</Menu.Item>
          <Menu.Divider />
          {menuItems.map((section, index) => {
            return (
              <Box key={index}>
                <Menu.Label>{section.section}</Menu.Label>
                {section.items.map(item => {
                  return (
                    <Menu.Item
                      leftSection={<FIcon name={item.icon} size={16} />}
                      key={item.href}
                      color={item.color}
                      onClick={() => {
                        item.onClick()
                        navigate({ to: item.href })
                      }}
                    >
                      {item.label}
                    </Menu.Item>
                  )
                })}
                {index !== menuItems.length - 1 && <Menu.Divider />}
              </Box>
            )
          })}
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Box w={'100%'} h={'100%'} className="shadow-b-lg">
      <Container size={'xl'} p={'sm'}>
        <Flex justify={'space-between'} align={'center'}>
          <AppIconLogo />
          <Group gap={16}>
            {navItems.map(item => (
              <NavItem key={item.label} href={item.href} label={item.label} />
            ))}
            <ProfileMenu />
          </Group>
        </Flex>
      </Container>
    </Box>
  )
}
