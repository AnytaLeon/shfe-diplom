import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import HallPage from "./pages/GuestPages/HallPage/HallPage";
import GuestPage from "./pages/GuestPages/GuestPage/GuestPage";
import PaymentPage from "./pages/GuestPages/PaymentPage/PaymentPage";
import Ticket from "./pages/GuestPages/Ticket/Ticket";
import fetchDataLoader from "./loaders/allDataLoader";
import { login } from "./pages/AdminPages/LoginPage/LoginPage";
import LoginPage from "./pages/AdminPages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPages/AdminPage/AdminPage";
import { createHall } from "./components/AddHallModal/AddHallModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestPage />,
    loader: fetchDataLoader,
  },
  { path: "hall/:seanceId", element: <HallPage /> },
  { path: "payment", element: <PaymentPage /> },
  { path: "ticket", element: <Ticket /> },
  { path: "admin/login", element: <LoginPage />, action: login },
  {
    path: "admin",
    element: <AdminPage />,
    loader: fetchDataLoader,
    action: createHall,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
