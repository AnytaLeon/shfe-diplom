import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import HallPage from "./pages/GuestPages/HallPage/HallPage";
import GuestPage from "./pages/GuestPages/GuestPage/GuestPage";
import PaymentPage from "./pages/GuestPages/PaymentPage/PaymentPage";
import Ticket from "./pages/GuestPages/Ticket/Ticket";
import fetchDataLoader from "./loaders/allDataLoader";
import { login } from "./pages/AdminPages/LoginPage/LoginPage";
import LoginPage from "./pages/AdminPages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPages/AdminPage/AdminPage";

const router = createBrowserRouter(
  [
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
    },
  ],
  { basename: "/shfe-diplom" }
);

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
