import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';

import axios from 'axios';

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
      await axios.post('http://localhost:8080/categories', category, { withCredentials: true });
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
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ my: 2 }}>
        Add Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            required
            value={category.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="metaTitle"
            label="Meta Title"
            type="text"
            fullWidth
            value={category.metaTitle}
            onChange={handleChange}
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
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            minRows={2}
            value={category.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
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
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ display: 'flex', alignItems: 'center', minHeight: '80px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
