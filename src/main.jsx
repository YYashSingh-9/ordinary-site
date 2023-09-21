import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import MainStore from "./Store/MainStore.jsx";
import MainRootElement from "./MainRootElement";
import BasicProductsPage from "./Components/UI/BasicProductsPage";
import AboutOrdinary from "./Components/WholePages/AboutOrdinary";
import BlogPage from "./Components/WholePages/BlogPage";
import Cart from "./Components/WholePages/Cart";
import SearcBarModal from "./Components/UI/SearchBarModal";
import Favourites from "./Components/WholePages/Favourites";
import { useSelector } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRootElement />,
    children: [
      {
        path: "/",
        element: <App />,
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
        children: [{ path: "/search/:id", element: <BasicProductsPage /> }],
      },
      { path: "/favourites", element: <Favourites /> },
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
