import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading";

export default function Table({ Title }) {
  const [isPaused, setIsPaused] = useState(false);
  const [Product, setProduct] = useState([]);
  const navigate = useNavigate();

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    if (isPaused) {
      setIsPaused(false);
    }
  };

  useEffect(() => {
    fetch(`/product/${Title}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setProduct(result));
  }, []);
  return (
    <div>
      <section
        id="mobile-products"
        className="product-store position-relative padding-large no-padding-top"
      >
        <div className="container">
          <div className="row">
            <div className="display-header d-flex justify-content-between pb-3">
              <h2 className="display-7 text-dark text-uppercase">{Title}</h2>
            </div>
            {Product.length === 0 ? (
              <div> <Loading/> </div>
            ) : (
              <div className="swiper product-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="product-card position-relative">
                      <div id="chair" className="slideshow chair-slideshow">
                        <div
                          className="mover"
                          onMouseDown={handleMouseDown}
                          onMouseUp={handleMouseUp}
                          style={{
                            animationPlayState: isPaused ? "paused" : "running",
                          }}
                        >
                          {Product.map((product) => {
                            const discount = (
                              ((product.mrp - product.salesprice) /
                                product.mrp) *
                              100
                            ).toFixed(2);

                            return (
                              <div className="home-card-items">
                                <img
                                  src={product.url}
                                  alt=""
                                  style={{
                                    width: "160px",
                                    boxSizing: "fit",
                                    height: "200px",
                                  }}
                                  onClick={() => {
                                    navigate(`/product/clicked/${product._id}`);
                                  }}
                                />
                                <div className="lines">
                                  <p className="text-center my-1">
                                    {product.title}
                                  </p>
                                  {product.mrp - product.salesprice > 0 ? (
                                    <p className="text-center my-1">
                                      Save {discount}% (Rs.{" "}
                                      {product.mrp - product.salesprice})
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  <p className="text-center my-1">
                                    {product.tagline}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
