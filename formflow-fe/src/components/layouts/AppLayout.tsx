import { AppShell } from '@mantine/core'
import { AuthProvider } from '../provider/AuthProvider'
import { AppHeader } from './app/AppHeader'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const AppLayout = ({ children }: Props) => {
  return (
    <AuthProvider>
      <AppShell w={'100%'} header={{ height: 60 }}>
        <AppShell.Header>
          <AppHeader />
        </AppShell.Header>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AuthProvider>
  )
}
