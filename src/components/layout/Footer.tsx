'use client';

import { Box, Container, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4,
        mt: 8,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent={isMobile ? "center" : "space-between"} alignItems="center">
        <div style={{ width: '100%', maxWidth: '50%', textAlign: isMobile ? 'center' : 'left' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
              Urbio Tech Blog Dashboard
            </Typography>
            <Typography variant="body2">
              A simple blog dashboard built with Next.js, Material-UI, and RTK Query.
            </Typography>
          </div>
        </Grid>
      </Container>
    </Box>
  );
}