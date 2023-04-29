import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Footer() {
  return (
    <div>
      <footer id="footer" class="overflow-hidden">
        <div class="container">
          <div class="row">
            <div class="footer-top-area">
              <div class="row d-flex flex-wrap justify-content-between">
                <div class="col-lg-3 col-sm-6 pb-3">
                  <div class="footer-menu">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPNHK6xH_dlm1Zq-6HN47wO5GnDqZQK32sw&usqp=CAU"
                      alt="logo"
                    />
                    <p>
                    Ferno-care is an integrated platform for buying and selling furniture, including beds, chairs, and tables. It offers a seamless experience for customers and sellers, making furniture shopping easy and hassle-free.
                    </p>
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 pb-3">
                  <div class="footer-menu text-uppercase">
                    <h5 class="widget-title pb-2">Quick Links</h5>
                    <ul class="menu-list list-unstyled text-uppercase">
                      <li class="menu-item pb-2">
                        <a>
                          <Link to="/product/Table"> TABLES</Link>
                        </a>
                      </li>
                      <li class="menu-item pb-2">
                        <a>
                          <Link to="/product/Chair"> Chairs</Link>
                        </a>
                      </li>
                      <li class="menu-item pb-2">
                        <a>
                          <Link to="/product/Bed"> Bed</Link>
                        </a>
                      </li>
                      <li class="menu-item pb-2">
                        <a>
                          <Link to="/reviews"> Reviews</Link>
                        </a>
                      </li>
                      <li class="menu-item pb-2">
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 pb-3">
                  <div class="footer-menu text-uppercase">
                    <h5 class="widget-title pb-2">Help & Info Help</h5>
                    <ul class="menu-list list-unstyled">
                      <li class="menu-item pb-2">
                        <a href="#">Track Your Order</a>
                      </li>
                      <li class="menu-item pb-2">
                        <a href="#">Returns Policies</a>
                      </li>
                      <li class="menu-item pb-2">
                        <a href="#">Shipping + Delivery</a>
                      </li>
                      <li class="menu-item pb-2">
                        <a href="#">Contact Us</a>
                      </li>
                      <li class="menu-item pb-2">
                        <a href="#">Faqs</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
