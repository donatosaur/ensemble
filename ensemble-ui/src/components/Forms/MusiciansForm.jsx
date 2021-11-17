import React, {useContext, useState} from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";

import { EntityContext, EntityDispatchContext } from "../../hooks/EntityContextProvider";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";

import AddressInput from "./FormComponents/AddressInput";

/**
 * Creates a form for create and update operations
 *
 * @param mode {"create" | "update"}
 * @param formLabel a short text description for the form
 * @param buttonLabel text to display on the form button
 * @returns {JSX.Element}
 * @constructor
 */
export default function MusiciansForm({ mode, formLabel, buttonLabel }){
  // reducer hook to hold form data: see https://reactjs.org/docs/hooks-reference.html#usereducer
  const musician = useContext(EntityContext);
  const dispatch = useContext(EntityDispatchContext);
  const { createEntity, updateEntity } = useEntity();
  const history = useHistory();

  const handleOnSubmit = (event) => {
    event.preventDefault();


    void async function submitForm(){
      if (mode === "create" || mode ==="update") {
        try {
          const response = mode === "create"
            // TODO: temporary solution; coerce checkbox values to boolean
            ? await createEntity({
              ...musician,
              inEnsemble: !!musician['inEnsemble'],
              active: !!musician['active']
            })
            : await updateEntity(musician);

          console.log(response);

          // refresh the page; history[0] is the current path
          history.go(0);
        } catch (error) {
          alert(error['sqlMessage']);
        }
      }
    }();
  }

  const [showHelpText, setShowHelpText] = useState(false);


  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.name]: event.target.value});
  }

  const handleOnCheckboxChange = (event) => {
    dispatch({[event.target.name]: event.target.checked});
  }

  return (
    <Form noValidate>
      <Row className="text-left m-3" >
        <Form.Label children={formLabel} />
      </Row>


      <Row className="mb-3">
        { mode === "create"
            // displayed when creating a new entity
            ? <Form.Group as={Col} controlId="initialInstrumentID">
                <FloatingLabel controlId="initialInstrumentID" label="Initial Instrument">
                  <Form.Control
                    required
                    name="initialInstrumentID"
                    placeholder="Enter an initial instrumentID"
                    value={musician['initialInstrumentID']}
                    onChange={handleOnChange}
                  />
                </FloatingLabel>
              </Form.Group>
            // displayed when editing an entity
            : <Form.Group as={Col} controlId="id">
              <FloatingLabel controlId="id" label="Musician ID">
                <Form.Control
                  disabled
                  name="id"
                  value={musician['id']}
                />
              </FloatingLabel>
            </Form.Group>
        }

        <Form.Group as={Col} controlId="birthdate">
          <FloatingLabel controlId="birthdate" label="Birthdate">
            <Form.Control
              required
              type="date"
              name="birthdate"
              placeholder="Enter Musician DOB"
              value={musician['birthdate']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="firstName">
          <FloatingLabel controlId="firstName" label="First Name">
            <Form.Control
              required
              name="firstName"
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
              name="lastName"
              placeholder="Enter Musician Last Name"
              value={musician['lastName']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="email">
          <FloatingLabel controlId="email" label="Email">
            <Form.Control
              name="email"
              placeholder="Enter Musician Email Address"
              value={musician['email']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="phoneNumber">
          <FloatingLabel controlId="phoneNumber" label="Phone">
            <Form.Control
              name="phoneNumber"
              placeholder="Enter Musician Phone Number"
              value={musician['phoneNumber']}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form.Group>

        <Col>
        <Form.Group className="entityFormCheckbox" controlId="inEnsemble">
          <Form.Check
            inline
            name="inEnsemble"
            type="checkbox"
            label="Ensemble?"
            checked={musician['inEnsemble']}
            onChange={(handleOnCheckboxChange)}
          />
        </Form.Group>
        <Form.Group className="entityFormCheckbox" controlId="active">
          <Form.Check
            inline
            name="active"
            type="checkbox"
            label="Active?"
            checked={musician['active']}
            onChange={handleOnCheckboxChange}
          />
        </Form.Group>
        </Col>
      </Row>

      <AddressInput
        streetValue={musician['street']}
        cityValue={musician['city']}
        stateValue={musician['state']}
        zipValue={musician['zip']}
        handleOnChange={handleOnChange}
        showHelpText={showHelpText}
      />

      <Button className="mt-1" variant="primary" type="submit" onClick={handleOnSubmit}>
        {buttonLabel || 'Submit'}
      </Button>
    </Form>
  );
}
