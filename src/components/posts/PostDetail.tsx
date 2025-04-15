'use client';

import { 
  Card, 
  CardContent, 
  Typography, 
  Divider, 
  Box,
  Button,
  Avatar,
  CardHeader,
  useTheme,
  Paper
} from '@mui/material';
import { Post } from '@/types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import { useGetPostByIdQuery } from '@/services/postsApi';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import { formatDate } from '@/lib/utils';

interface PostDetailProps {
  postId: string;
  initialPost?: Post;
}

export default function PostDetail({ postId, initialPost }: PostDetailProps) {
  const theme = useTheme();
  
  // RTK Query hook with SSR data
  const { data: post, error, isLoading, refetch } = useGetPostByIdQuery(
    postId, 
    { skip: !!initialPost } 
  );
  
  const displayPost = initialPost || post;
  
  const authorInitials = displayPost?.author
    ? displayPost.author
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
    : '';
  
  const formattedDate = displayPost?.createdAt 
    ? formatDate(displayPost.createdAt)
    : '';
  
  if (isLoading && !displayPost) {
    return <LoadingSpinner message="Loading post..." />;
  }
  
  if (error) {
    return <ErrorMessage 
      message="Failed to load post. Please try again later." 
      onRetry={() => refetch()}
    />;
  }
  
  if (!displayPost) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">Post not found</Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/posts" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              startIcon={<ArrowBackIcon />}
            >
              Back to Posts
            </Button>
          </Link>
        </Box>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Link href="/posts" style={{ textDecoration: 'none' }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />}
          >
            Back to Posts
          </Button>
        </Link>
      </Box>
      
      <Card sx={{ overflow: 'hidden' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
              {authorInitials}
            </Avatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {displayPost.author}
            </Typography>
          }
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
            </Box>
          }
        />
        
        <CardContent>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 3 }}
          >
            {displayPost.title}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography 
            variant="body1" 
            paragraph
            sx={{ 
              lineHeight: 1.8,
              fontSize: '1.1rem',
              whiteSpace: 'pre-line' 
            }}
          >
            {displayPost.body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}