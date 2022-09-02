import "./login.css";
const Login = () => {

  return (
    <div className="login">
      <div className="wrapper">
      <h1 className="loginTitle">Login Using:</h1>
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