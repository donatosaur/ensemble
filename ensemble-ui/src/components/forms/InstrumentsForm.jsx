import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

export default function InstrumentsForm() {
  return (
    <Form>
      <Row className="entityForm">
        {/* <Form.Group as={Col} controlId="instrumentID">
          <FloatingLabel controlId="instrumentID" label="Instrument ID">
            <Form.Control type="text" placeholder="Enter Instrument ID" />
          </FloatingLabel>
        </Form.Group> */}

        <Form.Group as={Col} controlId="instrumentName">
        <FloatingLabel controlId="instrumentName" label="Name">
            <Form.Control type="text" placeholder="Enter Instrument Name" />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="formButton" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
