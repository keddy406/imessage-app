import React from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
// components
import Imessage from "./Imessage";
import Login from "./Login";
import { auth } from "./firebase";

import "./App.css";
function App() {
  // get redux data
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // firebase google authorized and get login info
  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // login
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
        // logout
      }
    });
  }, []);

  return (
    // if user => app else login page
    <div className="app">{user ? <Imessage /> : <Login />}</div>
  );
}

export default App;
