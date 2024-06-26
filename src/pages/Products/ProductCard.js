import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';


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
        <CardActionArea onClick={() => onClick(product)}>
          <CardMedia
            component="img"
            height="140"
            image={product.images[0].imageURL}
            alt={product.productName}
            style={{ objectFit: 'contain' }}
          />
          <CardContent style={cardContentStyle}>
            <Typography gutterBottom variant="h5" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncatedDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
