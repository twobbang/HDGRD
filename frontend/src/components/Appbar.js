import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { figmaTokens } from '../theme/figmaTokens';

export default function ButtonAppBar() {

  const {logout} = useAuth()

  const navigate = useNavigate();

  const logoutUser = () => {
    logout()
    navigate("/login")
  }

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{
          backgroundColor: '#1976d2',
          boxShadow: figmaTokens.shadows.light,
          borderBottom: `1px solid ${figmaTokens.colors.border.light}`,
        }}
      >
        <Toolbar sx={{ minHeight: '72px' }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ 
              mr: 3,
              color: '#ffffff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '-0.025em',
            }}
          >
            AI Digital Community
          </Typography>
          
          {/* Navigation Menu */}
          <Button 
            onClick={() => navigate('/webrtc')}
            sx={{ 
              mx: 1,
              color: '#ffffff',
              fontWeight: 500,
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            CCTV
          </Button>
          <Button 
            onClick={() => navigate('/category')}
            sx={{ 
              mx: 1,
              color: '#ffffff',
              fontWeight: 500,
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Category
          </Button>
          <Button 
            onClick={() => navigate('/products')}
            sx={{ 
              mx: 1,
              color: '#ffffff',
              fontWeight: 500,
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Products
          </Button>
          
          <Button 
            onClick={() => navigate('/registration')}
            sx={{ 
              mx: 1,
              color: '#ffffff',
              fontWeight: 500,
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Register
          </Button>
          
          <Button 
            onClick={logoutUser} 
            sx={{ 
              ml: 2,
              color: '#ffffff',
              fontWeight: 500,
              '&:hover': {
                color: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
