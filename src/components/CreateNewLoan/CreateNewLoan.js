import React from "react";
import { Container, Form, Button, Spinner, Row } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { format, formatDuration, intervalToDuration } from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * This function creats a form, validates and creates a new loan. It uses react-hook-form for validation.
 * Validation Rules:
 * Name: Must be atleast 3 characters long and contain Alphabets only.
 * Email: Proper email format, like, test@example.com
 * Address: Minimum length of 5 characters.
 * Contact Number: 10 digit contact number
 * Loan Amount: Any amount is possible
 * Loan Start Date: Must a valid date.
 * Loan Expiry Date: Must a valid date AFTER Loan Start date.
 * EMI: EMI must be less than the Loan Amount and (expiryDate - startDate)* EMI must be equal to loan amount
 * Type: Only between FIXED and FLOATING.
 *
 * @param {any} props - State from Redux store and Actions from {dashboard.actions}
 * @returns void
 */
const CreateNewLoan = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const watchStartDate = watch("startDate");
  const watchEMI = watch("emi");
  const watchLoan = watch("loanAmount");

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
    data.user = props.data.user._id;
    data.startDate = format(data.startDate, "yyyy-MM-dd");
    data.expiryDate = format(data.expiryDate, "yyyy-MM-dd");
    props.createNewLoan(data);
  };

  const formLabel = (label) => {
    return (
      <Form.Label>
        <h5 style={{ color: "grey", fontWeight: "600" }}>{label}</h5>
      </Form.Label>
    );
  };

  if (props.data.error) {
    showToast("ERROR", props.data.error);
  }

  if (props.data && props.data.status === "SUCCESS") {
    showToast("SUCCESS", "Loan Created successfully!");
    return <Redirect to="/" />;
  } else
    return (
      <>
        <Container
          style={{
            marginLeft: "30%",
            marginTop: "2%",
            marginBottom: "2%",
            width: "40%",
          }}
        >
          <Row className="mb-4">
            <h3 className="mt-auto mb-auto ml-3 mr-3">
              {!props.data.loading ? (
                <a href="/">
                  <i className="fa fa-arrow-left" />
                </a>
              ) : (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </h3>
            <h1 className="mt-auto mb-auto">Create New Loan</h1>
          </Row>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              {formLabel("Loan Applicant Name")}
              <Form.Control
                style={{ height: "60px" }}
                type="text"
                placeholder="John"
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 32,
                  pattern: /^([a-z']+(-| )?)+$/i,
                })}
                disabled={props.data.loading}
              />
              <div>
                {errors.name && errors.name.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
                {errors.name &&
                  (errors.name.type === "minLength" ||
                    errors.name.type === "maxLength") && (
                    <p className="warning" style={{ color: "red" }}>
                      Name must of at least 3 characters and maximum of 32
                      characters.
                    </p>
                  )}
                {errors.name && errors.name.type === "pattern" && (
                  <p className="warning" style={{ color: "red" }}>
                    Name must only contains alphabets.
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="address">
              {formLabel("Address")}
              <Form.Control
                style={{ height: "80px" }}
                as="textarea"
                placeholder="Enter address..."
                {...register("address", {
                  required: true,
                  minLength: 5,
                })}
                disabled={props.data.loading}
              />
              <div>
                {errors.address && errors.address.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
                {errors.address && errors.address.type === "minLength" && (
                  <p className="warning" style={{ color: "red" }}>
                    Address must of at least 5 characters.
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group controlId="email">
              {formLabel("E-mail")}
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

            <Form.Group>
              {formLabel("Contact Number")}
              <Form.Control
                aria-label="contact number"
                style={{ height: "60px" }}
                type="tel"
                placeholder="9876543210"
                {...register("contactNumber", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                disabled={props.data.loading}
              />
              <div>
                {errors.contactNumber &&
                  errors.contactNumber.type === "required" && (
                    <p className="warning" style={{ color: "red" }}>
                      This is required.
                    </p>
                  )}
                {errors.contactNumber &&
                  (errors.contactNumber.type === "minLength" ||
                    errors.contactNumber.type === "maxLength") && (
                    <p className="warning" style={{ color: "red" }}>
                      Contact Number should consist of 10 digits.
                    </p>
                  )}
              </div>
            </Form.Group>

            <Form.Group>
              {formLabel("Loan Amount (in INR)")}
              <Form.Control
                aria-label="loan amount"
                style={{ height: "60px" }}
                type="number"
                step="1"
                placeholder="12345"
                {...register("loanAmount", {
                  required: true,
                  minLength: 1,
                })}
                disabled={props.data.loading}
              />
              <div>
                {errors.loanAmount && errors.loanAmount.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
                {errors.loanAmount && errors.loanAmount.type === "minLength" && (
                  <p className="warning" style={{ color: "red" }}>
                    Invalid Loan amount.
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group>
              {formLabel("Start Date")}
              <Controller
                control={control}
                name="startDate"
                {...register("startDate", { required: true })}
                render={({ field, fieldState, formState }) => (
                  <ReactDatePicker
                    className="input ml-3"
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select start date"
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                  />
                )}
              />
              <div>
                {errors.startDate && errors.startDate.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group>
              {formLabel("Expiry Date")}
              <Controller
                control={control}
                name="expiryDate"
                {...register("expiryDate", { required: true })}
                render={({ field, fieldState, formState }) => (
                  <ReactDatePicker
                    className="input ml-3"
                    dateFormat="yyyy/MM/dd"
                    minDate={watchStartDate}
                    placeholderText="Select expiry date"
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                  />
                )}
              />
              <div>
                {errors.expiryDate && errors.expiryDate.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group>
              {formLabel("EMI (in INR)")}
              <Form.Control
                aria-label="emi"
                style={{ height: "60px" }}
                type="number"
                step="1"
                placeholder="123"
                {...register("emi", {
                  required: true,
                  minLength: 1,
                })}
                disabled={props.data.loading}
              />
              <div>
                {errors.emi && errors.emi.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
                {errors.emi &&
                  (errors.emi.type === "minLength" || watchEMI > watchLoan) && (
                    <p className="warning" style={{ color: "red" }}>
                      Invalid EMI.
                    </p>
                  )}
              </div>
            </Form.Group>

            <Form.Group>
              {formLabel("Type of Loan")}
              <Form.Check
                type="radio"
                aria-label="fixed radio"
                value="FIXED"
                label="FIXED"
                {...register("type", { required: true })}
                disabled={props.data.loading}
              />
              <Form.Check
                type="radio"
                aria-label="radio"
                value="FLOATING"
                label="FLOATING"
                {...register("type", { required: true })}
                disabled={props.data.loading}
              />
              <div>
                {errors.type && errors.type.type === "required" && (
                  <p className="warning" style={{ color: "red" }}>
                    This is required.
                  </p>
                )}
              </div>
            </Form.Group>

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
                Create New Loan
              </Button>
            )}
          </Form>
        </Container>
      </>
    );
};

export default CreateNewLoan;
