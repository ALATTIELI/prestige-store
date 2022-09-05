import { t } from "i18next";
import { useTranslation } from "react-i18next";
import "./login.css";
const Login = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="login">
      <div className="wrapper">
        <h1 className="loginTitle">{t("login.login_using")}</h1>
        <div className="center">
          <div className="loginButton google">
            <img src="./images/google.png" alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook">
            <img src="./images/facebook.png" alt="" className="icon" />
            Facebook
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
