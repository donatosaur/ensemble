import React from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

export default function PiecesConcertCyclesForm() {
  return (
    <Form>
      <Row className="entityForm">
        <Form.Group as={Col} controlId="pieceID">
          <FloatingLabel controlId="pieceID" label="Piece ID">
            <Form.Control type="text" placeholder="Enter Piece ID" />
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
