import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const ProductDetail = ({ product }) => {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent>
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
