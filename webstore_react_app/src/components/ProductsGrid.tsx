import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { ICreateOrderInfo, ProductInfo } from "../types";
import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect } from "react";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../constants/routes";

interface ProductsGridProps {
  gridItems: ProductInfo[];
  reloadFunction: () => void;
}

function ProductsGrid({ gridItems, reloadFunction }: ProductsGridProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [quantities, setQuantities] = useState<{ [productid: string]: number }>(
    {}
  );
  let { userID } = useAuth();
  let navigate = useNavigate();

  // Initialize quantities for each product
  useEffect(() => {
    const initialQuantities = gridItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.productid]: 1, // default quantity is 1
      }),
      {}
    );
    setQuantities(initialQuantities);
  }, [gridItems]);

  // Handler to update text/number field quantity
  const handleQuantityChange = (productid: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productid]: value < 1 ? 1 : value, // ensure the quantity never goes below 1
    }));
  };

  // Function to create order on database an update product quantity
  const buyProduct = async (
    productid: string,
    shopid: string,
    quantity: number
  ) => {
    const buyInfo: ICreateOrderInfo = {
      userid: userID,
      shopid: shopid,
      productid: productid,
      quantity: quantity,
    };

    try {
      // Make API calls and store response
      const response = await fetch(
        `${API_BASE_URL}/${API_ROUTE_PATHS.ToBuyProduct}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buyInfo),
        }
      );

      // If the response is not a status in 200-299
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Not enough in stock.");
        } else if (response.status === 400) {
          throw new Error("Server error");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate(ROUTE_PATHS.Orders);
    } catch (error: any) {
      // Set snackbar message
      setSnackbarMessage(error.message);
      // Show snackbar
      setSnackbarOpen(true);
    }

    console.log(buyInfo);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const populateProductsGrid = (gridItems: ProductInfo[]) =>
    gridItems.map((product, index) => {
      const handleBuyClick = () => {
        buyProduct(
          product.productid,
          product.shopid,
          quantities[product.productid]
        );
      };

      return (
        <Grid item xs={6} md={4} key={index}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Shop: {product.shopname}
              </Typography>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ${product.price}
              </Typography>
              <Typography variant="body2">
                Description:
                <br />
                {product.description}
                <br />
                Quantity: {product.quantity}
              </Typography>
            </CardContent>
            <CardActions>
              <TextField
                size="small"
                label="Qty"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={quantities[product.productid] || 1}
                onChange={(e) =>
                  handleQuantityChange(
                    product.productid,
                    parseInt(e.target.value, 10)
                  )
                }
                sx={{ mr: 1 }} // Add some margin to the right of the TextField
              />
              <Button size="small" onClick={handleBuyClick}>
                Buy
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {populateProductsGrid(gridItems)}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductsGrid;
