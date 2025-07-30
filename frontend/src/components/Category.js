import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, Box, Typography, Container } from '@mui/material';
import axiosInstance from '../axiosConfig';
import { figmaTokens } from '../theme/figmaTokens';

export default function Category() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [category, setCategory] = useState({
    title: '',
    metaTitle: '',
    slug: '',
    content: ''
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSnackbarOpen(true);
    try {
      await axiosInstance.post('/categories', category);
      setSnackbarMessage('Category was added successfully!');
      setSnackbarSeverity('success');
      setCategory({ title: '', metaTitle: '', slug: '', content: '' });
      handleClose();
    } catch (error) {
      setSnackbarMessage('There was an error adding the category! Please try again');
      setSnackbarSeverity('warning');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            color: figmaTokens.colors.text.primary,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            mb: 2
          }}
        >
          Category Management
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: figmaTokens.colors.text.secondary,
            mb: 3
          }}
        >
          Create and manage categories for your content
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        onClick={handleClickOpen} 
        sx={{ 
          mb: 4,
          backgroundColor: figmaTokens.colors.primary.main,
          color: figmaTokens.colors.primary.contrastText,
          borderRadius: figmaTokens.borderRadius.medium,
          padding: '12px 24px',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: figmaTokens.colors.primary.dark,
          }
        }}
      >
        Add Category
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: figmaTokens.borderRadius.large,
            boxShadow: figmaTokens.shadows.heavy,
          }
        }}
      >
        <DialogTitle sx={{ 
          color: figmaTokens.colors.text.primary,
          fontWeight: 600,
          fontSize: '1.25rem',
          borderBottom: `1px solid ${figmaTokens.colors.border.light}`,
          pb: 2
        }}>
          Add Category
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            required
            value={category.title}
            onChange={handleChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: figmaTokens.borderRadius.medium,
                '& fieldset': {
                  borderColor: figmaTokens.colors.border.medium,
                },
                '&:hover fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="metaTitle"
            label="Meta Title"
            type="text"
            fullWidth
            value={category.metaTitle}
            onChange={handleChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: figmaTokens.borderRadius.medium,
                '& fieldset': {
                  borderColor: figmaTokens.colors.border.medium,
                },
                '&:hover fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="slug"
            label="Slug"
            type="text"
            fullWidth
            required
            value={category.slug}
            onChange={handleChange}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: figmaTokens.borderRadius.medium,
                '& fieldset': {
                  borderColor: figmaTokens.colors.border.medium,
                },
                '&:hover fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            minRows={3}
            value={category.content}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: figmaTokens.borderRadius.medium,
                '& fieldset': {
                  borderColor: figmaTokens.colors.border.medium,
                },
                '&:hover fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: figmaTokens.colors.primary.main,
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleClose} 
            sx={{ 
              color: figmaTokens.colors.text.secondary,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: figmaTokens.colors.background.default,
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              backgroundColor: figmaTokens.colors.primary.main,
              color: figmaTokens.colors.primary.contrastText,
              borderRadius: figmaTokens.borderRadius.medium,
              padding: '8px 24px',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: figmaTokens.colors.primary.dark,
              }
            }}
          >
            Add Category
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            minHeight: '80px',
            borderRadius: figmaTokens.borderRadius.medium,
            fontWeight: 500,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
