'use client';

import { CircularProgress, Box, Typography } from '@mui/material';

export default function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      padding: 4,
      minHeight: '300px'
    }}>
      <CircularProgress size={60} thickness={4} color="primary" />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
        {message}
      </Typography>
    </Box>
  );
}