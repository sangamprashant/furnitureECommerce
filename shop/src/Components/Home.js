import React, { useState, useEffect } from "react";
import "./css/home.css";
import HomeBanner from "./screen/Home/HomeBanner";
import HomeService from "./screen/Home/HomeService";
import HomeSale from "./screen/Home/HomeSale";
import HomeSubscribe from "./screen/Home/HomeSubscribe";
import HomeScreenshot from "./screen/Home/HomeScreenshot";
import Footer from "./Footer";
import Bed from "./screen/Home/HomeProduct/Bed";
import Chair from "./screen/Home/HomeProduct/Chair";
import Table from "./screen/Home/HomeProduct/Table";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Wait for 3 seconds before setting isLoading to false

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    
        <>
          <HomeBanner />
          <HomeService />
          <Table Title="Table" />
          <Chair Title="Chair" />
          <Bed Title="Bed" />
          <HomeSale />
          <HomeSubscribe />
          <HomeScreenshot />
          <Footer />
        </>
   
    </div>
  );
}
