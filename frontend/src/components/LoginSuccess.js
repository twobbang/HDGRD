import React from 'react'
import {Typography, Container, Box } from '@mui/material';

export default function LoginSuccess() {
  return (
    <Container maxWidth="xs">
    <Box sx={{ mt: 8, color: 'green' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Start Now!!
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        <a href="/products">Go Home</a>
      </Typography>
    </Box>
    </Container>
  )
}
