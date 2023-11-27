import React, { useEffect, useState } from 'react';
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of products when the component mounts
    axios
      .get("http://localhost:4000/get-products")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Find the selected product based on the search value
    const selected = data.find((product) => product.name === searchValue);
    if (selected) {
      setSelectedProduct(selected);
      setSearchValue('');
      navigate(`/products/${selected._id}`); // Navigate to the product page
    
    }
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <StoreIcon sx={{ fontSize: 40 }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={data.map((option) => option.name)}
                  value={searchValue}
                  onChange={handleSearchChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Search Product" size="small" />
                  )}
                />
              </Stack>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/dashboard">
                  <HomeIcon sx={{ fontSize: 30 }} />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Cart">
                  <ShoppingCartIcon sx={{ fontSize: 30 }} to='/Cart' />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/orderHistory">
                  <HistoryIcon sx={{ fontSize: 30 }} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
