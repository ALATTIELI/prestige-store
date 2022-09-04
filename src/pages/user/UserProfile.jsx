import React from "react";
import User from "./User";

export default function UserProfile() {
  return (
    <div className="UserProfile">
      <div className="user-container">
        <User />
        <div className="user-right">
          <div className="user-right-top">
            <span className="title">My Profile</span>
          </div>
          <div className="user-right-bottom">
            <div className="user-info">
              <span className="user-info-title">Name</span>
              <input
                className="user-info-value"
                placeholder="Ahmed"
                defaultValue={"Bilal"}
              />
            </div>
            <div className="user-info">
              <span className="user-info-title">Email</span>
              <input
                className="user-info-value"
                placeholder="email@gmail.com"
                defaultValue={"email@gmail.com"}
              />
            </div>
            <div className="user-info">
              <span className="user-info-title">Phone</span>
              <input
                className="user-info-value"
                placeholder="+20123456789"
                defaultValue={"+20123456789"}
              />
            </div>
            <div className="user-info">
              <span className="user-info-title">Address</span>
              <input
                className="user-info-value"
                placeholder="AJM - SNVNDKSKV"
                defaultValue="AJM - AL RAWDA 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
