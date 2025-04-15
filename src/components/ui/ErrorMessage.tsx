'use client';

import { Alert, AlertTitle, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Box sx={{ m: 2 }}>
      <Alert 
        severity="error"
        action={
          onRetry ? (
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<RefreshIcon />}
              onClick={onRetry}
            >
              Retry
            </Button>
          ) : undefined
        }
      >
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}