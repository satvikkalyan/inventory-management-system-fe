import React, { useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './productCard.js';
import ProductDetail from './productDetail';
import products from '../../data/sampleproducts/mockdata.js'
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts,setAllProducts] = useState(products);
  useEffect(()=>{
    fetchProducts()
  
  },[setAllProducts])
  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };
  const fetchProducts = async() =>{
    try{
      const response = await fetch('http://localhost:8090/api/products/getAll',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        
      })
      if (response.ok){
        const productData = await response.json();
        console.log(productData)
        setAllProducts(productData)
        
      }
      else{
        setAllProducts(products)
      }
    }
    catch(error){
      console.log('Failed to fetch product details',error)
    }
  }
  

  const handleResetSelection = () => {
    setSelectedProduct(null)
  }

  return (
    <Container>
      <Grid container spacing={4}>
        {!selectedProduct ? (
          allProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} onClick={handleCardClick} />
          ))
        ) : (
          <ProductDetail productRecieved={selectedProduct} onResetSelection={handleResetSelection} />
        )}
      </Grid>
    </Container>
  );
};

export default Products;
