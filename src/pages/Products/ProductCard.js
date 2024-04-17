import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const ProductCard = ({ product, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea onClick={() => onClick(product)}>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description.split(',').slice(0, 2).join(',')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
