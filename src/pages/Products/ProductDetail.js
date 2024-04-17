import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetail = ({ product, onResetSelection }) => {
  return (
    <Card sx={{
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
      position: 'relative' 
    }}>
      <IconButton
        sx={{
          position: 'absolute',
          top: 16, 
          left: 16, 
          zIndex: 10 
        }}
        onClick={onResetSelection}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            style={{ objectFit: 'contain' }}
            sx={{ width: '100%', height: 300 }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h6">
              Price: ${product.price}
            </Typography>
            <Typography variant="body1">
              In stock: {product.stockQuantity}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetail;
