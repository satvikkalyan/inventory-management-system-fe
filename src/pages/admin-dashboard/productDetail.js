import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const ProductDetail = ({ productRecieved, onResetSelection }) => {
  console.log(productRecieved);
  const [product, setModifiedProduct] = useState(productRecieved);
  console.log(product)
  // Function to handle changes in form fields
  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    setModifiedProduct({
      ...product,
      [name]: value
    });
    console.log(product)
  };
  const updateModifiedProduct =async()=>{
    console.log(product)
    const jsonData = JSON.stringify(product);
    try{
      const response=await fetch('http://localhost:8090/api/products/addOrUpdate',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body:jsonData
      })
    }
    catch(error){
      console.log(error)
    }
  }
  const restProduct =()=>{
    setModifiedProduct(productRecieved)
  }
  
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
            image={product.images[0].imageURL}
            alt={product.productName}
            style={{ objectFit: 'contain' }}
            sx={{ width: '100%', height: 300 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent sx={{ flexGrow: 1 }}>
          <TextField
                label="producId"
                variant="outlined"
                name="product_id"
                value={product.product_id}
                // InputProps={{
                //   readOnly: true,
                // }}
                onChange={handleChangeEvent}
                fullWidth
                />
                <TextField
                label="productName"
                variant="outlined"
                name="productName"
                value={product.productName}
                onChange={handleChangeEvent}
                fullWidth
                />
                 <TextField
                label="productDescription"
                variant="outlined"
                name="productDescription"
                multiline
                onChange={handleChangeEvent}
                value={product.productDescription}
                fullWidth
                />
                <TextField
                label="price"
                variant="outlined"
                name="price"
                onChange={handleChangeEvent}
                value={product.price}
                fullWidth
                />
                <TextField
                label="stockQuantity"
                variant="outlined"
                name="stockQuantity"
                onChange={handleChangeEvent}
                value={product.stockQuantity}
                fullWidth
                />
                <TextField
                label="category"
                variant="outlined"
                name="category"
                onChange={handleChangeEvent}
                value={product.category.categoryName}
                fullWidth
                />
                <Button color="primary" variant="contained" sx={{ mt: 2 }} onClick={updateModifiedProduct}>
              Save
            </Button>
            <Button color="secondary" variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={restProduct}>
              Cancel
            </Button>
        
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetail;
