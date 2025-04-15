import { Box } from '@mui/material';
import PostDetail from '@/components/posts/PostDetail';
import { getPostById } from '@/services/postsApi';
import { store } from '@/lib/redux/store';
import { notFound } from 'next/navigation';
import type { RootState } from '@/lib/redux/store';

interface PostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetailPage({ 
  params,
}: PostDetailPageProps) {
  // await the params before accessing properties
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // to fetch the post on the server
  try {
    await store.dispatch(getPostById.initiate(id));
    const postResult = getPostById.select(id)(store.getState() as RootState);
    const initialPost = postResult.data;
    
    // if post not found, render 404
    if (!initialPost) {
      notFound();
    }
    
    return (
      <Box>
        <PostDetail postId={id} initialPost={initialPost} />
      </Box>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}