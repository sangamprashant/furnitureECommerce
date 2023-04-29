import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import salepic from"../../img/sofa.png";
export default function HomeSale() {
  const salePercentage = Math.floor(Math.random() * 50) + 1; // generates a random number between 1 and 50
 
  const navigate = useNavigate();
  return (
    <div>
      <section
        id="yearly-sale"
        class="bg-light-blue overflow-hidden mt-5 padding-xlarge"
        style={{
          backgroundImage:
            `url(${salepic})`,
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div class="row d-flex flex-wrap align-items-center">
          <div class="col-md-6 col-sm-12">
            <div class="text-content offset-4 padding-medium">
              <h2 class="display-2 pb-5 text-uppercase text-dark">
                sale
              </h2>
              <h3>{salePercentage}% off</h3>
              <a
               
                class="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                onClick={()=>{
                  navigate(`/product/sale/${salePercentage}`)
                }}
              >
                Shop Sale
              </a>
            </div>
          </div>
          <div class="col-md-6 col-sm-12"></div>
        </div>
      </section>
    </div>
  );
}
