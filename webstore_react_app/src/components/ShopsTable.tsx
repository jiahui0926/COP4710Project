import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShopInfo } from "../types";
import { ROUTE_PATHS } from "../constants/routes";
import { Link } from "react-router-dom";

interface ShopsTableProps {
  tableItems: ShopInfo[];
}

export default function ShopsTable({ tableItems }: ShopsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Shop Name</TableCell>
            <TableCell align="right">Date Created</TableCell>
            <TableCell align="right">Product Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableItems.map((row) => (
            <TableRow
              key={row.shopid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`${ROUTE_PATHS.Shop}/${row.shopid}`}>
                  {row.shopname}
                </Link>
              </TableCell>
              <TableCell align="right">{row.establishdate}</TableCell>
              <TableCell align="right">{row.productcount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
