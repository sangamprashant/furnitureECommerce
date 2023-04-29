import React from 'react'
import {Link} from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div>
      <div style={{display:"grid",justifyItems:"center" ,paddingTop:"30px"}}>
            <img src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?size=626&ext=jpg" />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    </div>
  )
}
