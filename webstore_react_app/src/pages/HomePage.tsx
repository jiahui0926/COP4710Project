import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { ROUTE_PATHS } from "../constants/routes";
import { siteName } from "../constants/brandConstants";

export default function HomePage() {
  const { signedIn } = useAuth();
  let navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper elevation={3} sx={{ marginTop: 8, padding: 8 }}>
        {/* Welcome Title Message */}
        <Typography component="h1" variant="h2" align="center">
          Welcome to {siteName}
        </Typography>
        <Grid container spacing={2}>
          {/* Button linking to Sign Up Page */}
          {!signedIn && (
            <>
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
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() => navigate(ROUTE_PATHS.SignUp)}
                >
                  Create Account
                </Button>
              </Grid>
              ,{/* Button linking to Log In Page */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATHS.Login)}
                >
                  Log In
                </Button>
              </Grid>
            </>
          )}
          {signedIn && (
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
              <Button
                type="button"
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate(ROUTE_PATHS.AllShops)}
                size="large"
              >
                See All Stores
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}
