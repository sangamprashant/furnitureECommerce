import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./context/LoginContext";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import PageNotFound from "./Components/screen/PageNotFound";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Product from "./Components/screen/Product";
import Setting from "./Components/Setting";
import Upload from "./Components/screen/Upload";
import UserProduct from "./Components/screen/UserProduct";
import ProductOpen from "./Components/screen/ProductOpen";
import MyOrder from "./Components/screen/MadeOrder";
import HistoryOrder from "./Components/screen/HistoryOrder";
import StatusUpdate from "./Components/screen/StatusUpdate";
import NavBar from "./Components/NavBar";

import Svg from "./Svg";
import Usernew from "./Components/screen/AllCatogorisedProduct";
import SaleProduct from "./Components/screen/Home/HomeProduct/SaleProduct";
import EditProduct from "./Components/screen/EditProduct";
import MyCart from "./Components/MyCart";



function App() {
  const [userLogin, setUserLogin] = useState(false);
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ setUserLogin }}>
        <Svg/>
        <NavBar login={userLogin} />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          
          <Route exact path="/product/:Title" element={<Usernew Title="Table"/>}></Route>
          <Route exact path="/product/sale/:sale" element={<SaleProduct />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/mycart" element={<MyCart />}></Route>
          <Route exact path="/products" element={<Product />}></Route>
          <Route exact path="/setting" element={<Setting />} />
          <Route exact path="/setting/upload" element={<Upload />} />
          <Route exact path="/setting/products" element={<UserProduct />} />
          <Route exact path="/setting/products/edit/product/:postId" element={<EditProduct />} />
          <Route exact path="/setting/admin/update" element={<StatusUpdate />} />
          <Route exact path="/setting/makeorder" element={<MyOrder />} />
          <Route exact path="/setting/myorder" element={<HistoryOrder />} />
          <Route exact path="/product/clicked/:postId" element={<ProductOpen login={userLogin}/>} />

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>

        <ToastContainer theme="dark" />
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
