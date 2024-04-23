import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ShopInfo } from "../types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../constants/routes";

interface ShopGridProps {
  gridItems: ShopInfo[];
}

const populateShopGrid = (gridItems: ShopInfo[], navigate: NavigateFunction) =>
  gridItems.map((shop, index) => (
    <Grid item xs={6} md={4} key={index}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Shop: {shop.shopname}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Created by {shop.ownername} <br />
            Since {shop.establishdate.toString()}
          </Typography>
          <Typography variant="body2">
            No. of Products: {shop.productcount}
            <br />
            <br />
            Store Description:
            <br />
            {shop.description}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate(`${ROUTE_PATHS.Shop}/${shop.shopid}`);
            }}
          >
            Visit Store
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));

export default function ShopGrid({ gridItems }: ShopGridProps) {
  let navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {populateShopGrid(gridItems, navigate)}
      </Grid>
    </Box>
  );
}
