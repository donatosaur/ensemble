import React, { useContext } from "react";
import {Form, Row, Col, Button, FloatingLabel} from "react-bootstrap";
import {EntityContext, EntityDispatchContext} from "../EntityContextProvider";
import StateOptions from "../StateOptions";

/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function VenuesForm({ showID, onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const venue = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the piece state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(venue));
  }

  return ( 
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>

    {showID &&
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

    <Row className="entityForm">
      <Form.Group as={Col} className="entityForm" controlId="street">
        <FloatingLabel controlId="street" label="Street Address">
          <Form.Control
            required
            placeholder="1234 Main St"
            value={venue['street']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>
    </Row>

    <Row className="entityForm">
      <Form.Group as={Col} controlId="city">
        <FloatingLabel controlId="city" label="City">
          <Form.Control
            required
            placeholder="Chicago"
            value={venue['city']}
            onChange={handleOnChange}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Col} controlId="state">
        <FloatingLabel controlId="state" label="State">
          <Form.Select
            required
            defaultValue="Select a state..."
            value={venue['state']}
            onChange={handleOnChange}
          >
            <StateOptions />
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group as={Col} controlId="zip">
        <FloatingLabel controlId="zip" label="Zip Code">
          <Form.Control
            required
            placeholder="98765"
            value={venue['zip']}
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
