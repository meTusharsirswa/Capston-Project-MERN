import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';


const OrderHistory = () => {
    const [purchaseProduct, setpurchaseProduct] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:4000/get-order-history").then((res)=>{
            if(res.status === 200){
                setpurchaseProduct(res.data.data)
            }
        })
    },[])

    
      const formatDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

     
  return (
    <div>
      <h4>Order History </h4>
      <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '20%' }} align='center'>Order Id</TableCell>
                            <TableCell style={{ width: '40%' }} align="center">Name</TableCell>
                            <TableCell style={{ width: '40%' }} align="center">Placed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchaseProduct.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                   <Link className='text-decoration-none' to={`/products/${product.product_id._id}`}> {product._id}</Link>
                                </TableCell>
                                <TableCell align="center">{product.product_id.name}</TableCell>
                                <TableCell align="center">{formatDate(product.order_place_time)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </div>
  )
}

export default OrderHistory
