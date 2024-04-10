import { useState, useEffect } from "react";
import { ShopInfo } from "../types";
import ShopGrid from "../components/ShopGrid";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { Typography } from "@mui/material";

function AllShopsPage() {
  const [allShops, setAllShops] = useState<ShopInfo[]>([]);
  useEffect(() => {
    // Get all shops from database
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToGetAllShops}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        setAllShops(response);
      });
  }, []);

  // Return React component
  return (
    <>
      <Typography variant="h4">Shops</Typography>
      <ShopGrid gridItems={allShops} />
    </>
  );
}

export default AllShopsPage;
