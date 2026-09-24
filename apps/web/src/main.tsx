import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications';

import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider,  } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';
import { createTheme, MantineProvider, Notification } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  components: {
    Notification: Notification.extend({
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: 'var(--color-background-panel)',
          borderColor: 'var(--color-border-default)',
          fontFamily: 'var(--sans)',
        },
        title: {
          color: 'var(--color-text-primary)',
        },
        description: {
          color: 'var(--color-text-secondary)',
        },
      },
    }),
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <Notifications position="bottom-right" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
