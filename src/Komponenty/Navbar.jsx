import { NavLink } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const isLoggedIn = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/")
    }

    return (
    <nav className="nav">
        <NavLink to="/" className="nav-item"> <CiHome />Strona główna</NavLink>
        
        {isLoggedIn ? (<>

        <NavLink to="/app/budget" className="nav-item" > <IoIosAdd /> Dodaj transakcje</NavLink>
        <NavLink to="/app/transactions" className="nav-item"> <FaChartSimple /> Raporty</NavLink>
        <NavLink to="/app/settings" className="nav-item"> <IoSettingsOutline /> Settings</NavLink>
        <button onClick={handleLogout} className="logout-button"> <CiLogout /> Wyloguj</button>
        </>
        ) : (<>
            <NavLink to="/register" className="nav-item"> <CiHome />Zarejestruj się</NavLink>
            <NavLink to="/login" className="nav-item"> <CiHome />Zaloguj się</NavLink>
        </>)}
    </nav>
    )
}