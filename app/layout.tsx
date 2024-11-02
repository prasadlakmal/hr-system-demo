import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';
import { AppProvider } from '@toolpad/core/nextjs';
import * as React from 'react';
import theme from '../theme';
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <GroupIcon />,
  },
];

const BRANDING = {
  title: 'HR System',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' data-color-scheme='light' suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            theme={theme}
          >
            {props.children}
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
