import React from "react";
import { Col, Container, Form, Row, Spinner, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { CoverImage } from "../../utils/CoverImage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import GuestNavBar from "../NavBar/GuestNavBar";

const SignIn = (props) => {
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
    props.signInUser(data);
  };

  if (props.data.error) {
    showToast("ERROR", props.data.error);
    props.removeErrorMessage();
  }

  if (props.data.user) {
    return <Redirect to="/dashboard" />;
  }

  if (props.data && props.data.user) {
    return <Redirect to="/" />;
  } else
    return (
      <>
        <GuestNavBar />
        <Container style={{ width: "100%", marginBottom: "3%" }} fluid>
          <Row>
            <CoverImage />
            <Col style={{ marginLeft: "3%" }}>
              <Col lg={8}>
                <Container>
                  <Col style={{ marginBottom: "5%" }}>
                    <div style={{ marginTop: "30%" }} />
                    <Row>
                      <h1 style={{ fontWeight: "600" }}>Sign in to Loaner.</h1>
                    </Row>
                    <Row>
                      <h5 style={{ color: "grey" }}>New User?</h5>
                      <Link to="/signup">
                        <h5
                          type="button"
                          style={{ color: "#0084ff", marginLeft: "10px" }}
                        >
                          Sign up
                        </h5>
                      </Link>
                    </Row>
                  </Col>
                  {/* <ErrorMessage /> */}
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                      <Form.Label>
                        <h5 style={{ color: "grey", fontWeight: "600" }}>
                          E-mail
                        </h5>
                      </Form.Label>
                      <Form.Control
                        style={{ height: "60px" }}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="test@hotmail.com"
                        disabled={props.data.loading}
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
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
                    <Form.Group>
                      <Form.Label>
                        <h5 style={{ color: "grey", fontWeight: "600" }}>
                          Password
                        </h5>
                      </Form.Label>
                      <Form.Control
                        style={{ height: "60px" }}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="P@ssw)rd123"
                        disabled={props.data.loading}
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
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
                      {props.data.loading ? (
                        <Button size="lg" block className="mt-3">
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        </Button>
                      ) : (
                        <Button size="lg" type="submit" className="mt-3" block>
                          Sign In
                        </Button>
                      )}
                    </Form.Group>
                  </Form>
                </Container>
              </Col>
            </Col>
          </Row>
        </Container>
      </>
    );
};

export default SignIn;
