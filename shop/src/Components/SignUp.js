import React, { useState } from "react";
import "./css/Sign.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const postData = () => {
    // Sending data to server
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        number: number,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };

  return (
    <div className="sign">
      <div class="signup">
        <div className="" style={{ width: "550px" }}>
          <h1> Sign Up </h1>

          <legend> Your Basic Info</legend>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Full name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <label htmlFor="number">Mobile number:</label>
          <input
            type="text"
            value={number}
            placeholder="Mobile number"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <div>
            <input
              type="submit"
              id="submit-btn"
              value="Sign Up"
              onClick={() => {
                postData();
              }}
            />
          </div>
          <legend style={{ fontSize: "15px", textAlign: "left" }}>
            Already have an account?{" "}
            <Link to="/signin">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
            </Link>
          </legend>
          <p style={{ fontSize: "12px", margin: "3px 0px", textAlign: "left" }}>
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
        </div>
      </div>
    </div>
  );
}
