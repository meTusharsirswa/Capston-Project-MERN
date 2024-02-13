import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Navbar from "./Section/Navbar";
import CircularProgress from "@mui/material/CircularProgress";

const OrderHistory = () => {
  const [purchaseProduct, setpurchaseProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/get-order-history").then((res) => {
      if (res.status === 200) {
        setpurchaseProduct(res.data.data);
      }
      setLoading(false);

    });
  }, []);
  if (loading) {
    return (
      <div className="loding">
        {" "}
        <CircularProgress />
      </div>
    );
  }
  const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />

      <div className="container my-3">
        {purchaseProduct.length === 0 ? (
          <Link to="/dashboard" className="text-decoration-none">
          <div
            className="d-flex justify-content-center flex-column align-items-center"
            style={{ marginTop: "10rem",  }}
            >
            <img src="../../public/order-now.png" alt="" />
           <h3 className=" fw-semibold" style={{color:"black"}}> No Order History</h3>
          </div>
            </Link>
        ) : (
          <div>
            <h4 className="d-flex justify-content-center my-4">
              Order History{" "}
            </h4>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "20%" }} align="center">
                      Product
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align="center">
                      Order Id
                    </TableCell>
                    <TableCell style={{ width: "30%" }} align="center">
                      Name
                    </TableCell>
                    <TableCell style={{ width: "30%" }} align="center">
                      Placed
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {purchaseProduct.map((product) => (
                    <TableRow
                      key={product._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        <Link
                          className="text-decoration-none"
                          to={`/products/${product.product_id._id}`}
                        >
                          <img
                            src={product.product_id.image}
                            alt=""
                            style={{ height: "80px" }}
                          />
                        </Link>
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Link
                          className="text-decoration-none"
                          to={`/products/${product.product_id._id}`}
                        >
                          {" "}
                          {product._id}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        {product.product_id.name}
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(product.order_place_time)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
