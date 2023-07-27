
import React, {useState, useEffect} from 'react'
import { Typography, Button } from "@mui/material";

function Cart( { cart, removeFromCart } ) {

const [totalPrice, setTotalPrice] = useState(0)
  
  useEffect(() => {
    // Calculate the total price whenever the cart changes
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  console.log(cart);


  const checkout = async () => {
    await fetch("http://localhost:4000/products/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.url) {
          window.location.assign(res.url);
        }
      });
  };

  return (
    <div>
      <Typography variant="h4">Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        cart.map((item) => (
          <div key={item.id}>

            <Typography variant="body1">{item.productName}</Typography>
            <Typography variant="body2">${item.price}</Typography>
            <Button onClick={() => removeFromCart(item)}>Remove</Button>
            
            
          </div>
        ))
      )}
      <Typography variant="body1">Total: ${totalPrice}</Typography>
      <Button onClick={checkout}> Checkout </Button>

    </div>
  );
}

export default Cart

