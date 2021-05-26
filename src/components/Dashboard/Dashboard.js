import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NavBarContainer from "../../containers/NavBarContainer";

const Dashboard = (props) => {
  useEffect(() => {
    console.log(props.data.user._id);
    props.getLoans(props.data.user._id);
  }, []);

  return (
    <>
      <NavBarContainer />
      <Container>
        <ul>
          {props.data.loans &&
            props.data.loans.length > 0 &&
            props.data.loans.map((loan) => {
              return <li>{loan.expiryDate}</li>;
            })}
        </ul>
      </Container>
    </>
  );
};

export default Dashboard;
