import React, { useContext } from "react";
import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import {useEntity} from "../../hooks/useEntity";
import {useHistory} from "react-router-dom";

/**
 * Creates a form for create and update operations
 *
 * @param mode {"create"}
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function PiecesConcertCyclesForm({ mode, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const piecesConcertCycles = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const { createEntity } = useEntity();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();

    void async function submitForm(){
      if (mode === "create") {
        try {
          const response = await createEntity(piecesConcertCycles);
          console.log(response);
          // refresh the page; history[0] is the current path
          history.go(0);
        } catch (error) {
          alert(error['sqlMessage']);
        }
      }
    }();
  }

  const handleOnChange = (event) => {
    // slot the new value into the piece state
    dispatch({[event.target.id]: event.target.value});
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

      <Button className="formt-3mButton" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  );
}
