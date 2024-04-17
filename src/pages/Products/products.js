import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import products from './mockdata.js'
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
    
  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {!selectedProduct ? (
          products.map((product) => (
            <ProductCard key={product.productID} product={product} onClick={handleCardClick} />
          ))
        ) : (
          <ProductDetail product={selectedProduct} />
        )}
      </Grid>
    </Container>
  );
};

export default Products;
