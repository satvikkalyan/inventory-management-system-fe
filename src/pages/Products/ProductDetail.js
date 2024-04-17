import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetail = ({ product, onResetSelection }) => {
  const [cart, setCart] = useState([{}])
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
            <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'medium' }}>
              Price: ${product.price}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              In stock: {product.stockQuantity}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              sx={{
                mt: 2,
                alignSelf: 'start'
              }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetail;
