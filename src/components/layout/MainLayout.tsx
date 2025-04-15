'use client';

import { Container, Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import theme from '@/lib/theme';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Header />
        <Container 
          component="main" 
          maxWidth="lg" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            py: 2,
            px: { xs: 2, sm: 3 },
            minHeight: '100%',
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}