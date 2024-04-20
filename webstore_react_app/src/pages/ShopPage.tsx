import { useState, useEffect } from "react";
import { IProductSearch, ProductInfo } from "../types";
import ProductsGrid from "../components/ProductsGrid";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { Button, Container, Box, TextField } from "@mui/material";
import { ROUTE_PATHS } from "../constants/routes";
import { ShopInfo } from "../types";

export default function ShopPage() {
  let navigate = useNavigate();
  let { isASeller, userID } = useAuth();
  let { id } = useParams();
  const [shopProducts, setAllShopProducts] = useState<ProductInfo[]>([]);
  const [shopName, setShopName] = useState<String>("");
  const [userOwnsShop, setUserOwnsShop] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getShopProducts = () => {
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetShopInfo}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        setShopName(response[0].shopname);
      });
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetAllProductsInAShop}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        setAllShopProducts(response);
      });
  };

  const getShopProductLike = (searchQuery: string) => {
    const productSearch: IProductSearch = {
      shopid: id,
      searchQuery: searchQuery,
    };
    console.log("get like");
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToSearchForProductsInAShop}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productSearch),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        setAllShopProducts(response);
      });
  };

  const getShopsOwnedByUser = () => {
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetShopsOfUser}/${userID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          let shop: ShopInfo = response[i];
          if (shop.shopid === id) {
            setUserOwnsShop(true);
          }
        }
      });
  };

  const reloadShopProducts = () => {
    getShopProducts();
  };

  // Run API calls on initial render
  useEffect(() => {
    getShopProducts();
    getShopsOwnedByUser();
  }, []);

  // Return React component
  return (
    <Container>
      <h1>{shopName} Products</h1>
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => {
          const searchStr = e.target.value;
          setSearchQuery(searchStr);
          getShopProductLike(searchStr);
        }}
        sx={{ width: "30%", mb: 3 }} // Adjust the width as needed
      />
      {userOwnsShop && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns the child (Button) to the right
            marginBottom: 2, // Adds some space below the button before the table
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(`${ROUTE_PATHS.CreateProduct}/${id}`)}
          >
            Add New Product
          </Button>
        </Box>
      )}
      <ProductsGrid
        gridItems={shopProducts}
        userOwnsShop={userOwnsShop}
        reloadFunction={reloadShopProducts}
      />
    </Container>
  );
}
