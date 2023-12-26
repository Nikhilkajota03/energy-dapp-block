import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import Trading from "./components/Trading";
import Solution from "./components/Solution";
import Login from "./page/Login";
import Signin from "./page/Signin";
import Marketplace from "./page/Marketplace";
import Auction from "./page/Auction";
import Contact from "./page/Contact";
import Form from "../src/components/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReduxUser from "./redux/reduxUser";
import Auctbids from "./page/Auctbids";
import AuctTra from "./page/AuctTra";
import MarkTra from "./page/MarkTra";
import AuctionNavbar from "./components/AuctionNavbar";
import { useSelector } from "react-redux";
import Footer  from "../src/components/Footer";
import Teams from "../src/components/Teams"
import UpdateForm from "./components/UpdateForm"
import Updateprofile from "./page/Updateprofile"


const App = () => {
  const { user } = useSelector((state) => state.users); // Extracting user from the Redux state
  return (
    <>
    

      <Router>
        {user === null ? <Navbar/> :<AuctionNavbar/> }
        
        <Routes>
          <Route
            path="/"
            element={
              <ReduxUser>
                <Herosection />
                {/* <Solution />
                <Teams/> */}
              </ReduxUser>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/auctionbids/:id/:walletAddress/:index/:owner/:pincode" element={ <ReduxUser> <Auctbids/> </ReduxUser>} />
          <Route path="/auction" element={ <ReduxUser> <Auction /> </ReduxUser>} />
          <Route path="/market" element={<ReduxUser> <Marketplace /> </ReduxUser>} />
          <Route path="/updatPro" element={<ReduxUser> <Updateprofile/> </ReduxUser>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/updform" element={<UpdateForm />} />
          <Route path="/auctTra" element={<AuctTra/>} />
          <Route path="/markTra" element={<MarkTra/>} />
          

          {/* <Solution/> */}
          {/* <Login/>
      <Signin/>
      <Marketplace/>
      <Auction/>
      <Contact/> */}
          {/* <Route path="/redux" element={<ReduxUser/>} /> */}
        </Routes>
        <Footer/>
        
      </Router>

     
    </>
  );
};

export default App;
