import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import bannerpic from"../../img/almira.png";
export default function HomeBanner() {
  const navigate = useNavigate();
  return (
    <div >
       <section
      style={{paddingTop:'150px' , paddingBottom:"30px"}}
        className="position-relative overflow-hidden bg-light-blue"
      >
        <div className="swiper main-swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-md-6">
                    <div className="banner-content">
                      <h1 className="display-2 text-uppercase text-dark pb-5">
                        Your Products Are Great.
                      </h1>
                      <a
                       onClick={() => {
                        navigate(`/products`);
                      }}
                        className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                      >
                        Shop Product
                      </a>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="image-holder">
                      <img
src={bannerpic}   
               style={{width:'100%', }}
                        alt="banner"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
