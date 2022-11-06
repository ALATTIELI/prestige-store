import "./loginFailure.css";
import { useEffect } from "react";
import { userLogout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function LoginFailure() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function doStuff() {
      await userLogout(dispatch);
    }

    doStuff();
  }, [dispatch]);

  return (
    <div className="LoginFailure">
      <h1>Login Failed</h1>
      <h3>
        <span>
          Your account has been suspended. Please contact the administrator for
          more information.
        </span>
        <br />
        <br /> <a href="/">Click here to return to the homepage</a>
      </h3>
    </div>
  );
}
