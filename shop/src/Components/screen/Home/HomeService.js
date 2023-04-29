import React from 'react'

export default function HomeService() {
  return (
    <div>
      <section id="company-services" class="padding-large">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 pb-3">
              <div class="icon-box d-flex">
                <div class="icon-box-icon pe-3 pb-3">
                  <svg class="cart-outline">
                    <use href="#cart-outline" />
                  </svg>
                </div>
                <div class="icon-box-content">
                  <h3 class="card-title text-uppercase text-dark">
                    Free delivery
                  </h3>
                  <p>"Get free delivery on all orders. Limited time offer."</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 pb-3">
              <div class="icon-box d-flex">
                <div class="icon-box-icon pe-3 pb-3">
                  <svg class="quality">
                    <use href="#quality" />
                  </svg>
                </div>
                <div class="icon-box-content">
                  <h3 class="card-title text-uppercase text-dark">
                    Quality guarantee
                  </h3>
                  <p>"Assured quality - your satisfaction is our guarantee."</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 pb-3">
              <div class="icon-box d-flex">
                <div class="icon-box-icon pe-3 pb-3">
                  <svg class="price-tag">
                    <use href="#price-tag" />
                  </svg>
                </div>
                <div class="icon-box-content">
                  <h3 class="card-title text-uppercase text-dark">
                    Daily offers
                  </h3>
                  <p>"Daily deals, big savings, don't miss out!"</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 pb-3">
              <div class="icon-box d-flex">
                <div class="icon-box-icon pe-3 pb-3">
                  <svg class="shield-plus">
                    <use href="#shield-plus" />
                  </svg>
                </div>
                <div class="icon-box-content">
                  <h3 class="card-title text-uppercase text-dark">
                    100% secure payment
                  </h3>
                  <p>"Safe checkout: 100% secure payment for worry-free shopping."
</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
