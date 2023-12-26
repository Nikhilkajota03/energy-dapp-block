import React from 'react'
import { NavLink  } from "react-router-dom";

const Navbar = () => {
  return (
    <>
         <nav id="nav" className="fixed inset-x-0 top-0 flex flex-row justify-between z-10 text-white  bg-transparent">

<div className="p-4">
    <div className="font-bold tracking-widest text-xl"><NavLink  to="/" className="transition duration-500 hover:text-purple-500">P2P Optimal Energy Trading</NavLink></div>
</div>

{/* <!-- Nav Items Working on Tablet & Bigger Sceen --> */}
<div className="p-4 hidden md:flex flex-row justify-between font-bold">
    <NavLink  id="hide-after-click" to="/market" className="mx-4 text-lg  hover:text-purple-500  border-b-2 border-transparent hover:border-b-2 hover:border-purple-300 transition duration-500">Market Place</NavLink>
    <NavLink  id="hide-after-click" to="/auction" className="mx-4 text-lg  hover:text-purple-500  border-b-2 border-transparent hover:border-b-2 hover:border-purple-300 transition duration-500">Auction</NavLink>
    <NavLink  id="hide-after-click" to="/login" className="mx-4 text-lg  hover:text-purple-500  border-b-2 border-transparent hover:border-b-2 hover:border-purple-300 transition duration-500">Login </NavLink>
    <NavLink  to="/signin" className="mx-4 text-lg border-b-2 border-transparent hover:text-purple-500  hover:border-b-2 hover:border-purple-300 transition duration-500">Register</NavLink>
    
</div>

</nav>
    </>
  )
}

export default Navbar