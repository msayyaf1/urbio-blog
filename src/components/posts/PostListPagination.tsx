'use client';

import { Box, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';

interface PostListPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export default function PostListPagination({ 
  page, 
  totalPages, 
  onPageChange,
  totalItems
}: PostListPaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        mt: 4,
        mb: 2,
        gap: 2
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing page {page} of {totalPages} ({totalItems} total posts)
      </Typography>
      
      <Pagination 
        count={totalPages} 
        page={page} 
        color="primary" 
        onChange={handlePageChange}
        size={isMobile ? "small" : "medium"}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}