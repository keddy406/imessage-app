import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
function Login() {
  // sign in with GOogle from firebase
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQd5OC5qgpb5zkf84Hl2iekR02KpNkq5NIlRQ&usqp=CAU"
          alt=""
        />

        <h1>iMessage</h1>
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
