import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Redirect } from "react-router";
import styles from "./NavBar.module.css";

const NavBar = (props) => {
  // Display logo
  const Logo = () => {
    return <h3 className={`${styles.logo} pt-2`}>LOANER</h3>;
  };

  /**
   * Sign Out user and clear the localstorage.
   * This will remove any data of the previous user.
   * @returns void
   */
  const signOut = () => {
    props.signOutUser();
    if (typeof window !== undefined) {
      localStorage.clear();
    }
    window.location.reload();
    return <Redirect to="/" />;
  };

  return (
    <Navbar>
      <Navbar.Brand href="/">
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      <Nav>
        <Button variant="danger" onClick={signOut}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
