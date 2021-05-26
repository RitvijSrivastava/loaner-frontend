import React from "react";
import { Navbar } from "react-bootstrap";
import styles from "./NavBar.module.css";

const GuestNavBar = (props) => {
  // Display logo
  const Logo = () => {
    return <h3 className={`${styles.logo} pt-2`}>LOANER</h3>;
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">
        <Logo />
      </Navbar.Brand>
    </Navbar>
  );
};

export default GuestNavBar;
