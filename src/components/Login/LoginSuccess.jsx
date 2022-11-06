import "./loginSuccess.css";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function LoginSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function doStuff() {
      await getCurrentUser(dispatch);
    }

    doStuff();

    setInterval(() => {
      if (
        JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
          .currentUser
      ) {
        window.location.href = "/";
      }
    }, 1000);
  }, [dispatch]);

  return (
    <div className="LoginSuccess">
      <h1>Login Successful</h1>
      <h3>
        Please wait a moment until you are redirected to the Website - or{" "}
        <a href="/">Redirect Now</a>
      </h3>
    </div>
  );
}
