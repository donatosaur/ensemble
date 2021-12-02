import React, { useState } from "react";
import { Navbar, Button, Container, Row, Col, Form } from "react-bootstrap";

export default function Footer() {
  const [validated, setValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);

  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    // store in db, to be implemented after the semester
    // sendPostRequest(emailAddress);
  };

  const onChange = (e) => {
    setEmailAddress({ email: e.target.value });
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
    <Navbar className="footer pb-2" bg="light">
      <Container className="py-4">
        <Row className="gy-4 gx-5">
          <Col lg={4} md={6}>
            <img
              src="clef.svg"
              width="30"
              height="30"
              className="d-inline-block mb-2"
              alt="Ensemble app logo"
            />
            <h4 className="d-inline-block ">Ensemble</h4>
            <p className="small text-muted">
              A database driven webapp to assist in managing orchestra personnel
              and performances created by Donato Quartuccia and Fahad Awan.
            </p>
            <p className="small text-muted mb-0">
              &copy; copyright? MIT license? potato?
            </p>
          </Col>
          <Col lg={2} md={6}>
            <h5 className="mb-3">Our Projects</h5>
            <ul className="list-unstyled text-muted py-0">
              <li>
                <a
                  className="text-reset"
                  href="https://github.com/donatosaur/ensemble"
                >
                  Ensemble
                </a>
              </li>
              <li>
                <a
                  className="text-reset"
                  href="https://marble-game.herokuapp.com/"
                >
                  Kuba Libre
                </a>
              </li>
              <li>
                <a
                  className="text-reset"
                  href="http://www.ozarkfloatplanner.com/"
                >
                  Ozark Float Planner
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={4} md={6}>
            <h5 className="mb-3">Inquiries</h5>
            <p className="small text-muted">
              Interested in using this tool for managing your ensemble?
            </p>

            <Form
              className="position-relative"
              validated={validated}
              onSubmit={onSubmit}
            >
              <Form.Group
                className="d-flex flex-row"
                controlId="formBasicEmail"
              >
                <Form.Control
                  onChange={onChange}
                  required
                  type="email"
                  placeholder="Contact Us"
                />

                <Button type="submit">
                  <i className="bi bi-envelope"></i>
                </Button>

                <Form.Control.Feedback type="valid" tooltip>
                  Thanks! We'll be in touch.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Navbar>
    // </div>
    //   <Navbar bg="light" className="footer-test">
    //     <Container className="justify-content-center">
    //       <Row lg={4} xs={2}>
    //         <Col >
    //           <Nav className="flex-column">
    //           <NavLink>
    //               <h3>About</h3>
    //           </NavLink>
    //             <NavLink >Active</NavLink>
    //             <NavLink >Link</NavLink>
    //             <NavLink >Link</NavLink>
    //           </Nav>
    //         </Col>

    //         <Col  >
    //           <Nav className="flex-column">
    //           <NavLink>
    //               <h3>About</h3>
    //           </NavLink>
    //             <NavLink >Active</NavLink>
    //             <NavLink >Link</NavLink>
    //             <NavLink >Link</NavLink>
    //           </Nav>
    //         </Col>

    //         <Col  >
    //           <Nav className="flex-column">
    //           <NavLink>
    //               <h3>About</h3>
    //           </NavLink>
    //             <NavLink >Active</NavLink>
    //             <NavLink >Link</NavLink>
    //             <NavLink >Link</NavLink>
    //           </Nav>
    //         </Col>

    //         <Col >
    //           <Nav className="flex-column">
    //           <NavLink>
    //               <h3>About</h3>
    //           </NavLink>
    //             <NavLink >Active</NavLink>
    //             <NavLink >Link</NavLink>
    //             <NavLink >Link</NavLink>
    //           </Nav>
    //         </Col>

    //       </Row>
    //     </Container>
    //   </Navbar> */
  );
}
