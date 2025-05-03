import { AppShell } from '@mantine/core'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const AuthLayout = ({ children }: Props) => {
  return (
    <AppShell w={'100vw'}>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
