import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { EntityContext, EntityDispatchContext } from "../EntityContextProvider";

import "react-datetime/css/react-datetime.css";


/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function ServicesForm({ showID, onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const piece = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(piece));
  }

  return(
    <Form>
      <Row className="entityForm">
        <Form.Label>{formLabel}</Form.Label>
      </Row>

      <Row className="entityForm">
        { showID &&
        <Form.Group as={Col} controlId="pieceID">
          <FloatingLabel controlId="pieceID" label="Piece ID">
            <Form.Control
              disabled
              type="number"
              value={piece['id']}
            />
          </FloatingLabel>
        </Form.Group>
        }
  
        <Form.Group as={Col} controlId="pieceTitle">
          <FloatingLabel controlId="pieceTitle" label="Piece Title">
            <Form.Control
              required
              type="text"
              placeholder="Enter Piece Title"
              value={piece['pieceTitle']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
  

      <Row className="entityForm">
        <Form.Group as={Col} controlId="composerFirstName">
          <FloatingLabel controlId="composerFirstName" label="Composer First Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter Composer's First Name"
              value={piece['composerFirstName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          </Form.Group>
  
          <Form.Group as={Col} controlId="composerLastName">
            <FloatingLabel controlId="composerLastName" label="Composer Last Name">
              <Form.Control
                required
                type="text"
                placeholder="Enter Composer's Last Name"
                value={piece['composerLastName']}
                onChange={handleOnChange}
              />
            </FloatingLabel>
          </Form.Group>
      </Row>


    <Row className= "entityForm">
      <Form.Group as={Col} controlId="arrangerFirstName">
        <FloatingLabel controlId="arrangerFirstName" label="Arranger First Name">
          <Form.Control
            type="text"
            placeholder="Enter Arranger's First Name"
            value={piece['arrangerFirstName']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>
  
      <Form.Group as={Col} controlId="arrangeLastName">
        <FloatingLabel controlId="arrangeLastName" label="Arranger Last Name">
          <Form.Control
            type="text"
            placeholder="Enter Arranger's Last Name"
            value={piece['arrangerLastName']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>
    </Row>

    <Row className= "entityForm">
      <Form.Group as={Col} controlId="instrumentation">
        <FloatingLabel controlId="instrumentation" label="Instrumentation">
          <Form.Control
            required
            as="textarea"
            type="text"
            placeholder="Instrumentation"
            value={piece['instrumentation']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>
    </Row>

  
      <Button className="formButton" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  )
}