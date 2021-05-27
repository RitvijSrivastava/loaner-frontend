import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { format } from "date-fns";


const CardItemModal = ({ loan, index, showModal, handleClose }) => {
  const onHide = () => handleClose();

  const heading = (label) => {
    return <h6 style={{ color: "grey", fontWeight: "600" }}>{label}</h6>;
  };

  return (
    <Modal
      show={showModal}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Loan #{index + 1}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {heading("Loan Amount")}
            <h1>₹ {loan.loanAmount}</h1>
          </Col>
          <Col>
            {heading("EMI")}
            <Row className="pl-0 ml-0">
              <h1>₹ {loan.emi}</h1>
              <h5 className="mt-3" style={{ color: "grey" }}>
                /month
              </h5>
            </Row>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            {heading("Start Date")}
            <h5>{format(new Date(loan.startDate), "yyyy-MM-dd")}</h5>
          </Col>
          <Col>
            {heading("Expiry Date")}
            <h5>{format(new Date(loan.expiryDate), "yyyy-MM-dd")}</h5>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            {heading("Type")} <h5>{loan.type}</h5>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            {heading("Loan Applicant")}
            <h5>{loan.name}</h5>
          </Col>
          <Col>
            {heading("Contact Number")}
            <h5>{loan.contactNumber}</h5>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            {heading("Address")}
            <h5>{loan.address}</h5>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            {heading("E-mail")}
            <h5>{loan.email}</h5>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CardItemModal;
