import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";


export default function ConcertCyclesForm() {
  return (
    <Form>
      <Row className="entityForm">
        <Form.Label>Add a Concert Cycle</Form.Label>
      </Row>

      <Row className="entityForm">
        {/* <Form.Group as={Col} controlId="concertID">
          <FloatingLabel controlId="concertID" label="Concert ID">
            <Form.Control type="text" placeholder="Enter Concert ID" />
          </FloatingLabel>
        </Form.Group> */}

        <Form.Group as={Col} controlId="concertTitle">
          <FloatingLabel controlId="concertTitle" label="Concert Title">
            <Form.Control type="text" placeholder="Enter Concert Title" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="startDate">
          <FloatingLabel controlId="startDate" label="Start Date">
            <Form.Control type="date" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="endDate">
          <FloatingLabel controlId="endDate" label="End Date">
            <Form.Control type="date" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="conductorFirstName">
          <FloatingLabel controlId="conductorFirstName" label="Conductor First Name">
            <Form.Control type="text" placeholder="Enter Conductor's First Name" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="conductorLastName">
          <FloatingLabel controlId="conductorFirstName" label="Conductor Last Name">
            <Form.Control type="text" placeholder="Enter Conductor's Last Name" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="soloistFirstName">
          <FloatingLabel controlId="soloistFirstName" label="Soloist First Name">
            <Form.Control type="text" placeholder="Enter Soloist's First Name" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="soloistLastName">
          <FloatingLabel controlId="soloistLastName" label="Soloist Last Name">
            <Form.Control type="text" placeholder="Enter Soloist's Last Name" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="formButton" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
