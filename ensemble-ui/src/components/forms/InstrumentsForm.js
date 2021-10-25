import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function InstrumentsForm() {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="instrumentID">
          <Form.Label>Instrument ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Instrument ID" />
        </Form.Group>

        <Form.Group as={Col} controlId="name">
          <Form.Label>Instrument Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Instrument Name" />
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
