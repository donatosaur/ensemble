import React, { useContext } from "react";
import { EntityContext, EntityDispatchContext } from "../EntityContextProvider";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function PiecesConcertCyclesForm({ showID, onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const piecesConcertCycles = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the piece state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(piecesConcertCycles));
  }

  return (
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="pieceID">
          <FloatingLabel controlId="pieceID" label="Piece ID">
            <Form.Control
              required
              type="text"
              placeholder="Enter Piece ID"
              value={piecesConcertCycles['instrumentID']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="concertID">
          <FloatingLabel controlId="concertID" label="Concert ID">
            <Form.Control
              required
              type="text"
              placeholder="Enter Concert ID"
              value={piecesConcertCycles['concertID']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Button className="formButton" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  );
}
