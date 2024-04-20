import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { useAuth } from "../contexts/AuthProvider";
import { IOrderInfoView, ShopInfo } from "../types";
import OrdersTable from "../components/OrdersTable";
import { Button, Typography } from "@mui/material";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";

export default function OrdersPage() {
  const { userID } = useAuth();

  let navigate = useNavigate();
  const [orderRows, setOrderRows] = useState<IOrderInfoView[]>([]);

  useEffect(() => {
    // Make API calls and store response
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetOrdersByAUser}/${userID}`, {
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
        setOrderRows(response);
        console.log(orderRows);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        Your Order History
      </Typography>
      <OrdersTable tableItems={orderRows}></OrdersTable>
    </Container>
  );
}
