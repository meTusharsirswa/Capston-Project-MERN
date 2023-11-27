import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Section/Navbar";
import { Link } from "react-router-dom";
import { formatIndianCurrency } from '../utils';
import "../css/Dashboard.css";


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="dashboard-container container">
        <div className="row">

        
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            
            <div className="product col-sm-12 col-md-3 col-lg-3 col-12" key={index} >
              <img src={item.image} alt={item.name}  />
              <div className="product__info">
                <p className="info__name">{item.name.substring(0,100)}...</p>
                <p className="info__description">
                  {/* {item.description.substring(0, 100)}... */}
                </p>
                <p className="info__price">
                  {formatIndianCurrency(item.price)}
                </p>
                <Link to={`/products/${item._id}`} className="info__button">
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Data is empty or not an array</p>
        )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
