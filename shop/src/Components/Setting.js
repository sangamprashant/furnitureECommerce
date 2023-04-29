import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";
import "./css/Setting.css";
import user from "./img/user.png";
export default function Setting() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [clickSell, setClickSell] = useState(loggedUser.sell);
  const navigate = useNavigate();
  const { setUserLogin } = useContext(LoginContext);
  const [logModel, setLogModel] = useState(false);
  const notifyB = (msg) => toast.success(msg);

  const postData = () => {
    setLogModel(true);
  };

  const postDataExit = () => {
    setLogModel(false);
  };

  const readyToSell = () => {
    setClickSell(!clickSell);
  };

  useEffect(() => {
    const sellData = { sell: clickSell };
    fetch(`/sell/${loggedUser._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(
        clickSell ? { id: loggedUser._id, ...sellData } : sellData
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoggedUser(JSON.parse(localStorage.getItem("user")));
      });
  }, [clickSell, loggedUser._id]);
  return (
    <div >
      <div class="wrapper" style={{marginTop:'30px'}}>
        <div class="left">
          {!loggedUser.Photo ? (
            <img src={user} alt="user" style={{ width: "100%" }} />
          ) : (
            <img src={loggedUser.Photo} alt="user" style={{ width: "100%" }} />
          )}
          <h4>{loggedUser.name}</h4>
          <p>Options</p>
          <div>
            <input
              class="buttonshape"
              type="submit"
              value="My Orders"
              onClick={() => {
                navigate("/setting/myorder");
              }}
            />
          </div>
          <div>
            <input
              class="buttonshape"
              type="submit"
              id="submit-btn"
              value="Log Out"
              onClick={() => {
                postData();
              }}
            />
          </div>
          {clickSell && loggedUser.sell ? (
            <div>
              <input
                class="buttonshape"
                type="submit"
                id="submit-btn"
                value="Don't sell"
                onClick={() => {
                  readyToSell();
                }}
              />
            </div>
          ) : (
            <div>
              <input
                class="buttonshape"
                type="submit"
                id="submit-btn"
                value="Sell furniture"
                onClick={() => {
                  readyToSell();
                }}
              />
            </div>
          )}
        </div>
        <div class="right">
          <div class="info">
            <h3>Information</h3>
            <div class="info_data">
              <div class="data">
                <h4>Email</h4>
                <p>{loggedUser.email}</p>
              </div>
              <div class="data">
                <h4>Phone</h4>
                <p>{loggedUser.number}</p>
              </div>
            </div>
          </div>

          <div class="projects">
            <h3>Controls</h3>
            {!clickSell && !logModel && (
              <div style={{ color: "#919aa3" }}>
                <p>
                  {" "}
                  "No options are active.
                  <br /> Options are available on the seller's account and on
                  the logout functionality."
                </p>
              </div>
            )}
            <div class="projects_data">
              <div class="data">
                {clickSell && loggedUser.sell && (
                  <div>
                    <p>Sellers Controls to control over the products</p>
                    <input
                      class="buttonshape"
                      type="submit"
                      id="Project"
                      value="  Add Product"
                      onClick={() => {
                        navigate("/setting/upload");
                      }}
                    />

                    <input
                      class="buttonshape"
                      type="submit"
                      id="Project"
                      value="   My Products"
                      onClick={() => {
                        navigate("/setting/products");
                      }}
                    />
                    <input
                      class="buttonshape"
                      type="submit"
                      id="Project"
                      value=" Update Products"
                      onClick={() => {
                        navigate("/setting/admin/update");
                      }}
                    />
                  </div>
                )}
              </div>
              <div class="data">
                <div style={{ border: "1px solid #black" }}>
                  {logModel && (
                    <>
                      <p>Are you sure you want to Log out.</p>
                      <input
                        class="buttonshape"
                        type="submit"
                        id="Project"
                        value="Yes, LogOut"
                        onClick={() => {
                          localStorage.clear();
                          setUserLogin(false);
                          notifyB("Logged Out Successfully");
                          navigate("/signin");
                        }}
                      />
                      <input
                        class="buttonshape"
                        type="submit"
                        id="ProjectCancel"
                        value="cancel"
                        onClick={() => {
                          postDataExit();
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
