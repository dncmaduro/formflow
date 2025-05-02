import './App.css'
import {
  RouterProvider,
  createBrowserHistory,
  createRouter
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { createTheme, MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createRouter({ routeTree, history: createBrowserHistory() })

const theme = createTheme({
  primaryColor: 'indigo',
  luminanceThreshold: 0.5
})

const queryClient = new QueryClient()


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <Notifications />
            <RouterProvider router={router}></RouterProvider>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
