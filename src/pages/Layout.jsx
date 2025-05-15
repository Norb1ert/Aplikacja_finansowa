import { Outlet } from "react-router-dom";
import Navbar from "../Komponenty/Navbar";

export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <Outlet /> 
    </div>
  );
}