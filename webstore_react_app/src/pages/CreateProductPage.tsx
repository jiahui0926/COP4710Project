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
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";

export default function CreateStorePage() {
  let { shopID } = useParams();
  // States for form values
  const [shopName, setShopName] = useState("");

  // Run API calls on initial render
  useEffect(() => {
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetTheNameOfAShop}/${shopID}`)
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

    const productInfo = {
      shopid: shopID || "", // Assuming shopID is obtained from useParams()
      name: formData.get("productname") as string,
      description: formData.get("productdescription") as string,
      price: parseFloat(formData.get("price") as string) || 0,
      quantity: parseInt(formData.get("productquantity") as string, 10) || 0,
    };
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
          Create New Product for {shopName}
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
