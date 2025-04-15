'use client';

import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Divider,
  Box,
  CardHeader,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Post } from '@/types';
import Link from 'next/link';
import { formatDate, createExcerpt } from '@/lib/utils';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const excerpt = createExcerpt(post.body, 120);
  
  // get author initials for avatar
  const authorInitials = post.author
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  // format the date
  const formattedDate = formatDate(post.createdAt);
  
  return (
<Card
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '362px',       
    width: '362px',
    overflow: 'hidden',
  }}
>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {authorInitials}
          </Avatar>
        }
        title={post.author}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
        }
      />
      
      <CardContent sx={{ flexGrow: 1, pt: 0, height: 'calc(100% - 120px)', 
  overflow: 'hidden'  }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: isMobile ? '56px' : '64px',
            mb: 2,
          }}
        >
          {post.title}
        </Typography>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            minHeight: '60px',
            lineHeight: 1.6,
          }}
        >
          {excerpt}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
          <Button 
            size="small" 
            variant="contained" 
            endIcon={<ArrowForwardIcon />}
          >
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}