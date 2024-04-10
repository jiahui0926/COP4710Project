import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATHS } from "../constants/routes";
import { useAuth } from "../contexts/AuthProvider";
import { ShopInfo } from "../types";
import ShopsTable from "../components/ShopsTable";
import { Button } from "@mui/material";

export default function CreateShopPage() {
  const { userID } = useAuth();

  let navigate = useNavigate();
  const [shopRows, setShopRows] = useState<ShopInfo[]>([]);

  useEffect(() => {
    setShopRows([
      {
        shopid: "fc9402d0-1247-49dc-8fe5-9a7a15baad41",
        shopname: "shop1",
        description: "Lorem ipsum dolore est",
        establishdate: new Date(),
        ownername: "David Hasslehof",
        owneremail: "owner@gmail.com",
        productcount: 1000,
      },
      {
        shopid: "fc9402d0-1247-49dc-8fe5-9a7a15baad41",
        shopname: "shop2",
        description: "Lorem ipsum dolore est",
        establishdate: new Date(),
        ownername: "David Hasslehof",
        owneremail: "owner@gmail.com",
        productcount: 1000,
      },
      {
        shopid: "fc9402d0-1247-49dc-8fe5-9a7a15baad41",
        shopname: "shop3",
        description: "Lorem ipsum dolore est",
        establishdate: new Date(),
        ownername: "David Hasslehof",
        owneremail: "owner@gmail.com",
        productcount: 1000,
      },
    ]);
  }, []);

  return (
    <Container>
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
