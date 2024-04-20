import { useState, useEffect } from "react";
import { IShopSearch, ShopInfo } from "../types";
import ShopGrid from "../components/ShopGrid";
import { API_BASE_URL, API_ROUTE_PATHS } from "../constants/apiConstants";
import { Typography, TextField } from "@mui/material";

function AllShopsPage() {
  const [allShops, setAllShops] = useState<ShopInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const getShopsLike = (searchQuery: string) => {
    const shopSearch: IShopSearch = {
      searchQuery: searchQuery,
    };
    fetch(`${API_BASE_URL}/${API_ROUTE_PATHS.ToSearchForShop}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shopSearch),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving data.");
        }
        return response.json();
      })
      .then((response) => {
        setAllShops(response);
      });
  };

  // Return React component
  return (
    <>
      <Typography variant="h4">All Shops</Typography>
      <TextField
        label="Search Shops"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => {
          const searchStr = e.target.value;
          setSearchQuery(searchStr);
          getShopsLike(searchStr);
        }}
        sx={{ width: "30%", my: 3 }} // Adjust the width as needed
      />
      <ShopGrid gridItems={allShops} />
    </>
  );
}

export default AllShopsPage;
