import React from "react";
import "./user.css";

const User = () => {
    return (
      <div class="user_container">
        <div class="leftbox_user">
          <nav>
              <a onclick="tabs(0)" class="tab active">
                  <i class="fa fa-user"></i>
              </a>

              <a onclick="tabs(1)" class="tab active">
                  <i class="fa fa-credit-card"></i>
              </a>
          </nav>
        </div>
        <div class="rightbox_user">
          <div class="profile tabShow">
            <h1>Presonal Info</h1>
            
            <h2>Full Name</h2>
            <input type="text" class="input" value="Ahmed Mohamed"></input>
            
            <h2>Birthday</h2>
            <input type="text" class="input" value="01/08/2022"></input>
            
            <h2>Gender</h2>
            <input type="radio" class="input"></input>
            <input type="radio" class="input"></input>

            <h2>Email</h2>
            <input type="text" class="input" value="ahmedmohamed@gmail.com"></input>

            <h2>Password</h2>
            <input type="password" class="input" value="prestigestore"></input>
            <button class="update_btn">Update</button>
          </div>
          <div class="payment tabShow">
            <h1>Payment Info</h1>
            
            <h2>Payment Method</h2>
            <input type="text" class="input" value="MasterCard - 0212 **** **** 7665"></input>
            
            <h2>Billing Address</h2>
            <input type="text" class="input" value="1234 some street in a town"></input>
            
            <h2>ZipCode</h2>
            <input type="text" class="input" value="419911"></input>

            <h2>Billing Date</h2>
            <input type="text" class="input" value="jan 19,2022"></input>
          </div>
        </div>
      </div>
    );
  };
  export default User;