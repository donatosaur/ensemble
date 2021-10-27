import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

export default function MusiciansConcertCyclesForm() {
  return (
    <Form>
      <Row className="entityForm">
        <Form.Group as={Col} controlId="musicianID">
          <FloatingLabel controlId="musicianID" label="Musician ID">
            <Form.Control type="text" placeholder="Enter Musician ID" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} controlId="concertID">
          <FloatingLabel controlId="concertID" label="Concert ID">
            <Form.Control type="text" placeholder="Enter Concert ID" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="formButton" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
