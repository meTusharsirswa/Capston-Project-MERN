import './App.css';
import Login from './Component/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import AddCart from './Component/AddCart';
import ProductById from './Component/ProductById';
import OrderHistory from './Component/OrderHistory';
// import Navbar from './Component/Section/Navbar';
function App() {
  return (
    <>

    <BrowserRouter>
    {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products/:productId" element={<ProductById/>} />
          <Route path="/Cart" element={<AddCart/>} />
          <Route path="/orderHistory" element={<OrderHistory/>} />
        </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
