import React, { useContext, useState,useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ login }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(`/search/${query}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    }
  };



  const loginStatus = () => {
    if (login || token) {
      return [
        <li className="nav-item" key="about">
          <Link className="nav-link" to="/product/Table">
            Table
          </Link>
        </li>,
        <li className="nav-item" key="contact">
          <Link className="nav-link" to="/product/Chair">
            Chair
          </Link>
        </li>,
        <li className="nav-item" key="contact">
          <Link className="nav-link" to="/product/Bed">
            Bed
          </Link>
        </li>,
        <li className="nav-item" key="cart">
          <Link className="nav-link" to="/cart">
            Cart
          </Link>{" "}
        </li>,
        <li className="nav-item" key="setting">
          <Link className="nav-link" to="/setting">
            Setting
          </Link>{" "}
        </li>,
      ];
    } else {
      return [
        <li className="nav-item" key="about">
          <Link className="nav-link" to="/product/Table">
            Table
          </Link>
        </li>,
        <li className="nav-item" key="contact">
          <Link className="nav-link" to="/product/Chair">
            Chair
          </Link>
        </li>,
        <li className="nav-item" key="contact">
          <Link className="nav-link" to="/product/Bed">
            Bed
          </Link>
        </li>,
        <li className="nav-item" key="signin">
          <Link className="nav-link" to="/signin">
            SignIn
          </Link>{" "}
        </li>,
        <li className="nav-item" key="signup">
          <Link className="nav-link" to="/signup">
            SignUp
          </Link>{" "}
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  my-navbar ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Furno-care
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
          <button
            className="navbar-toggler white-button "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
           
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >{loginStatus()}</ul>
          </div>
        </div>
      </nav>

      {searchResults.length > 0 && searchQuery !== "" && (
        <div
          className="search-results"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            zIndex: 9999,
            backgroundColor: "#afb3b0",
            borderRadius: "20px",
          }}
        >
          <div>
            {searchResults.length > 0 && (
              <div
                className="search-results"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "450px",
                  maxHeight: "500px",
                  overflowY: "auto",
                  zIndex: 999,
                  backgroundColor: "#bbbcbf",
                  borderRadius: "20px",
                }}
              >
                <ul>
                  {searchResults.map((product) => (
                    <div
                      style={{
                        width: "370px",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px",
                        borderRadius: "20px",
                        alignItems: "center",
                        margin: "10px",
                        backgroundColor: "#7e8781",
                      }}
                      onClick={() => {
                        setSearchResults([]);
                        setSearchQuery("");
                        navigate(`/product/clicked/${product._id}`);
                      }}
                    >
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                        src={product.url}
                        alt="search"
                      />
                      <div>
                        <h4 key={product._id}>{product.title}</h4>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
