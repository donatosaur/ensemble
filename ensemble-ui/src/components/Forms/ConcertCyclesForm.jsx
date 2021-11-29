import React, { useReducer, useState } from "react";
import { Col, Row, Form, Alert } from "react-bootstrap";
import { InputField } from './FormComponents/Fields';
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from 'react-router-dom';
import SpinnerButton from './FormComponents/SpinnerButton';


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} props.mode
 * @returns {JSX.Element}
 */
export default function ConcertCyclesForm({ initialFormValues, mode }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  // define validation checks
  const validate = new Map([
    ['concertTitle', /./],            // required
    ['startDate', /./],               // required; the input field will handle formatting
    ['endDate', /./],                 // required
    ['conductorFirstName', /./],      // required
    ['conductorLastName', /./],       // required
  ]);

  /**
   * Returns true only if *all* the following hold:
   *   - the field was modified at least once AND
   *   - there is a **valid** regex check defined on the field (this is why we null coalesce to false) AND
   *   - the regex check fails (because the regex is defined on valid states)
   * @returns {boolean} true if the input is invalid
   */
  const setIsInvalid = (field, value) => validate.has(field) && (!validate.get(field)?.test(`${value}`) ?? false);

  /**
   * Construct default props for each entity (these are event handlers that will be identical for all fields).
   * Since this may be a bit difficult to follow:
   *  - `event.target.name` should match the field's name since `name` is a required attribute on our elements
   *  - `event.target.value` will hold the value of each input element, since these are all controlled components
   *  - `modified` is set if the input element was entered at least once (i.e., if onBlur has fired on it)
   */
  const defaultProps = {
    onBlur: (event) => dispatch({
      field: event.target.name,
      isInvalid: setIsInvalid(event.target.name, event.target.value),
      modified: true
    }),
    onChange: (event) => dispatch({
      field: event.target.name,
      value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      isInvalid: entity[event.target.name].modified  && setIsInvalid(event.target.name, event.target.value)
    })
  }

  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setLoading(true);  // set the submit button to its "loading" state to prevent multiple identical requests

    // validate input and construct the request object (this way we only iterate over entity at most once)
    let validated = true;
    const request = {};
    Object.entries(entity).forEach(([field, fieldObject]) => {
      // map to request object so that it contains field-value pairs
      request[field] = fieldObject.value;

      // check validation state
      const fieldIsInvalid = setIsInvalid(field, fieldObject.value);
      if (fieldIsInvalid) {
        dispatch({ field: field, isInvalid: fieldIsInvalid });
        validated = false;
      }
    });

    // if the input was invalid, let the user know; otherwise immediately submit the request
    if (!validated) {
      setFormAlert('At least one input field is invalid. Please check the instructions under each field.');
    } else if (mode === 'create' || mode === 'update') {
      void async function submitForm(){
        try {
          const response = mode === 'create' ? await createEntity(request) : await updateEntity(request);
          console.log(response);
          history.go(0);  // refresh the page; history[0] represents the current path
        } catch (error) {
          // rejected promises should already be parsed: if the backend send back an error message from
          // the sql database, we can display that error here, otherwise we should display whatever other
          // error message the backend sends instead
          setFormAlert(error?.sqlMessage ?? error);
        }
      }();
    }
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  }


  return (
    <Form noValidate className="entityForm" onSubmit={handleOnSubmit}>
      { formAlert &&
        <Alert 
          key="formAlert" 
          variant="danger"
          onClose={() => setFormAlert(null)}
          children={formAlert}
          dismissible
        />
      }

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
            maxLength={100}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="startDate"
            label="Start Date"
            type="date"
            value={entity.startDate.value}
            isInvalid={entity.startDate.isInvalid}
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
            maxLength={50}
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
            maxLength={50}
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
            maxLength={50}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="soloistLastName"
            label="Soloist Last Name"
            value={entity.soloistLastName.value}
            isInvalid={entity.soloistLastName.isInvalid}
            maxLength={50}
            {...defaultProps}
          />
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  );
}
