import './App.css';
import Login from './Component/Login';
import { BrowserRouter, Navigate, Route, Routes, useNavigate,  } from 'react-router-dom'
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import Cart from './Component/Cart';
import ProductById from './Component/ProductById';
import OrderHistory from './Component/OrderHistory';
import { useState } from 'react';
// import Navbar from './Component/Section/Navbar';
function App() {
  const [isLoggedIn , setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  return (
    <>

    <BrowserRouter>
    {/* <Navbar/> */}
        <Routes>
        <Route path="/" element={<Login loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard/> : <Navigate to="/"/>}/>
          
          <Route path="/products/:productId" element={isLoggedIn ? <ProductById/> : <Navigate to="/"/>} />
          <Route path="/Cart" element={isLoggedIn ? <Cart/> : <Navigate to="/"/>}/>
          <Route path="/orderHistory" element={isLoggedIn ? <OrderHistory/> : <Navigate to="/"/>} />
        </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
