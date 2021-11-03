import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";


export default function MusiciansForm() {
  return (
    <Form>
      <Row className="entityForm">
        <Form.Label>Add a Musician</Form.Label>
      </Row>

      <Row className="entityForm">
        {/* <Form.Group as={Col} controlId="musicianID">
          <FloatingLabel controlId="musicianID" label="Musician ID">
            <Form.Control type="text" placeholder="Enter Musician ID" />
          </FloatingLabel>
        </Form.Group> */}

        <Form.Group as={Col} controlId="initialInstrumentID">
          <FloatingLabel controlId="initialInstrumentID" label="Initial InstrumentID">
            <Form.Control required type="text" placeholder="Enter an initial instrumentID" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="birthdate">
          <FloatingLabel controlId="birthdate" label="Birthdate">
            <Form.Control required type="date" placeholder="Enter Musician DOB" />
          </FloatingLabel>
        </Form.Group>
      </Row>


      <Row className="entityForm">
        <Form.Group as={Col} controlId="firstName">
          <FloatingLabel controlId="firstName" label="First Name">
            <Form.Control required type="text" placeholder="Enter Musician First Name" />
          </FloatingLabel>
        </Form.Group>
        
        <Form.Group as={Col} controlId="lastName">
          <FloatingLabel controlId="lastName" label="Last Name">
            <Form.Control required type="text" placeholder="Enter Musician Last Name" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="entityForm">

        <Form.Group as={Col} controlId="email">
          <FloatingLabel controlId="email" label="Email">
            <Form.Control type="email" placeholder="Enter Musician Email Address" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="phoneNumber">
          <FloatingLabel controlId="phoneNumber" label="Phone">
            <Form.Control type="text" placeholder="Enter Musician Phone Number" />
          </FloatingLabel>
        </Form.Group>

        <Col>
        <Form.Group  className="entityFormCheckbox" id="inEnsemble">
          <Form.Check type="checkbox" label="Ensemble?" />
        </Form.Group>
        <Form.Group className="entityFormCheckbox" id="active">
          <Form.Check type="checkbox" label="Active?" />
        </Form.Group>
        </Col>
      </Row>


    <Row className="entityForm">
      <Form.Group as={Col} className="entityForm" controlId="street">
        <FloatingLabel controlId="street" label="Street Address">
          <Form.Control required placeholder="1234 Main St" />
        </FloatingLabel>
      </Form.Group>
     </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="city">
          <FloatingLabel controlId="city" label="City">
          <Form.Control required />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="state">
          <FloatingLabel controlId="state" label="State">
            <Form.Select required defaultValue="Choose...">
              <option>TX</option>
              <option>NY</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="zip">
          <FloatingLabel controlId="zip" label="Zip Code">
            <Form.Control required />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="formButton" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
