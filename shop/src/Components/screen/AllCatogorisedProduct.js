import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../css/UserProdduct.css";
import Loading from "./Home/Loading";

export default function AllCatagoriserProduct() {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { Title } = useParams();

  useEffect(() => {
    fetch(`/product/${Title}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProduct(result));
  }, [Title]);
  return (
    <div style={{ paddingTop: "80px"  }} id={Title}>
      <div className="UserProduct">
      <h1>Product:{Title}</h1>
        <div class="productBoxContainer">
       
          {Product.length === 0 ? (
            <div><h1> <Loading/> </h1></div>
          ) : (
            Product.map((product) => {
              return (
                <div class=" productBox  productBoxProduct" onClick={() => {
                  navigate(`/product/clicked/${product._id}`);
                }}>
                  <img src={product.url} alt="" />
                  <span style={{color:"red"}}> {product.tagline}</span>
                  <h4>{product.title}</h4>
                  <p>{product.description} </p>
                  <div class="priceLine">
                    <h4>Rs.{product.salesprice}</h4>
                    
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
