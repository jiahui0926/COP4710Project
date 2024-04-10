import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../constants/routes";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useAuth } from "../contexts/AuthProvider";

export default function NavigationBar() {
  const { signedIn, userName, isASeller, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let navigate = useNavigate();

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 15 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => {
              navigate(ROUTE_PATHS.Home);
            }}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>

          {signedIn && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate(ROUTE_PATHS.AllShops);
                }}
              >
                All Stores
              </Button>
            </>
          )}

          {signedIn && isASeller && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate(ROUTE_PATHS.YourShops);
                }}
              >
                Your Stores
              </Button>
            </>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="large" color="inherit" onClick={handleIconClick}>
              {signedIn && (
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ flexGrow: 1, mr: 2 }}
                >
                  {userName}
                </Typography>
              )}
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {signedIn ? (
                <MenuItem
                  key="signOut"
                  onClick={() => {
                    navigate(ROUTE_PATHS.Login);
                    signOut();
                    handleMenuClose();
                  }}
                >
                  Sign Out
                </MenuItem>
              ) : (
                [
                  <MenuItem
                    key="login"
                    onClick={() => {
                      navigate(ROUTE_PATHS.Login);
                      handleMenuClose();
                    }}
                  >
                    Log In
                  </MenuItem>,
                  <MenuItem
                    key="createAccount"
                    onClick={() => {
                      navigate(ROUTE_PATHS.SignUp);
                      handleMenuClose();
                    }}
                  >
                    Create Account
                  </MenuItem>,
                ]
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
