import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';


const cardContentStyle = {
  height: '100px',
  overflow: 'hidden'
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};



const ProductCard = ({ product, onClick }) => {
  const truncatedDescription = truncateText(product.productDescription, 100);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea >
          <CardMedia
            component="img"
            height="140"
            image={product.images[0].imageURL}
            alt={product.productName}
            style={{ objectFit: 'contain' }}
          />
          <Button onClick={() => onClick(product)}>Edit</Button>
          <CardContent style={cardContentStyle}>
            <Typography gutterBottom variant="h5" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncatedDescription}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
