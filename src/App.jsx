import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingLayout from './pages/LandingLayout';
import Layout from './pages/Layout';

import Home from "./Komponenty/Home"
import Register from "./pages/Register";
import Login from "./Komponenty/Login";
import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import Settings from "./Komponenty/Settings";
import Charts from "./Komponenty/Charts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { path: "budget", element: <BudgetPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "transactions/charts", element: <Charts /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

function App() {

  return <>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
        </> 
  
}

export default App;
