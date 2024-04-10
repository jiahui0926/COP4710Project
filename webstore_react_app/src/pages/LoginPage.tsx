import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { useAuth } from "../contexts/AuthProvider";

export default function LoginPage() {
  const { signedIn, userName, userID, signIn } = useAuth();
  useEffect(() => {
    if (signedIn) {
      navigate(ROUTE_PATHS.Home);
    }
  }, []);

  // States for form values
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handler for form submission
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const loginInfo = {
      email: formData.get("email") as string,
      passowrd: formData.get("password") as string,
    };
    console.log(loginInfo);
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
    </Container>
  );
}
