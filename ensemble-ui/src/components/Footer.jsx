import React, { useState } from "react";
import { Navbar, Button, Row, Col, Form, InputGroup, Container } from "react-bootstrap";

export default function Footer() {
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  const onSubmit = (event) => {
    // use the native HTML validator for this field
    if (event.currentTarget?.checkValidity() === false) {
      // prevent the form from being submitted
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // store in db, to be implemented after the quarter
    // sendPostRequest({ email: emailAddress});
    event.preventDefault(); // disable functionality for now
  };

  // const sendPostRequest = async (emailObject) => {
  //   const today = { date: new Date() };
  //   const request = await fetch("/api/email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(emailObject),
  //   });
  // };

  return (
    <Navbar
      className="flex-column flex-shrink-0 px-3 pb-2"
      bg="light"
    >
      <Row className="align-items-start">

        {/* About */}
        <Col  xs={12} sm={4}>
          <h3 id="ensemble" className="d-inline-block me-2">
            𝄞
          </h3>
          <h5 className="d-inline-block">
            Ensemble
          </h5>
          <p className="mx-5 mx-sm-0 small text-muted">
            A database driven webapp to assist in managing orchestra personnel
            and performances.
          </p>
          <p className="mx-3 mx-sm-0 small text-muted text-center">
            Copyright &copy; 2021 Donato Quartuccia & Fahad Awan
          </p>
        </Col>

        {/* Other Project Links */}
        <Col className="pt-2" xs={12} sm={4}>
          <h5>Our Projects</h5>
          <ul className="navbar-nav flex-column py-0">
            <li>
              <a className="nav-link p-0 pb-1" href="https://github.com/donatosaur/ensemble">
                Ensemble
              </a>
            </li>
            <a className="nav-link p-0 pb-1" href="https://github.com/donatosaur/kuba-libre">
              Kuba Libre
            </a>
            <li>
              <a className="nav-link p-0 pb-1" href="http://www.ozarkfloatplanner.com/">
                Ozark Float Planner
              </a>
            </li>
          </ul>
        </Col>

        {/* Inquiries Form */}
        <Col className="pt-2" xs={12} sm={4}>
          <h5>Inquiries</h5>
          <p className="small text-muted">
            Interested in using this tool for managing your ensemble?
          </p>
          <Form validated={validated} onSubmit={onSubmit}>
            <InputGroup className="mb-3" hasValidation>
              <Form.Control
                required
                id="email"
                name="email"
                type="email"
                placeholder="Contact Us"
                onChange={(event) => setEmailAddress(event.target.value)}
                value={emailAddress}
              />
              <Button type="submit">
                <i className="bi bi-envelope" />
              </Button>
              <Form.Control.Feedback type="valid" tooltip>
                Thanks! We'll be in touch.
              </Form.Control.Feedback>
            </InputGroup>
          </Form>
        </Col>

      </Row>

    </Navbar>
  );
}
