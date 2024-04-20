import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { useAuth } from "../contexts/AuthProvider";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { ILoginInfo, IUserInfoView } from "../types";

export default function LoginPage() {
  const { signedIn, userName, userID, signIn } = useAuth();

  // States for form values
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handler for form submission
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const loginInfo: ILoginInfo = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Try to run log in API call
    try {
      // Make API calls and store response
      const response = await fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.Login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      // If the response is not a status in 200-299
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Wrong email or password");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If response is ok, extract json object from it
      const userData: IUserInfoView = await response.json();
      // Set AuthContext/SignIn
      signIn(userData.firstname, userData.userid, userData.isaseller);
      // Redirect to homepage
      navigate(ROUTE_PATHS.Home);
    } catch (error: any) {
      // Set snackbar message
      setSnackbarMessage(error.message);
      // Show snackbar
      setSnackbarOpen(true);
    }
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
        <Typography component="h1" variant="h3" align="center">
          Log In
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
          <Grid container spacing={2}>
            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email-field"
                label="Email"
                name="email"
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            {/* Passsword Field */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password-field"
                label="Password"
                name="password"
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            {/* Login In Button */}
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
            >
              <Typography variant="subtitle2">
                Don't have an account?{" "}
                <Link
                  className="link-hover-pointer"
                  color="primary"
                  onClick={() => {
                    navigate(ROUTE_PATHS.SignUp);
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
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
    </Container>
  );
}
