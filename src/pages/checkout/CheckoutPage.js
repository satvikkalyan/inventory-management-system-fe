import React from 'react';
import { useSelector } from 'react-redux';
import ProductCheckoutCard from './ProductCheckoutCard';
import { Box, Button,Grid,  Typography, Card, CardContent } from '@mui/material';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const itemsDetails = cartItems.map(item => ({
    name: item.name,
    quantity: item.quantity,
    totalCost: item.price * item.quantity
  }));

  const subtotal = itemsDetails.reduce((total, item) => total + item.totalCost, 0);
  const taxRate = 0.1; 
  const tax = subtotal * taxRate; 
  const total = subtotal + tax; 


  return (
    <Box display="flex" p={2} justifyContent="space-between" alignItems="flex-start">
      <Box flexGrow={1} pr={2}>
        {cartItems.map(item => (
          <ProductCheckoutCard key={item.productID} product={item} />
        ))}
      </Box>
      <Card sx={{ width: 400 }}>
      <CardContent>
  <Typography variant="h6" gutterBottom component="div">
    Order Summary
  </Typography>
  <Grid container spacing={2}>
    {itemsDetails.map((item, index) => (
      <React.Fragment key={index}>
        <Grid item xs={6}>
          <Typography variant="body1" component="span">
            {item.name} - Qty: {item.quantity}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Typography variant="body1" component="span" sx={{ fontFamily: 'monospace' }}>
            ${item.totalCost.toFixed(2)}
          </Typography>
        </Grid>
      </React.Fragment>
    ))}
  </Grid>
  <Grid container spacing={2} sx={{ mt: 2 }}>
    <Grid item xs={6}>
      <Typography variant="body1" component="span">
        Subtotal
      </Typography>
    </Grid>
    <Grid item xs={6} textAlign="right">
      <Typography variant="body1" component="span" sx={{ fontFamily: 'monospace' }}>
        ${subtotal.toFixed(2)}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="body1" component="span">
        Tax (10%)
      </Typography>
    </Grid>
    <Grid item xs={6} textAlign="right">
      <Typography variant="body1" component="span" sx={{ fontFamily: 'monospace' }}>
        ${tax.toFixed(2)}
      </Typography>
    </Grid>
  </Grid>
  <Grid container sx={{ mt: 2 }}>
    <Grid item xs={12} textAlign="right">
      <Typography variant="h5" component="span" sx={{ fontFamily: 'monospace' }}>
        Total: ${total.toFixed(2)}
      </Typography>
    </Grid>
  </Grid>
  <Button
    variant="contained"
    color="primary"
    fullWidth
    sx={{ mt: 2 }}
    onClick={() => console.log('Purchase')}
  >
    Purchase
  </Button>
</CardContent>

      </Card>
    </Box>
  );
}

export default CheckoutPage;
