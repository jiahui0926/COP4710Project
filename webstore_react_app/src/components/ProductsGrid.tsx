import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../types";

interface ShopGridProps {
  gridItems: Product[];
}

const populateProductsGrid = (gridItems: Product[]) =>
  gridItems.map((product, index) => (
    <Grid item xs={6} md={4} key={index}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Shop: {product.shopname}
          </Typography>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body2">
            Description:
            <br />
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buy (Not Implemented)</Button>
        </CardActions>
      </Card>
    </Grid>
  ));

function ProductsGrid({ gridItems }: ShopGridProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {populateProductsGrid(gridItems)}
      </Grid>
    </Box>
  );
}

export default ProductsGrid;
