import React from "react";
import "./user.css";
import { useTranslation } from "react-i18next";

const User = () => {
  const { t, i18n } = useTranslation();

    return (
      <div className="user_body">
        <div class="col-xl-8 order-xl-1">
      <div class="user_card bg-secondary shadow">
        <div class="card_header bg-white border-0">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">My account</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card_body">
              <form>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-username">Username</label>
                        <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="Username"/>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-email">Email address</label>
                        <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="jesse@example.com"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-first-name">Full name</label>
                        <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="Full name" />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-last-name">Phone Number</label>
                        <input type="text" id="input-last-name" class="form-control form-control-alternative" placeholder="Phone Number" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4"/>


                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-address">Address</label>
                        <input id="input-address" class="form-control form-control-alternative" placeholder=" Ghuwayfah St - Al Nahyan - Abu Dhabi - United Arab Emirates" type="text"/>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-city">City</label>
                        <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City"/>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-country">Country</label>
                        <input type="text" id="input-country" class="form-control form-control-alternative" placeholder="Country" value="United Arab Emirates"/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4"/>
              </form>
          </div>
        </div>

    );
  };

  export default User;