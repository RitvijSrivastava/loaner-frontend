import React from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CoverImage } from "../../utils/CoverImage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUp = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  /**
   * Display a 3s Toast on the top right corner of the screen
   * @param {string} status - SUCCESS/ ERROR
   * @param {string} message - Text for the Toast Body
   */
  const showToast = (status, message) => {
    if (status === "SUCCESS") toast.success(message, { toastId: "success" });
    else toast.error(message, { toastId: "error" });
  };

  const onSubmit = (data) => {
    props.signUpUser(data);
  };

  if (props.data.error) {
    showToast("ERROR", props.data.error);
    //TODO: Add function to remove error once shown.
  }

  if (props.data.user) {
    showToast("SUCCESS", "Sign up Successful. Sign in to Loaner.");
  }

  return (
    <Container style={{ width: "100%", marginBottom: "3%" }} fluid>
      <Row>
        <CoverImage />
        <Col style={{ marginLeft: "3%" }}>
          <Col lg={8}>
            <Container>
              <Col style={{ marginBottom: "5%" }}>
                <div style={{ marginTop: "15%" }} />
                <Row>
                  <h1 style={{ fontWeight: "600" }}>Sign up to Loaner.</h1>
                </Row>
                <Row>
                  <h5 style={{ color: "grey" }}>Already a member?</h5>
                  <Link to="/signin">
                    <h5
                      type="button"
                      style={{ color: "#0084ff", marginLeft: "10px" }}
                    >
                      Sign In
                    </h5>
                  </Link>
                </Row>
              </Col>
              {/* <ErrorMessage /> */}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col sm={12} md={6} lg={6}>
                    <Form.Group controlId="name">
                      <Form.Label>
                        <h5 style={{ color: "grey", fontWeight: "600" }}>
                          First Name
                        </h5>
                      </Form.Label>
                      <Form.Control
                        style={{ height: "60px" }}
                        type="text"
                        placeholder="John"
                        {...register("firstName", {
                          required: true,
                          minLength: 3,
                          maxLength: 32,
                          pattern: /^[ A-Za-z]*$/,
                        })}
                        disabled={props.data.loading}
                      />
                      <div>
                        {errors.firstName &&
                          errors.firstName.type === "required" && (
                            <p className="warning" style={{ color: "red" }}>
                              This is required.
                            </p>
                          )}
                        {errors.firstName &&
                          (errors.firstName.type === "minLength" ||
                            errors.firstName.type === "maxLength") && (
                            <p className="warning" style={{ color: "red" }}>
                              Name must of at least 3 characters and maximum of
                              32 characters.
                            </p>
                          )}
                        {((errors.firstName &&
                          errors.firstName.type === "pattern") ||
                          (errors.lastName &&
                            errors.lastName.type === "pattern")) && (
                          <p className="warning" style={{ color: "red" }}>
                            Name must only contains alphabets.
                          </p>
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Label>
                        <h5 style={{ color: "grey", fontWeight: "600" }}>
                          Last Name
                        </h5>
                      </Form.Label>
                      <Form.Control
                        style={{ height: "60px" }}
                        type="text"
                        placeholder="Doe"
                        {...register("lastName")}
                        disabled={props.data.loading}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="email">
                  <Form.Label>
                    <h5 style={{ color: "grey", fontWeight: "600" }}>E-mail</h5>
                  </Form.Label>
                  <Form.Control
                    style={{ height: "60px" }}
                    type="email"
                    placeholder="john@doe.com"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    disabled={props.data.loading}
                  />
                  <div>
                    {errors.email && errors.email.type === "required" && (
                      <p className="warning" style={{ color: "red" }}>
                        This is required.
                      </p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="warning" style={{ color: "red" }}>
                        Not a valid email.
                      </p>
                    )}
                  </div>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="password">
                      <Form.Label>
                        <h5 style={{ color: "grey", fontWeight: "600" }}>
                          Password
                        </h5>
                      </Form.Label>
                      <Form.Control
                        style={{ height: "60px" }}
                        type="password"
                        placeholder="P@ssw)rd123"
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                        disabled={props.data.loading}
                      />
                      <div>
                        {errors.password &&
                          errors.password.type === "required" && (
                            <p className="warning" style={{ color: "red" }}>
                              This is required.
                            </p>
                          )}
                        {errors.password &&
                          errors.password.type === "minLength" && (
                            <p className="warning" style={{ color: "red" }}>
                              Must have atleast 8 characters.
                            </p>
                          )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {props.data.loading ? (
                  <Button size="lg" block>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <Button size="lg" type="submit" block>
                    Sign Up
                  </Button>
                )}
              </Form>
            </Container>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
