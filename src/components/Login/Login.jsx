import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { facebookLogin, googleLogin } from "../../redux/apiCalls";
import "./login.css";
const Login = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const googleLoginBtn = (e) => {
    e.preventDefault();
    googleLogin(dispatch);
  };

  const facebookLoginBtn = (e) => {
    e.preventDefault();
    facebookLogin(dispatch);
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="loginTitle">{t("login.login_using")}</h1>
        <div className="center">
          <div className="loginButton google" onClick={googleLoginBtn}>
            <img src="./images/google.png" alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebookLoginBtn}>
            <img src="./images/facebook.png" alt="" className="icon" />
            Facebook
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
