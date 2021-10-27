import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

export default function MusiciansInstrumentsForm() {
  return (
    <Form>
      <Row className="entityForm">
        <Form.Group as={Col} controlId="musicianID">
          <FloatingLabel controlId="musicianID" label="Musician ID">
            <Form.Control type="text" placeholder="Enter Musician ID" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} controlId="instrumentID">
          <FloatingLabel controlId="instrumentID" label="Instrument ID">
            <Form.Control type="text" placeholder="Enter Instrument ID" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="formButton" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
