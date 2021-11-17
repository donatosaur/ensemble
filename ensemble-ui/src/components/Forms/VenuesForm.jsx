import React, {useContext, useState} from "react";
import {Form, Row, Col, Button, FloatingLabel} from "react-bootstrap";
import {EntityContext, EntityDispatchContext} from "../../hooks/EntityContextProvider";
import AddressInput from "./FormComponents/AddressInput";
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
export default function VenuesForm({ mode, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const venue = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const [showHelpText, setShowHelpText] = useState(false);

  const { createEntity, updateEntity } = useEntity();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();

    void async function submitForm(){
      if (mode === "create" || mode ==="update") {
        try {
          const response = mode === "create"
            ? await createEntity(venue)
            : await updateEntity(venue);

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

    { mode === "update" &&
    <Form.Group as={Col} controlId="venueID">
      <FloatingLabel controlId="venueID" label="Venue ID">
        <Form.Control
          disabled
          type="number"
          value={venue['id']}
        />
      </FloatingLabel>
    </Form.Group>
    }

    <Row className="entityForm">
      <Form.Group as={Col} controlId="capacity">
        <FloatingLabel controlId="capacity" label="Capacity">
          <Form.Control
            required
            type="number"
            placeholder="Enter Venue Capacity"
            value={venue['capacity']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>
      
      <Form.Group as={Col} controlId="name">
        <FloatingLabel controlId="name" label="Venue Name">
          <Form.Control
            required
            type="text"
            placeholder="Enter Venue Name"
            value={venue['name']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>
    </Row>

      <AddressInput
        streetValue={venue['street']}
        cityValue={venue['city']}
        stateValue={venue['state']}
        zipValue={venue['zip']}
        handleOnChange={handleOnChange}
        showHelpText={showHelpText}
      />

    <Button className="mt-1" variant="primary" type="submit" onClick={handleOnSubmit}>
      {buttonLabel || 'Submit'}
    </Button>
  </Form>
  )
}
