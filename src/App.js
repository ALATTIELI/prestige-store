import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Cart from "./common/Cart/Cart";
import Footer from "./common/footer/Footer";
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
import BrandPage from "./pages/brandPage/BrandPage";
import LoginSuccess from "./components/Login/LoginSuccess";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/userRedux";
import LoginFailure from "./components/Login/LoginFailure";
import Checkout from "./components/checkout/Checkout";
import CashCheckout from "./components/CashCheckout/CashCheckout";
import PaymentResult from "./components/checkout/PaymentResult";

function App() {
  const dispatch = useDispatch();
  // check if localstorage expirate date is greater than current date
  // if not, remove user from localstorage
  if (localStorage.getItem("expirationTime")) {
    // const user = JSON.parse(localStorage.getItem("user"));
    const expirateDate = localStorage.getItem("expirationTime");
    const currentDate = new Date().getTime();
    // convert current milliseconds date to normal date
    // for testing purposes
    // const currentDatee = new Date().toUTCString();
    // const expirateDatee = new Date(expirateDate*1).toUTCString();
    // console.log("currentDatee: " + currentDatee);
    // console.log("expirateDatee: " + expirateDatee);
    // console.log(currentDate);
    // console.log(expirateDate);
    if (expirateDate < currentDate) {
      console.log("user expired");
      // create dispatch to logout user
      dispatch(logout());
    } else {
      console.log("user is logged in");
    }
  }

  const user = useSelector((state) => state.user.currentUser);
  // if (user !== null) {
  //   admin = user.isAdmin;
  // }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" exact element={<Pages />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/checkout" exact element={<Checkout />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/cod-checkout" element={<CashCheckout />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            {/* redirect /user to /user/profile */}
            <Route path="/user">
              <Route path="" element={<UserProfile />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="order/:id" element={<Order />} />
            </Route>

            <Route path="/user/orders" element={<UserOrders />} />
            <Route path="/user/order/:id" element={<Order />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brand/:id" element={<BrandPage />} />
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
            <Route path="/loginSuccess" element={<LoginSuccess />} />
            <Route path="/loginFailure" element={<LoginFailure />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
