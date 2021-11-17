import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";
import {useEntity} from "../../hooks/useEntity";
import {useHistory} from "react-router-dom";


/**
 * Creates a form for create and update operations
 *
 * @param mode {"create" | "update"}
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function InstrumentsForm({ mode, formLabel, buttonLabel }){
  // state hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const instrument = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const { createEntity, updateEntity } = useEntity();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();

    void async function submitForm(){
      if (mode === "create" || mode ==="update") {
        try {
          const response = mode === "create"
            ? await createEntity(instrument)
            : await updateEntity(instrument);
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

  return (
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>


      <InputGroup as={Row} hasValidation>


      { mode === "update" &&
        <Form.Group as={Col} controlId="id">
          <FloatingLabel controlId="id" label="Instrument ID">
            <Form.Control
              disabled
              value={instrument['id']}
            />
          </FloatingLabel>
        </Form.Group>
      }

        
        <Form.Group as={Col} controlId="name">
        <FloatingLabel controlId="name" label="Instrument Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter Instrument Name"
              isInvalid={instrument['name'] === ''}
              value={instrument['name']}
              onChange={handleOnChange}
              
            />
            <Form.Control.Feedback type="invalid">
              Please choose a name.
          </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
       
       </InputGroup>


      <Button className="mt-3" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  );
}
