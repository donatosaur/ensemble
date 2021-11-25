import React, { useReducer, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { InputField } from './FormComponents/Fields';
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from 'react-router-dom';
import SpinnerButton from './FormComponents/SpinnerButton';


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {object} initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} mode
 * @returns {JSX.Element}
 */
export default function ConcertCyclesForm({ initialFormValues, mode }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(
    entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // define validation regex checks
  // const validation = {};

  // construct default props for each input field; these will be the same for each entity
  const defaultProps = {
    onBlur: (event) => dispatch({
      field: event.target.name,
      // isInvalid: !validation[event.target.name]?.test(`${event.target.value}`),
      modified: true
    }),
    onChange: (event) => dispatch({
      field: event.target.name,
      // if onBlur fired at least once AND there's a validation check AND the validation check fails
      // isInvalid: entity[event.target.name].modified && !validation[event.target.name]?.test(`${event.target.value}`),
      value: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    })
  }

  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setLoading(true);  // set the submit button to its "loading" state to prevent multiple identical requests

    void async function submitForm(){
      if (mode === "create" || mode === "update") {
        let validated = true;
        const request = {};
  
        try {
          // map fields and check whether any value is marked as invalid before submitting      
          Object.entries(entity).forEach(([field, fieldObject]) => {
            if (fieldObject.isInvalid) { 
              validated = false; 
            }
            request[field] = fieldObject.value;
          })  

          // check whether the form is in a valid state
          if (validated) {
            const response = mode === "create" ? await createEntity(request) : await updateEntity(request);
            console.log(response);
            history.go(0); // refresh the page; history[0] represents the current path
          } else {
            // let the user know something went wrong
            alert('At least one input field is invalid; please check the instructions under each field.');
          }
        } catch (error) {
          // rejected promises should already be parsed; if the backend send back an error message from
          // the sql database, we can display that error here, otherwise we should display whatever other
          // error message the backend sends instead
          alert(error?.sqlMessage ?? error);
        }
      }
    }();
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  }


  return (
    <Form noValidate className="entityForm">
      <Row>
        { mode === "update" &&
        <Col className="mb-3" xs="2">
          <InputField
            disabled
            name="id"
            label="ID"
            value={entity.id.value}
            isInvalid={entity.id.isInvalid}
            {...defaultProps}
          />
        </Col>
        }
        <Col className="mb-3">
          <InputField
            name="concertTitle"
            label="Concert Title"
            value={entity.concertTitle.value}
            isInvalid={entity.concertTitle.isInvalid}
            errorText="Please enter the concert's title."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="startDate"
            label="Start Date"
            type="date"
            value={entity.concertTitle.value}
            isInvalid={entity.concertTitle.isInvalid}
            errorText="Please enter a start date."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="endDate"
            label="End Date"
            type="date"
            value={entity.endDate.value}
            isInvalid={entity.endDate.isInvalid}
            errorText="Please enter an end date."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <InputField
            name="conductorFirstName"
            label="Conductor First Name"
            value={entity.conductorFirstName.value}
            isInvalid={entity.conductorFirstName.isInvalid}
            errorText="Please enter the conductor's first name."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="conductorLastName"
            label="Conductor Last Name"
            value={entity.conductorLastName.value}
            isInvalid={entity.conductorLastName.isInvalid}
            errorText="Please enter the conductor's last name."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <InputField
            name="soloistFirstName"
            label="Soloist First Name"
            value={entity.soloistFirstName.value}
            isInvalid={entity.soloistFirstName.isInvalid}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="soloistLastName"
            label="Soloist Last Name"
            value={entity.soloistLastName.value}
            isInvalid={entity.soloistLastName.isInvalid}
            {...defaultProps}
          />
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" onClick={handleOnSubmit}>
        Submit
      </SpinnerButton>
    </Form>
  );
}
