import React, {useState, useEffect} from 'react'
import { useSearchParams, Link } from "react-router-dom"
import "./LandingPage.css"
import ProductCard from './ProductCard'
import { Tabs, Tab } from "@mui/material";


function LandingPage({ products, handleAddToCart }) {
  const [currentTabValue, setCurrentTabValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const tagFilter = searchParams.get("tag");
  console.log(tagFilter);

  useEffect(() => {
    console.log("displayedProducts", displayedProducts);
    setCurrentTabValue(tagFilter || "");
  }, [tagFilter]);

  const handleTabChange = (e, newValue) => {
    setCurrentTabValue(newValue);
  };

  //Filters product by tag name - if there is a matching tag, display filtered products otherwise, all products
  const displayedProducts = tagFilter
    ? products.filter(
        (product) => product.tag.toLowerCase() === tagFilter.toLowerCase()
      )
    : products;

  return (
    <>
      <nav className="links">
        {/* Link that displays filtered products */}

        <Tabs
          value={currentTabValue}
          textColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "primary.main",
            },
          }}
          onChange={handleTabChange}
        >
          <Tab label="All Items" value="" component={Link} to="." />
          <Tab
            label="Sedona"
            value="sedona"
            component={Link}
            to="?tag=sedona"
          />
          <Tab
            label="Black and White"
            value="bw"
            component={Link}
            to="?tag=bw"
          />
          <Tab
            label="Fun Guys"
            value="funguys"
            component={Link}
            to="?tag=funguys"
          />
          <Tab label="Jo" value="jo" component={Link} to="?tag=jo" />
        </Tabs>
      </nav>
      {displayedProducts.length === 0 && (
        <h2 className="no-products">
          There are currently no products available in this line. Check back
          later!
        </h2>
      )}

      {/* Maps through displayedProducts and returns a grid with items in ProductCard component */}
      <div className="product-cards-container">
        {displayedProducts.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          );
        })}
      </div>
    </>
  );
}

export default LandingPage  