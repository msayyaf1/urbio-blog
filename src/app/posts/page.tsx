import { Typography, Box } from '@mui/material';
import PostList from '@/components/posts/PostList';
import { getPosts } from '@/services/postsApi';
import { store } from '@/lib/redux/store';
import type { RootState } from '@/lib/redux/store';

export default async function PostsPage() {
  // fetch posts on the server
  await store.dispatch(getPosts.initiate());
  
  // get result from the store
  const postsResult = getPosts.select()(store.getState() as RootState);
  const initialPosts = postsResult.data;
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Blog Posts
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse our latest articles and insights
        </Typography>
      </Box>
      
      <PostList initialPosts={initialPosts} />
    </Box>
  );
}