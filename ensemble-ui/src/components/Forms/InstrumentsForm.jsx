import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";


/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function InstrumentsForm({ showID, onSubmit, formLabel, buttonLabel }){
  // state hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const instrument = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(instrument));
  }


  return (
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>


      <InputGroup as={Row} hasValidation>


      { showID &&
        <Form.Group as={Col} controlId="instrumentID">
          <FloatingLabel controlId="instrumentID" label="Instrument ID">
            <Form.Control
              disabled
              type="number"
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
