import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IOrderInfoView, ShopInfo } from "../types";
import { ROUTE_PATHS } from "../constants/routes";
import { Link } from "react-router-dom";

interface OrderTableProps {
  tableItems: IOrderInfoView[];
}

export default function OrdersTable({ tableItems }: OrderTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Shop Name</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Order Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableItems.map((row) => (
            <TableRow
              key={row.orderid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.orderid}
              </TableCell>
              <TableCell component="th" scope="row">
                <Link to={`${ROUTE_PATHS.Shop}/${row.shopid}`}>
                  {row.shopname}
                </Link>
              </TableCell>
              <TableCell>{row.productname}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="right">{row.ordertime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
