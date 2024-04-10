import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";

export default function CreateStorePage() {
  const { userID } = useAuth();

  // States for form values
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");

  // Handler for form submission
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const shopInfo = {
      owner: userID,
      shopname: formData.get("shopname") as string,
      description: formData.get("shopdescription") as string,
    };
    console.log(shopInfo);
  };

  // Handlers for changes
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "shopname":
        setShopName(value);
        break;
      case "shopdescription":
        setShopDescription(value);
        break;
      default:
        break;
    }
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
          Create Shop
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
          <Grid container spacing={2}>
            {/* Shop Name Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="shopname-field"
                label="Shop Name"
                name="shopname"
                inputProps={{ maxLength: 100 }}
                onChange={handleFieldChange}
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
                label="Shop description"
                name="shopdescription"
                inputProps={{ maxLength: 500 }}
                onChange={handleFieldChange}
              />
            </Grid>

            {/* Submit Button */}
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
