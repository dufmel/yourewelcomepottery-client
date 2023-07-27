import React, {useState, useEffect} from 'react'
import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { shadows } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ProductCard( { product, onAddToCart } ) {

    const [expanded, setExpanded] = useState(false);
    
    const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="400"
        image={product.imageUrl}
        alt={product.altText}
      />
      <CardContent sx={{ backgroundColor: theme.palette.secondary.main }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.productName}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ backgroundColor: theme.palette.secondary.main }}>
        {product.quantity > 0 ? (
          <Button onClick={handleAddToCart} startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
        ) : (
          <Typography paragraph color="primary.main">
            SOLD OUT
          </Typography>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{product.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ProductCard


