import { useState, useEffect } from 'react'
import './App.css'
import Admin from './components/Admin/Admin'
import ProductCreate from './components/Admin/ProductCreate'
import LandingPage from './components/LandingPage/LandingPage'
import Bio from "./components/Bio/Bio"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/footer/footer"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import Cart from "./components/Cart/Cart"
import Success from "./components/Checkout/Success"
import Cancel from "./components/Checkout/Cancel"



const theme = createTheme({
  palette: {
    primary: {
      main: "#a04d31",
    },
    secondary: {
      main: "#e1a08b",
    },
  },
})


function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product) => {

    setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
  }

  useEffect(() => {
    console.log("Current Cart:", cart);
  }, [cart]);


  return (

    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Navbar cart={cart}/>
      <Routes>
        <Route path="/" element={<LandingPage handleAddToCart={handleAddToCart}/>} />
        <Route path="admin" element={<Admin />} />
        <Route path="bio" element={<Bio />} />
        <Route path="cart" element={<Cart cart={cart} removeFromCart={removeFromCart}/>} />
        <Route path="success" element={<Success />}/>
        <Route path="cancel" element={<Cancel />}/>
      </Routes>
    </BrowserRouter>
    <Footer />
  </ThemeProvider>
  );
}

export default App
