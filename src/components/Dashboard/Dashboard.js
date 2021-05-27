import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import NavBarContainer from "../../containers/NavBarContainer";
import CardItem from "./components/CardItem";

const Dashboard = (props) => {
  useEffect(() => {
    props.getLoans(props.data.user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBarContainer />
      <Container className="mt-4">
        <Row>
          <h1>Hello, {props.data.user.firstName}</h1>
          <Button
            className="ml-auto mt-auto mb-auto"
            size="sm"
            style={{ borderRadius: "25px" }}
            href="/createNewLoan"
          >
            Add new loan
          </Button>
        </Row>
        <Row>
          {props.data.loans &&
            props.data.loans.length > 0 &&
            props.data.loans.map((loan, index) => {
              return <CardItem loan={loan} index={index} key={loan._id} />;
            })}
          {props.data.loans && props.data.loans.length === 0 && (
            <h4
              className="ml-auto mr-auto"
              style={{
                marginTop: "20%",
                color: "grey",
              }}
            >
              No loans yet. yay!!
            </h4>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
