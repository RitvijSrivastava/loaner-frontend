import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import GuestRoute from "./utils/GuestRoute";
import PrivateRoute from "./utils/PrivateRoute";
import SignUpContainer from "./containers/SignUpContainer";
import SignInContainer from "./containers/SignInContainer";
import DashboardContainer from "./containers/DashboardContainer";
import CreateNewLoanContainer from "./containers/CreateNewLoanContainer";

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
      <Router>
        <Switch>
          <GuestRoute path="/signup" exact component={SignUpContainer} />
          <GuestRoute path="/signin" exact component={SignInContainer} />
          <GuestRoute path="/" exact component={SignInContainer} />

          <PrivateRoute path="/" exact component={DashboardContainer} />
          <PrivateRoute
            path="/dashboard"
            exact
            component={DashboardContainer}
          />
          <PrivateRoute
            path="/createNewLoan"
            exact
            component={CreateNewLoanContainer}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
