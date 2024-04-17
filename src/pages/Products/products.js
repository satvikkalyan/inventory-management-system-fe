import React, { useState } from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';
import products from '../../data/sampleproducts/mockdata.js'
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleResetSelection = () => {
    setSelectedProduct(null)
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {!selectedProduct ? (
          products.map((product) => (
            <ProductCard key={product.productID} product={product} onClick={handleCardClick} />
          ))
        ) : (
          <ProductDetail product={selectedProduct} onResetSelection={handleResetSelection} />
        )}
      </Grid>
    </Container>
  );
};

export default Products;
