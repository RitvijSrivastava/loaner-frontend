import React from "react";
import { Col, Image } from "react-bootstrap";
import cover from "./cover.jpg";

export const CoverImage = () => {
  return (
    <Col lg={6}>
      <Image src={cover} style={{ height: "82vh", width: "50vw" }} />
    </Col>
  );
};
