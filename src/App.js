import React, { useState, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
import Sdata from "./components/shops/Sdata";
import Product from "./pages/product/Product";
import Categories from "./pages/categories/Categories";
import User from "./pages/user/User";
import Brands from "./pages/brands/Brands";
import ContactUs from "./pages/contactUs/ContactUs";
import AboutUs from "./pages/aboutus/AboutUs";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import Returnsandrefunds from "./pages/returnsRefunds/ReturnsandRefunds";
import Termsandconditions from "./pages/termsandconditions/TermsandConditions";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import Order from "./pages/user/Order";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProductsPage from "./pages/productsPage/ProductsPage";
import LoginPage from "./pages/loginPage/LoginPage";
import CategoryPage from "./pages/categoryPage/CategoryPage";

function App() {
  var user = false;
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" exact element={<Pages />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            {/* redirect /user to /user/profile */}
            <Route path="/user" element={<User />}>
              <Route path="" element={<UserProfile />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="order/:id" element={<Order />} />
            </Route>
            <Route path="/user/profile" element={<UserProfile />} />

            <Route path="/user/orders" element={<UserOrders />} />
            <Route path="/user/order/:id" element={<Order />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/contactus" element={<ContactUs />} />

            <Route path="/aboutus" element={<AboutUs />} />

            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/returnsRefunds" element={<Returnsandrefunds />} />

            <Route
              path="/termsandconditions"
              element={<Termsandconditions />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
