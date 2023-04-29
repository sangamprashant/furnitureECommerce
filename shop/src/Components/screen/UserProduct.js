import React, { useEffect, useState } from "react";
import "../css/UserProdduct.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UserProduct() {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/myproduct", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProduct(result));
  }, []);

  return (
    <div style={{marginTop:"100px"}}>
     
    <div className="UserProduct">
    <h1>My Products</h1>
      <div class="productBoxContainer">
        {Product.length==0?<h3>No product uploaded </h3>:<>
        {Product.map((product) => (
          <div class="productBox" key={product._id} onClick={() => {
            navigate(`/setting/products/edit/product/${product._id}`);
          }}>
            <img src={product.url} alt="" />
            <span>{product.type}</span>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <h6>Sales price: {product.salesprice} </h6>
            <h6>Mrp: {product.mrp}</h6>
            <h6 style={{ color: "blue" }}>Tagline: {product.tagline}</h6>
            {product.stock <= 10 ? (
              <p style={{ color: "red" }}>
                Alert: Hurry! {product.stock}Stock left
              </p>
            ) : (
              ""
            )}
            <p>sold by : {product.uploadedBy.name} </p>
          </div>
        ))}</>}
      </div>
    </div>
    </div>
  );
}
