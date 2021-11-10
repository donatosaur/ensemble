import React, { useContext } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { EntityContext, EntityDispatchContext } from "../EntityContextProvider";
import StateOptions from "./FormComponents/StateOptions";


/**
 *
 * @param showID {boolean} true to show a (disabled) ID field; false to hide it
 * @param onSubmit {function(): void} handler for button click
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function MusiciansForm({ showID, onSubmit, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const musician = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnCheckboxChange = (event) => {
    dispatch({[event.target.id]: event.target.checked});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(musician));
  }

  return (
    
    <Form>
      <Row className="entityForm">
        <Form.Label children={formLabel} />
      </Row>


      <Row className="entityForm">
        { showID &&
        <Form.Group as={Col} controlId="musicianID">
          <FloatingLabel controlId="musicianID" label="Musician ID">
            <Form.Control
              disabled
              type="number"
              value={musician['id']}
            />
          </FloatingLabel>
        </Form.Group>
        }

        { !showID && // todo: this is temporary; we should refactor and create a new param for this
          <Form.Group as={Col} controlId="initialInstrumentID">
            <FloatingLabel controlId="initialInstrumentID" label="Initial InstrumentID">
              <Form.Control
                required
                type="number"
                placeholder="Enter an initial instrumentID"
                value={musician['initialInstrumentID']}
                onChange={handleOnChange}
              />
            </FloatingLabel>
          </Form.Group>
        }

        <Form.Group as={Col} controlId="birthdate">
          <FloatingLabel controlId="birthdate" label="Birthdate">
            <Form.Control
              required
              type="date"
              placeholder="Enter Musician DOB"
              value={musician['birthdate']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>


      <Row className="entityForm">
        <Form.Group as={Col} controlId="firstName">
          <FloatingLabel controlId="firstName" label="First Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter Musician First Name"
              value={musician['firstName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
        
        <Form.Group as={Col} controlId="lastName">
          <FloatingLabel controlId="lastName" label="Last Name">
            <Form.Control
              required
              type="text"
              placeholder="Enter Musician Last Name"
              value={musician['lastName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="entityForm">

        <Form.Group as={Col} controlId="email">
          <FloatingLabel controlId="email" label="Email">
            <Form.Control
              type="email"
              placeholder="Enter Musician Email Address"
              value={musician['email']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="phoneNumber">
          <FloatingLabel controlId="phoneNumber" label="Phone">
            <Form.Control
              type="text"
              placeholder="Enter Musician Phone Number"
              value={musician['phoneNumber']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Col>
        <Form.Group className="entityFormCheckbox" controlId="inEnsemble">
          <Form.Check
            type="checkbox"
            label="Ensemble?"
            checked={musician['inEnsemble']}
            onChange={(handleOnCheckboxChange)}
          />
        </Form.Group>
        <Form.Group className="entityFormCheckbox" controlId="active">
          <Form.Check
            type="checkbox"
            label="Active?"
            checked={musician['active']}
            onChange={handleOnCheckboxChange}
          />
        </Form.Group>
        </Col>
      </Row>


    <Row className="entityForm">
      <Form.Group as={Col} className="entityForm" controlId="street">
        <FloatingLabel controlId="street" label="Street Address">
          <Form.Control
            required
            placeholder="1234 Main St"
            value={musician['street']}
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
            value={musician['city']}
            onChange={handleOnChange}
          />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="state">
          <FloatingLabel controlId="state" label="State">
            <Form.Select
              required
              placeholder="Select a state..."
              value={musician['state']}
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
              value={musician['zip']}
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
