import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div className="landing-layout">
      <Outlet />
    </div>
  );
}
