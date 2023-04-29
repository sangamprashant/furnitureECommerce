import React from 'react'
import s1 from "../../img/s1.png"
import s3 from "../../img/s3.png"
import s4 from "../../img/s4.png"
import s5 from "../../img/s5.png"

export default function HomeScreenshot() {
  return (
    <div>
      <section
        id="instagram"
        class="padding-large overflow-hidden no-padding-top"
      >
        <div class="container">
          <div class="row">
            <div class="display-header text-uppercase text-dark text-center pb-3">
              <h2 class="display-7">ScreenShots</h2>
            </div>
            <div class="d-flex flex-wrap" style={{justifyContent:'space-evenly'}}>
              <figure class="instagram-item pe-2">
                <a
                 
                  class="image-link position-relative"
                >
                  <img
                    src={s1}
                    alt="instagram"
                    class="insta-image"
                  />
                  <div class="icon-overlay position-absolute d-flex justify-content-center">
                   <h1 style={{color:"black"}}>PayMent</h1>
                  </div>
                </a>
              </figure>
             
              <figure class="instagram-item pe-2">
                <a
                  
                  class="image-link position-relative"
                >
                  <img
                    src={s3}
                    alt="instagram"
                    class="insta-image"
                  />
                   <div class="icon-overlay position-absolute d-flex justify-content-center">
                   <h1 style={{color:"black"}}>Product</h1>
                  </div>
                </a>
              </figure>
              <figure class="instagram-item pe-2">
                <a
                 
                  class="image-link position-relative"
                >
                  <img
                  src={s4}
                    alt="instagram"
                    class="insta-image"
                  />
                   <div class="icon-overlay position-absolute d-flex justify-content-center">
                   <h1 style={{color:"black"}}>DashBoard</h1>
                  </div>
                </a>
              </figure>
              <figure class="instagram-item pe-2">
                <a
                 
                  class="image-link position-relative"
                >
                  <img
                    src={s5}
                    alt="instagram"
                    class="insta-image"
                  />
                   <div class="icon-overlay position-absolute d-flex justify-content-center">
                   <h1 style={{color:"black"}}>UserProfile</h1>
                  </div>
                </a>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
