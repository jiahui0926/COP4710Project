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
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { IUserInfoView } from "../types";

export default function NavigationBar() {
  const { signedIn, userName, userID, isASeller, signOut, signIn } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let navigate = useNavigate();

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const makeUserASeller = async () => {
    const userIDObj = {
      userid: userID,
    };
    console.log(userIDObj);
    const response = await fetch(
      `${API_BASE_URL}/${API_ROUTE_PATHS.ToMakeUserASeller}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userIDObj),
      }
    );
    if (!response.ok) {
      throw new Error("Error making user a seller.");
    } else {
      const updateUserInfo: IUserInfoView = await response.json();
      signIn(
        updateUserInfo.firstname,
        updateUserInfo.userid,
        updateUserInfo.isaseller
      );
      navigate(ROUTE_PATHS.YourShops);
    }
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
            <Button
              color="inherit"
              onClick={() => {
                navigate(ROUTE_PATHS.AllShops);
              }}
            >
              All Shops
            </Button>
          )}

          {signedIn && isASeller && (
            <Button
              color="inherit"
              onClick={() => {
                navigate(ROUTE_PATHS.YourShops);
              }}
            >
              Your Shops
            </Button>
          )}

          {signedIn && (
            <Button
              color="inherit"
              onClick={() => {
                navigate(ROUTE_PATHS.Orders);
              }}
            >
              Orders
            </Button>
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
              {signedIn
                ? [
                    signedIn && (
                      <MenuItem
                        key="seeAccountInformation"
                        onClick={() => {
                          navigate(ROUTE_PATHS.AccountInfo);
                          handleMenuClose();
                        }}
                      >
                        Your Account
                      </MenuItem>
                    ),
                    <MenuItem
                      key="signOut"
                      onClick={() => {
                        navigate(ROUTE_PATHS.Login);
                        signOut();
                        handleMenuClose();
                      }}
                    >
                      Sign Out
                    </MenuItem>,
                    signedIn && !isASeller && (
                      <MenuItem
                        key="becomeASeller"
                        onClick={() => {
                          makeUserASeller();
                          handleMenuClose();
                        }}
                      >
                        Become a seller
                      </MenuItem>
                    ),
                  ]
                : [
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
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
