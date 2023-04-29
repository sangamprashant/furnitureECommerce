import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const postData = () => {
    // Sending data to server
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/");
        }
        console.log(data);
      });
  };

  return (
    <div class="sign">
      <div class="signup">
        <h1> Sign In </h1>

        <legend> Welcome Back</legend>

        <label for="number">Email:</label>
        <input
          type="email"
          id="number"
          name="user_number"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="user_password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input
          type="submit"
          onClick={() => {
            postData();
          }}
          value="Sign In"
        />
        <legend>
          {" "}
          New user?{" "}
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </legend>
      </div>
    </div>
  );
}
