import React, { useState } from "react";
import { Badge, Card, Row } from "react-bootstrap";
import { formatDuration, intervalToDuration } from "date-fns";
import CardItemModal from "./CardItemModal";

const CardItem = ({ loan, index }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  // Calculate how many months are left for the loan to expiry.
  const duration = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(loan.expiryDate),
    }),
    { format: ["months"] }
  );

  return (
    <>
      <CardItemModal
        loan={loan}
        index={index}
        showModal={showModal}
        handleClose={handleClose}
      />
      <Card
        bg="light"
        style={{ width: "18rem", height: "18rem", cursor: "pointer" }}
        className={index % 3 === 0 ? "mb-4 mt-4 mr-4" : "m-4"}
        onClick={() => setShowModal(true)}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "25px" }}>
            ₹ {loan.emi}/month
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Total: ₹ {loan.loanAmount}
          </Card.Subtitle>
          <Card.Text className="ml-3 mt-4">
            <Row>Loan Applicant: </Row>
            <Row className="mt-1">{loan.name}</Row>

            <Row className="mt-5">
              <i className="fa fa-clock-o mt-auto mb-auto mr-2" />
              <h5 className="mb-1 mt-auto">
                {duration.length === 0 ? "Loan Overdue" : duration + " left"}
              </h5>
            </Row>
          </Card.Text>
          <Badge
            pill
            variant={loan.type === "FIXED" ? "info" : "primary"}
            className="mt-2"
          >
            {loan.type}
          </Badge>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardItem;
