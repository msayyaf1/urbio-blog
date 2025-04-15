'use client';

import { Grid, Typography, Box, Paper, useTheme } from '@mui/material';
import { Post } from '@/types';
import PostCard from './PostCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { useGetPostsQuery } from '@/services/postsApi';
import PostListPagination from './PostListPagination';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const POSTS_PER_PAGE = 12;

interface PostListProps {
  initialPosts?: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // get page from URL or default to 1
  const pageParam = searchParams?.get('page');
  const initialPage = pageParam ? parseInt(pageParam) : 1;
  
  const [page, setPage] = useState(initialPage);
  
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery(
    undefined, 
    { skip: !!initialPosts } 
  );
  
  const displayPosts = initialPosts || posts;
  
  // pagination logic
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = displayPosts?.slice(startIndex, endIndex);
  const totalPages = displayPosts ? Math.ceil(displayPosts.length / POSTS_PER_PAGE) : 0;
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/posts?page=${newPage}`);
  };
  
  useEffect(() => {
    if (pageParam && parseInt(pageParam) !== page) {
      setPage(parseInt(pageParam));
    }
  }, [pageParam, page]);
  
  if (isLoading && !displayPosts) {
    return <LoadingSpinner message="Loading posts..." />;
  }
  
  if (error) {
    return <ErrorMessage 
      message="Failed to load posts. Please try again later." 
      onRetry={() => refetch()}
    />;
  }
  
  if (!displayPosts || displayPosts.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          my: 4, 
          textAlign: 'center', 
          p: 6, 
          backgroundColor: theme.palette.background.paper,
          border: `1px dashed ${theme.palette.divider}`
        }}
      >
        <Typography variant="h5" color="text.secondary">No posts found</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Be the first to create a blog post!
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container spacing={4} columns={12} >
        {paginatedPosts?.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={6} sx={{ display: 'flex',  }}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <PostListPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={displayPosts?.length || 0}
        />
      )}
    </Box>
  );
}