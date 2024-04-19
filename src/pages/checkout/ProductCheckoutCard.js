import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector,useDispatch } from 'react-redux';
import { cartActions } from './../../redux/reducers/Cart';

const ProductCheckoutCard= ({ product }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const item = cartItems.find(item => item.product_id === product.product_id);
    const currentProductCount = item ? item.quantity : 0;
  
    const handleAddToCart = () => {
      if (currentProductCount === 0) {
        dispatch(cartActions.addToCart({...product, quantity: 1}));
      }
    };
  
    const handleIncrement = () => {
      dispatch(cartActions.updateQuantity({product_id: product.product_id, quantity: currentProductCount + 1}));
    };
  
  
    const handleDecrement = () => {
      if (currentProductCount > 1) {
        dispatch(cartActions.updateQuantity({product_id: product.product_id, quantity: currentProductCount - 1}));
      } else {
        dispatch(cartActions.removeFromCart({product_id: product.product_id}));
      }
    };
  
    return (
      <Card sx={{
        width: '90%',
        display: 'flex',
        mt: 2,
        ml: 5,
        flexDirection: 'column',
        position: 'relative'
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CardMedia
              component="img"
              image={product.images[0].imageURL}
              alt={product.name}
              style={{ objectFit: 'contain' }}
              sx={{ width: '80%', height: 200, p: 2 }}

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
              {currentProductCount === 0 ?
                (
                  <Button
                    variant="outlined"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
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

export default ProductCheckoutCard