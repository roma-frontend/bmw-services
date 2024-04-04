
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import BlogPost from "./components/blogs/blog/BlogPost";
import BlogPage from "./components/blogs/BlogPage";
import Contacts from "./components/contacts/Contacts";
import Home from "./components/home/Home";
import Preview from "./components/home/preview/Preview";
import CreateProduct from "./components/products/createProduct/CreateProduct";
import FavoriteProducts from "./components/products/favorites/FavoriteProducts";
import Products from "./components/products/Products";
import ClientsPage from "./components/profile/clients/Clients";
import ExpensesPage from "./components/profile/expenses/Expenses";
import Main from './components/profile/main/Main';
import MainLayout from "./layout/MainLayout";
import RequireGuest from "./middlewares/requireGuest";
import GetUser from "./middlewares/user";
import RequireAuth from "./middlewares/withAuth";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ScrollToTop from "./utils/ScrollToTop";


const LazyProduct = lazy(() => import("./components/products/product/Product"));

export default createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GetUser>
          <ScrollToTop />
          <MainLayout />
        </GetUser>
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home />, exact: true },

      {
        path: "/main",
        element: (
          <Main />
        ),
        exact: true,
      },

      {
        path: "/clients",

        element: (
          <ClientsPage />
        ),
        exact: true,
      },

      {
        path: "/expenses",
        element: (
          <ExpensesPage />
        ),
        exact: true,
      },

      {
        path: "/preview",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Preview />
          </Suspense>
        ),
        exact: true,
      },

      {
        path: "/favorite-products",

        element: (
          <FavoriteProducts />
        ),
        exact: true,
      },

      {
        path: "/products",

        element: (
          <Products />
        ),
        exact: true,
      },

      {
        path: "/create-product",

        element: (
          <CreateProduct />
        ),
        exact: true,
      },
      {
        path: "/blogs",

        element: (
          <BlogPage />
        ),
        exact: true,
      },
      {
        path: `/blog-post/:blogId`,

        element: (
          <BlogPost />
        ),
        exact: true,
      },

      {
        path: "/products/:productId",

        element: (
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyProduct />
            </Suspense>
          </RequireAuth>
        ),
        exact: true,
      },

      {
        path: "/login",

        element: (
          <RequireGuest>
            <Login />
          </RequireGuest>
        ),
        exact: true,
      },

      {
        path: "/register",

        element: (
          <RequireGuest>
            <Register />
          </RequireGuest>
        ),
        exact: true,
      },

      {
        path: "/contacts",

        element: <Contacts />,
        exact: true,
      },
    ],
  },
]);