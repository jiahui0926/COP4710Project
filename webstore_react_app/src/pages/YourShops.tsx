import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { useAuth } from "../contexts/AuthProvider";
import { ShopInfo } from "../types";
import ShopsTable from "../components/ShopsTable";
import { Button, Typography } from "@mui/material";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";

export default function CreateShopPage() {
  const { userID } = useAuth();

  let navigate = useNavigate();
  const [shopRows, setShopRows] = useState<ShopInfo[]>([]);

  useEffect(() => {
    // Make API calls and store response
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetShopsOfUser}/${userID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // If the response is not a status in 200-299
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((response) => {
        setShopRows(response);
        console.log(shopRows);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: 5 }}>
        Your Shops
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Aligns the child (Button) to the right
          marginBottom: 2, // Adds some space below the button before the table
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate(ROUTE_PATHS.CreateShop)}
        >
          Create New Shop
        </Button>
      </Container>

      <ShopsTable tableItems={shopRows}></ShopsTable>
    </Container>
  );
}
