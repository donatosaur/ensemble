import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";

import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";


/**
 * Creates a form for create and update operations
 *
 * @param mode {"create" | "update"}
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function PiecesForm({ mode, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const piece = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const { createEntity, updateEntity } = useEntity();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();

    void async function submitForm(){
      if (mode === "create" || mode ==="update") {
        try {
          const response = mode === "create"
            ? await createEntity(piece)
            : await updateEntity(piece);

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
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  return(
    <Form>
      <Row className="entityForm">
        <Form.Label>{formLabel}</Form.Label>
      </Row>

      <Row className="entityForm">
        { mode === "update" &&
        <Form.Group as={Col} controlId="id">
          <FloatingLabel controlId="id" label="Piece ID">
            <Form.Control
              disabled
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

  
      <Button className="mt-3" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  )
}