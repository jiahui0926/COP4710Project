import { useState, useEffect } from "react";
import { ProductInfo } from "../types";
import ProductsGrid from "../components/ProductsGrid";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { Button, Container, Box } from "@mui/material";
import { ROUTE_PATHS } from "../constants/routes";

export default function ShopPage() {
  let navigate = useNavigate();
  let { isASeller } = useAuth();
  let { id } = useParams();
  const [shopProducts, setAllShopProducts] = useState<ProductInfo[]>([]);
  const [shopName, setShopName] = useState<String>("");

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

  const reloadShopProducts = () => {
    getShopProducts();
  };

  // Run API calls on initial render
  useEffect(() => {
    getShopProducts();
  }, []);

  // Return React component
  return (
    <Container>
      <h1>{shopName} Products</h1>
      {isASeller && (
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
        reloadFunction={reloadShopProducts}
      />
    </Container>
  );
}
