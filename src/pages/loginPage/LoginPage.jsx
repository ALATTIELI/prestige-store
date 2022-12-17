import React from "react";
import Login from "../../components/Login/Login";
import "./loginPage.css";

export default function LoginPage() {
  // change the title of the page
  document.title = "Login";
  return (
    <div className="LoginPage">
      <Login />
    </div>
  );
}
