import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import GuestRoute from "./utils/GuestRoute";
// import PrivateRoute from "./utils/PrivateRoute";
import SignUpContainer from "./containers/SignUpContainer";
import SignInContainer from "./containers/SignInContainer";
import NavBar from "./components/NavBar/NavBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import "./App.css";

const App = () => {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <NavBar />
      <Router>
        <Switch>
          <GuestRoute path="/signup" exact component={SignUpContainer} />
          <GuestRoute path="/signin" exact component={SignInContainer} />
          <GuestRoute path="/" exact component={SignInContainer} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
