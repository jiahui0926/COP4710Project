import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { ICreateProductInfo } from "../types";
import { ROUTE_PATHS } from "../constants/routes";

export default function CreateStorePage() {
  let navigate = useNavigate();
  let { shopID } = useParams();
  // States for form values
  const [shopName, setShopName] = useState("");

  // Run API calls on initial render
  useEffect(() => {
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetShopInfo}/${shopID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        setShopName(response[0].shopname);
      });
  }, []);

  // Handler for form submission
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const productInfo: ICreateProductInfo = {
      shopid: shopID || "", // Assuming shopID is obtained from useParams()
      name: formData.get("productname") as string,
      description: formData.get("productdescription") as string,
      price: parseFloat(formData.get("price") as string) || 0,
      quantity: parseInt(formData.get("productquantity") as string, 10) || 0,
    };

    // Try to run sign up API call
    try {
      // Make API calls and store response
      const response = await fetch(
        `${API_BASE_URL}/${API_ROUTE_PATHS.ToCreateProduct}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productInfo),
        }
      );

      // If the response is not a status in 200-299
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Error creating Shop");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Go to the Shop's Page
      navigate(`${ROUTE_PATHS.Shop}/${productInfo.shopid}`);
    } catch (error: any) {
      console.error("SignUp Error:", error.message);
    }
    console.log(productInfo);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh", // Full height of the viewport
      }}
    >
      <Paper elevation={3} sx={{ marginTop: 8, padding: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Create New Product for{" "}
          <Typography component="h1" variant="h3" align="center">
            {shopName}
          </Typography>
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
          <Grid container spacing={2}>
            {/* Product Name Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="productname-field"
                label="Product Name"
                name="productname"
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            {/* Price Field */}
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                multiline
                id="price-field"
                label="Price"
                name="price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Quantity Field */}
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                multiline
                id="quantity-field"
                label="Product Quantity"
                name="productquantity"
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                minRows={3}
                maxRows={7}
                id="description-field"
                label="Product description"
                name="productdescription"
                inputProps={{ maxLength: 500 }}
              />
            </Grid>

            {/* Submit In Button */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Submit
              </Button>
            </Grid>
            {/* Create account link/option */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            ></Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
