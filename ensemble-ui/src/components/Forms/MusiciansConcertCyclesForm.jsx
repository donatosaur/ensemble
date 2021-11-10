import React, { useContext } from "react";
import { EntityContext, EntityDispatchContext } from "../EntityContextProvider";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

/**
 *
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function MusiciansConcertCyclesForm({ onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const musiciansConcertCycles = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(musiciansConcertCycles));
  }

  return (
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>

      <Row className="entityForm">
        <Form.Group as={Col} controlId="musicianID">
          <FloatingLabel controlId="musicianID" label="Musician ID">
            <Form.Control
              required
              type="text"
              placeholder="Enter Musician ID"
              value={musiciansConcertCycles['musicianID']}
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
              value={musiciansConcertCycles['concertID']}
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
