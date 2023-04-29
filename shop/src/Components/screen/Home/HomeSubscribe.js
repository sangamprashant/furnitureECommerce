import React from 'react'

export default function HomeSubscribe() {
  return (
    <div>
        <section
        id="subscribe"
        class="container-grid padding-large position-relative overflow-hidden"
      >
        <div class="container">
          <div class="row">
            <div class="subscribe-content bg-dark d-flex flex-wrap justify-content-center align-items-center padding-medium">
              <div class="col-md-6 col-sm-12">
                <div class="display-header pe-3">
                  <h2 class="display-7 text-uppercase text-light">
                    Subscribe Us Now
                  </h2>
                  <p>
                   Subscribe us now by creating your Account :)
                  </p>
                </div>
              </div>
              <div class="col-md-5 col-sm-12">
                <form class="subscription-form validate">
                  <div class="input-group flex-wrap">
                    <button
                      class="btn btn-medium btn-primary text-uppercase btn-rounded-none"
                      type="submit"
                      name="subscribe"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
