// import { NavLink } from "react-router-dom";
// import { CiHome } from "react-icons/ci";
// import { IoIosAdd } from "react-icons/io";
// import { FaChartSimple } from "react-icons/fa6";
// import { IoMdClose } from "react-icons/io";
// import { IoSettingsOutline } from "react-icons/io5";
// import { CiLogout } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);

//     const isLoggedIn = localStorage.getItem('token');
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate("/")
//     }

//     return (
//         <>
//     <nav className="nav">
//         <NavLink to="/" className="nav-item"> <CiHome />Homepage</NavLink>
        
//         {isLoggedIn ? (<>

//         <NavLink to="/app/budget" className="nav-item" > <IoIosAdd /> Add Transaction</NavLink>
//         <NavLink to="/app/transactions" className="nav-item"> <FaChartSimple /> History</NavLink>
//         <NavLink to="/app/settings" className="nav-item"> <IoSettingsOutline /> Settings</NavLink>
//         <button onClick={handleLogout} className="logout-button"> <CiLogout /> Log out</button>
//         </>
//         ) : (<>
//             <NavLink to="/register" className="nav-item"> <CiHome />Register</NavLink>
//             <NavLink to="/login" className="nav-item"> <CiHome />Log in</NavLink>
//         </>)}
//     </nav>

//     {isOpen && (
//         <div className="mobile-menu">
//           <button className="close-btn" onClick={() => setIsOpen(false)}><IoMdClose /></button>
//           <ul className="nav-links">
//             <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}> <CiHome />Homepage</NavLink>
//             <NavLink to="/app/budget" className="nav-item" onClick={() => setIsOpen(false)}> <IoIosAdd /> Add Transaction</NavLink>
//             <NavLink to="/app/transactions" className="nav-item" onClick={() => setIsOpen(false)}> <FaChartSimple /> History</NavLink>
//             <NavLink to="/app/settings" className="nav-item" onClick={() => setIsOpen(false)}> <IoSettingsOutline /> Settings</NavLink>
//             <button onClick={handleLogout} className="logout-button"> <CiLogout /> Log out</button>
//           </ul>
//         </div>
//     )}
//     </>
//     )
// }

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiHome, CiLogout } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 850 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
            <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
            </button>

      {/* Desktop Nav */}
      <nav className="nav">
        <NavLink to="/" className="nav-item"> <CiHome /> Homepage</NavLink>

        {isLoggedIn ? (
          <>
            <NavLink to="/app/budget" className="nav-item"> <IoIosAdd /> Add Transaction</NavLink>
            <NavLink to="/app/transactions" className="nav-item"> <FaChartSimple /> History</NavLink>
            <NavLink to="/app/settings" className="nav-item"> <IoSettingsOutline /> Settings</NavLink>
            <button onClick={handleLogout} className="logout-button"> <CiLogout /> Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/register" className="nav-item">Register</NavLink>
            <NavLink to="/login" className="nav-item">Log in</NavLink>
          </>
        )}
      </nav>

      {/* Mobile Menu (visible on toggle) */}
      {isOpen && (
        <div className="mobile-menu">
          <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}> <CiHome /> Homepage</NavLink>
          <NavLink to="/app/budget" className="nav-item" onClick={() => setIsOpen(false)}> <IoIosAdd /> Add Transaction</NavLink>
          <NavLink to="/app/transactions" className="nav-item" onClick={() => setIsOpen(false)}> <FaChartSimple /> History</NavLink>
          <NavLink to="/app/settings" className="nav-item" onClick={() => setIsOpen(false)}> <IoSettingsOutline /> Settings</NavLink>
          <button onClick={handleLogout} className="logout-button"> <CiLogout /> Log out</button>
        </div>
      )}
    </>
  );
}
