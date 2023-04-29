import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "./Home/Loading";


export default function Product() {
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { sale } = useParams();

  useEffect(() => {
    fetch(`/products`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProduct(result));
  }, []);
  return (
    <div style={{ paddingTop: "30px"  }} id={sale}>
      <div className="UserProduct">

        <div class="productBoxContainer">
          {Product.length === 0 ? (
            <div> <Loading /> </div>
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
