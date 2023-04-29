import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/NewProduct.css";
import { Link, useNavigate } from "react-router-dom";
export default function ProductOpen({login}) {
  const token = localStorage.getItem("jwt");
  const [Product, setProduct] = useState([]);
  const [cartValue, setCartValue] = useState(1);
  const [cartId, setCartId] = useState(null);
  const [items, setItems] = useState([]);
  const { postId } = useParams();
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const navigate = useNavigate();

  // Check if product is already in cart
  const isInCart = items.find((item) => item.product._id === postId);
  console.log(items);

  useEffect(() => {
    fetch(`/product/open/${postId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProduct([result]));

    // Fetch cart details
    fetch("/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartId(data.cart._id); // log cart data to console
        setItems(data.cart.items);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const postData = () => {

if(login||token){
    // Sending data to server
    fetch("/cart/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        productId: postId,
        quantity: cartValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Item added To cart");
          console.log(data);
        }
        console.log(data);
      });
    }
    else{
      notifyA("You Must Login First");
      navigate("/signin")
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      {Product.map((product) => {
        const discount = (
          ((product.mrp - product.salesprice) / product.mrp) *
          100
        ).toFixed(2);
        return (
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-md-5">
                <div
                  className="carousel slide"
                  data-ride="carousel"
                  id="carousel-1"
                >
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                      <img
                        className="img-thumbnail w-100 d-block"
                        src={product.url}
                        alt="Slide Image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <h2>{product.title}</h2>
                <div className="price">
                  <span className="mr-2">
                    <i className="fa fa-rupee text-success"></i>&nbsp;
                    {product.salesprice}{" "}
                  </span>
                  <span className="mr-2 cut">{product.mrp} </span>
                  <span className="text-success">
                    SAVE{discount}% (Rs. {product.mrp - product.salesprice})
                  </span>
                </div>
                <div className="d-flex flex-row">
                  <div className="icons mr-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                    <i className="fa fa-star-o"></i>
                  </div>
                  <span>{product.description}</span>
                </div>
                <div className="d-flex align-items-center mt-4 offers mb-1">
                  <i className="fa fa-check-square-o mt-1"></i>
                  <span className="ml-1 font-weight-bold">Bank Offers</span>
                  <span className="ml-1">
                    20% Instant Discount on SBI Credit Cards
                    <br />
                  </span>
                </div>
                <div className="d-flex align-items-center offers mb-1">
                  <i className="fa fa-check-square-o mt-1"></i>
                  <span className="ml-1 font-weight-bold">Bank Offers</span>
                  <span className="ml-1">
                    5% Unlimited Cashback on Axis Bank Credit Card
                    <br />
                  </span>
                </div>
                <div className="d-flex align-items-center offers mb-1">
                  <i className="fa fa-check-square-o mt-1"></i>
                  <span className="ml-1 font-weight-bold">Bank Offers</span>
                  <span className="ml-1">
                    Extra 5% off* with Axis Bank Buzz Credit Card
                    <br />
                  </span>
                </div>
                <div className="d-flex align-items-center offers">
                  <i className="fa fa-check-square-o mt-1"></i>
                  <span className="ml-1 font-weight-bold">Bank Offers</span>
                  <span className="ml-1">
                    20% Instant Discount on pay with&nbsp;&nbsp;google wallet
                    <br />
                  </span>
                </div>
                {product.stock <= 10 ? (
                  <h6 className="card-title" style={{ color: "red" }}>
                    Hurry! {product.stock} Stock left
                  </h6>
                ) : (
                  ""
                )}
                <div className="d-flex align-items-center mt-5 delivery">
                  <i className="fa fa-map-marker"></i>
                  <span className="ml-2">
                    Delivery by 23 Jul, Tuesday
                    <br />
                  </span>
                  <span className="ml-2 mr-2">
                    |<br />
                  </span>
                  <span className="ml-2 mr-2 text-success">
                    FREE
                    <br />
                  </span>
                </div>
                <hr />
                <div>
                  <span className="font-weight-bold">Seller:</span>
                  <span className="ml-2"> {product.uploadedBy.name}</span>
                </div>
                {product.stock>0?<div className="mt-3">
                  {isInCart ? (
                    <button
                      className="btn btn-dark mr-2"
                      type="button"
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      Go to cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark mr-2"
                      type="button"
                      onClick={() => {
                        setCartValue(1);
                        postData();
                      }}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>:"null"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
