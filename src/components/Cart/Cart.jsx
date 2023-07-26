
import React, {useState, useEffect} from 'react'
import { Typography, ButtonGroup, Button } from "@mui/material";
import { Card, CardMedia } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme } from "@mui/material/styles";
import "./Cart.css"

function Cart( { cart, removeFromCart, quantityDecrement, handleAddToCart } ) {
  const [totalPrice, setTotalPrice] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    // Calculate the total price whenever the cart changes
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  const checkout = async () => {
    await fetch("http://localhost:8080/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
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
    <div className="container">
      <h1 className="title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <Typography variant="h3">
          Your cart is empty. Start shopping!
        </Typography>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <Card sx={{ minWidth: 275, maxWidth: 100 }} elevation={24}>
              <CardContent
                sx={{ backgroundColor: theme.palette.secondary.main }}
              >
                <CardMedia
                  component="img"
                  style={{ height: 150 }}
                  image={item.imageUrl}
                  alt={item.altText}
                />
                <Typography variant="h5" component="div">
                  {item.productName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  ${item.price}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Quantity in Cart: {item.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <ButtonGroup>
                  <Button
                    aria-label="reduce"
                    onClick={() => quantityDecrement(item._id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>

                  <Button
                    aria-label="increase"
                    onClick={() => handleAddToCart(item)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <Button onClick={() => removeFromCart(item)}>
                  Remove from cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
      <Typography variant="h5">Total: ${totalPrice}</Typography>
      <Button size="large" variant="contained" onClick={checkout}>
        Checkout
      </Button>
      <Typography variant="h6">
        Click checkout for taxes and shipping
      </Typography>
    </div>
  );
}

export default Cart


