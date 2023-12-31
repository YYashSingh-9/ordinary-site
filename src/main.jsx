import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as getAllProducts } from "./Store/ActionCreatorThunk";
import { login_Signup_Request } from "./Store/ActionCreatorThunk";
import { Provider } from "react-redux";
import "./index.css";
import MainStore from "./Store/MainStore.jsx";
import MainRootElement from "./MainRootElement";
import BasicProductsPage from "./Components/UI/BasicProductsPage";
import AboutOrdinary from "./Components/WholePages/AboutOrdinary";
import BlogPage from "./Components/WholePages/BlogPage";
import Cart from "./Components/WholePages/Cart";
import SearcBarModal from "./Components/UI/SearchBarModal";
import Favourites from "./Components/WholePages/Favourites";
import ContactUs from "./Components/WholePages/ContactUs";
import ProductInfoPage from "./Components/UI/ProductInfoPage";
import AccountsPage from "./Components/WholePages/AccountsPage";
import Edit_detailsPage from "./Components/ChildComponents/Edit_detailsPage";
import MyOrders from "./Components/WholePages/MyOrders";
import OrderRedirectPage from "./Components/UI/OrderRedirectPage";
import ErrorDisplay from "./Components/Utils/ErrorDisplay";
import SideMenu from "./Components/Utils/SideMenuModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRootElement />,
    children: [
      {
        path: "/",
        element: <App />,
        loader: getAllProducts,
      },
      { path: "/catalogue", element: <App /> },
      {
        path: "/:id",
        element: <BasicProductsPage />,
      },
      {
        path: "/about",
        element: <AboutOrdinary />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/catalogue/:id",
        element: <BasicProductsPage />,
        children: [
          { path: "/catalogue/:id/:ids", element: <BasicProductsPage /> },
        ],
      },
      { path: "/catalogue/:id", element: <BasicProductsPage /> },
      { path: "/catalogue/:id", element: <BasicProductsPage /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/search",
        element: <SearcBarModal />,
        // children: [{ path: "/search/:id", element: <BasicProductsPage /> }],
      },
      { path: "/favourites", element: <Favourites /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/:catagory/:id", element: <ProductInfoPage /> },
      {
        path: "/account-details",
        element: <AccountsPage />,
        action: login_Signup_Request,
        loader: getAllProducts,
      },
      {
        path: "/account-details/edit",
        element: <Edit_detailsPage />,
        action: login_Signup_Request,
      },
      {
        path: "/account-details/my_orders",
        element: <MyOrders />,
      },
      { path: "/my_orders/redirect-to-order", element: <OrderRedirectPage /> },
      { path: "/redirect/error-occured", element: <ErrorDisplay /> },
      { path: "/redirect/sidemenu", element: <SideMenu /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={MainStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
