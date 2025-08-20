import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import HallPage from "./pages/HallPage/HallPage";
import GuestPage from "./pages/GuestPage/GuestPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Ticket from "./pages/Ticket/Ticket";
import Layout from "./components/Layout";
import fetchDataLoader from "./loaders/allDataLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <GuestPage />,
        loader: fetchDataLoader,
      },
      { path: "hall", element: <HallPage /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "ticket", element: <Ticket /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
