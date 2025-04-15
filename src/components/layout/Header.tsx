'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  useMediaQuery,
  useTheme,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const drawerItems = [
    { text: 'Home', icon: <HomeIcon />, href: '/' },
    { text: 'New Post', icon: <CreateIcon />, href: '/posts/create' },
  ];

  const MobileDrawer = (
    <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <List>
          {drawerItems.map((item) => (
            <Link key={item.text} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" color="primary" elevation={0} sx={{ mb: 4, borderRadius: 0, }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <ArticleIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="div"
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700, 
                letterSpacing: '0.5px',
              }}
            >
              Urbio Tech Blog Dashboard
            </Typography>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              {MobileDrawer}
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/posts" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit" sx={{ mx: 1 }}>
                    Blog Posts
                  </Button>
                </Link>
                
                <Link href="/posts/create" style={{ textDecoration: 'none', marginLeft: 2 }}>
                  <Button 
                    variant="contained" 
                    color="secondary"
                    startIcon={<CreateIcon />}
                    sx={{ 
                      color: 'white',
                      boxShadow: 2,
                    }}
                  >
                    New Post
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}