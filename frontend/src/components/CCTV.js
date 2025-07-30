import React from 'react';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CCTV() {
  // Flat 섹션 데이터
  const flatImages = [
    {
      id: 1,
      title: "Sample Video #1",
      image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=300&h=200&fit=crop",
      description: "Baby sleeping peacefully"
    },
    {
      id: 2,
      title: "Living Room",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      description: "Modern living room with sofa"
    },
    {
      id: 3,
      title: "Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      description: "Clean modern kitchen"
    },
    {
      id: 4,
      title: "Hall",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      description: "Bright hallway"
    }
  ];

  // Cottage 섹션 데이터
  const cottageImages = [
    {
      id: 5,
      title: "House",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
      description: "Modern multi-story house"
    },
    {
      id: 6,
      title: "Living Room",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=200&fit=crop",
      description: "Luxurious living room"
    },
    {
      id: 7,
      title: "Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      description: "Kitchen with vegetables"
    },
    {
      id: 8,
      title: "Courtyard",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
      description: "A-frame style house"
    }
  ];

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: '0 auto' }}>
      {/* Flat Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            fontWeight: 600,
            color: '#333'
          }}
        >
          <Box 
            component="span" 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#4caf50', 
              mr: 2 
            }} 
          />
          Flat
        </Typography>
        
        <Grid container spacing={3}>
          {flatImages.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card 
                sx={{ 
                  position: 'relative',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                {index === 0 ? (
                  // 첫 번째 그리드에 IP 카메라 영상 표시
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <video
                      autoPlay
                      muted
                      loop
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    >
                      <source src="rtsp://210.99.70.120:1935/live/cctv001.stream" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <Box sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: 1,
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      LIVE
                    </Box>
                  </Box>
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                </CardContent>
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8, 
                  display: 'flex', 
                  gap: 1 
                }}>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#4caf50', 
                      color: 'white',
                      '&:hover': { backgroundColor: '#45a049' }
                    }}
                  >
                    <PlayArrowIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#2196f3', 
                      color: 'white',
                      '&:hover': { backgroundColor: '#1976d2' }
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Cottage Section */}
      <Box>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            fontWeight: 600,
            color: '#333'
          }}
        >
          <Box 
            component="span" 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%', 
              backgroundColor: '#4caf50', 
              mr: 2 
            }} 
          />
          Cottage
        </Typography>
        
        <Grid container spacing={3}>
          {cottageImages.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card 
                sx={{ 
                  position: 'relative',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.title}
                  </Typography>
                </CardContent>
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8, 
                  display: 'flex', 
                  gap: 1 
                }}>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#4caf50', 
                      color: 'white',
                      '&:hover': { backgroundColor: '#45a049' }
                    }}
                  >
                    <PlayArrowIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#2196f3', 
                      color: 'white',
                      '&:hover': { backgroundColor: '#1976d2' }
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
