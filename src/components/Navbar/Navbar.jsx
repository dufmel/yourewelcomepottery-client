
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import logo from "/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Badge, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./Navbar.css";


function Navbar( {cart}) {
  const [currentTabValue, setCurrentTabValue] = useState("");

  const handleTabChange = (e, newValue) => {
    setCurrentTabValue(newValue);
  };
  const theme = useTheme();
  const productsCount = (cart.length)
  return (
    <>
      <div className="checkout-container">


                <Badge badgeContent={productsCount} className="white-badge">
                  {/* <Button startIcon={<ShoppingCartIcon sx={{ color: 'white', fontSize: 58}}/>}></Button> */}
                  <IconButton className="cart" component={Link} to="/Cart">
                    <ShoppingCartIcon
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  </IconButton>
                </Badge>
            
      </div>
      <div className="container">
        <img src={logo} alt="<You're Welcome Potteyr Logo>" className="logo" />
        <h1 className="title">You're Welcome Pottery</h1>
        <Tabs
          className="tabs"
          value={currentTabValue}
          textColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "primary.main",
            },
          }}
          onChange={handleTabChange}
        >
          <Tab label="Home" component={Link} to="/">
            Home
          </Tab>
          <Tab label="About" component={Link} to="/bio">
            About
          </Tab>
        </Tabs>
      </div>
    </>

  );
}

export default Navbar;
