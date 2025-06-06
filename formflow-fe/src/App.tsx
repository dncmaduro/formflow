import './App.css'
import { RouterProvider, createBrowserHistory, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { createTheme, MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/dates/styles.css'
import './index.css'

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
