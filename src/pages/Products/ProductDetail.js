import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductDetail = ({ product, onResetSelection }) => {
  const [cart, setCart] = useState([]) // Change this to get from Redux after redux integration
  const currentProductCount = useMemo(() => {
    const item = cart.find(item => item.productID === product.productID);
    return item ? item.count : 0;
  }, [cart, product.productID]);

  const updateProductCount = (newCount) => {
    setCart(currentCart => {
      const cartIndex = currentCart.findIndex(item => item.productID === product.productID);
      if (cartIndex !== -1) {
        const updatedCart = [...currentCart];
        updatedCart[cartIndex] = { ...updatedCart[cartIndex], count: newCount };
        return updatedCart;
      } else {
        return [...currentCart, { productID: product.productID, count: newCount }];
      }
    });
  };

  const handleIncrement = () => {
    updateProductCount(currentProductCount + 1);
  };

  const handleDecrement = () => {
    if (currentProductCount > 0) {
      updateProductCount(currentProductCount - 1);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue >= 0) {
      updateProductCount(intValue);
    }
  };

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
            {currentProductCount == 0 ?
              (
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => updateProductCount(1)}
                  sx={{
                    mt: 2,
                    alignSelf: 'start'
                  }}
                >
                  Add to Cart
                </Button>

              ) :
              (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <IconButton size="small" onClick={handleDecrement} disabled={currentProductCount < 1}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={currentProductCount}
                    disabled
                    onChange={handleChange}
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Qty:</InputAdornment>,
                    }}
                    sx={{ width: '100px' }}
                  />
                  <IconButton size="small" onClick={handleIncrement} disabled={currentProductCount >= product.stockQuantity}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </div>
              )
            }
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductDetail;
