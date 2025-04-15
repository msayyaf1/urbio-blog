'use client';

import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert,
  Snackbar,
  Stack,
  Divider
} from '@mui/material';
import { useAddPostMutation } from '@/services/postsApi';
import { useRouter } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [authorError, setAuthorError] = useState('');
  
  const router = useRouter();
  
  // rtk query mutation hook
  const [addPost, { isLoading, error }] = useAddPostMutation();
  
  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    if (!body.trim()) {
      setBodyError('Content is required');
      isValid = false;
    } else {
      setBodyError('');
    }
    
    if (!author.trim()) {
      setAuthorError('Author name is required');
      isValid = false;
    } else {
      setAuthorError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await addPost({ 
        title, 
        body, 
        author
      }).unwrap();
      
      setSuccessOpen(true);
      
      setTitle('');
      setBody('');
      setAuthor('');
      
      // redirect
      setTimeout(() => {
        router.push('/posts');
      }, 2000);
      
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };
  
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/posts')}
        >
          Back to Posts
        </Button>
      </Box>
      
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }} elevation={1}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Create New Post
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to create post. Please try again.
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!titleError}
              helperText={titleError}
            />
            
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              error={!!authorError}
              helperText={authorError}
            />
            
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              error={!!bodyError}
              helperText={bodyError}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                variant="outlined" 
                sx={{ mr: 2 }}
                onClick={() => router.push('/posts')}
              >
                Cancel
              </Button>
              
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Publish Post
              </LoadingButton>
            </Box>
          </Stack>
        </Box>
      </Paper>
      
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          Post created successfully! Redirecting to posts...
        </Alert>
      </Snackbar>
    </Box>
  );
}