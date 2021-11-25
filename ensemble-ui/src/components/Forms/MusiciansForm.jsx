import React, { useReducer } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { InputField, CheckboxField } from './FormComponents/Fields';
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from 'react-router-dom';

// for debugging form validation
const DEBUG = false;


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {object} initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} mode
 * @returns {JSX.Element}
 */
export default function MusiciansForm({ initialFormValues, mode }) {
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();

  // define validation checks
  // const validate = {
  //   firstName: /./, // at least one char
  //   lastName: /./,
  //   phoneNumber: /^\d{10}$/,
  //   zip: /^\d{5}$/,
  // }

  // construct default props for each input field; these will be the same for each entity (while the null coalescing
  // operator is fantastic, it makes this particular section hard to understand, so we're using isNil instead)
  const defaultProps = {
    onBlur: (event) => dispatch({
      field: event.target.name,
      // isInvalid: 
        // !isNil(validate[event.target.name]) && 
        // !validate[event.target.name]?.test(`${event.target.value}`),
      modified: true
    }),
    onChange: (event) => dispatch({
      field: event.target.name,
      // if onBlur fired at least once AND there's a validation check AND the validation check fails
      // isInvalid: entity[event.target.name].modified && (validate[event.target.name]?.test(`${event.target.value}`) ?? false),
      value: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    })
  }

  // override default form submit behavior
  const handleOnSubmit = (event) => {
    event.preventDefault();

    // debug
    if (DEBUG) {
      const validValues = {}
      const invalidValues = {}
      for (const [field, obj] of Object.entries(entity)) {
        obj.isInvalid ? invalidValues[field] = obj.value: validValues[field] = obj.value
      }
      alert(`Valid:\n${JSON.stringify(validValues, null, ' ')}\n\n` +
            `Invalid:"\n${JSON.stringify(invalidValues, null, ' ')}`);
      return;
    }

    // otherwise, submit the request
    void async function submitForm(){
      if (mode === "create" || mode === "update") {
        try {
          // map fields and check whether any value is marked as invalid before submitting; normally it would be
          // best to use entries.forEach here, but we need to return control if something is invalid
          const request = {}
          for (const [field, fieldObject] of Object.entries(entity)) {
            if (fieldObject.isInvalid) {
              console.log('At least one input field is invalid; please check the instructions under each field.')
              return;
            }
            request[field] = fieldObject.value;
          }
          const response = mode === "create" ? await createEntity(request) : await updateEntity(request);
          console.log(response);
          history.go(0);  // refresh the page; history[0] is the current path
        } catch (error) {
          alert(error?.sqlMessage);
        }
      }
    }();
  }

  return (
    <Form noValidate className="entityForm">
      <Row>
        { mode === 'edit' &&
        <Col className="mb-3">
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
            name="birthdate"
            type="date"
            label="Birthdate"
            value={entity.birthdate.value}
            isInvalid={entity.birthdate.isInvalid}
            errorText="Please enter a birthdate."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} md={2}>
        <Col className="mb-3">
          <InputField
            name="firstName"
            label="First Name"
            value={entity.firstName.value}
            isInvalid={entity.firstName.isInvalid}
            errorText="Please enter a first name."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="lastName"
            label="Last Name"
            value={entity.lastName.value}
            isInvalid={entity.lastName.isInvalid}
            errorText="Please enter a last name."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col xs="5">
          <InputField
            name="email"
            type="email"
            label="Email"
            value={entity.email.value}
            isInvalid={entity.email.isInvalid}
            {...defaultProps}
          />
        </Col>
        <Col xs="4">
        <InputField
          name="phoneNumber"
          label="Phone"
          type="tel"
          value={entity.phoneNumber.value}
          isInvalid={entity.phoneNumber.isInvalid}
          errorText="Please either leave blank or enter exactly 10 digits."
          {...defaultProps}
        />
        </Col>

        <Col className="mb-3 pull-left" xs="3">
          <CheckboxField
            inline
            style={{textAlign: 'left'}}
            name="inEnsemble"
            label="In Ensemble?"
            value={entity.inEnsemble.value}
            isInvalid={entity.inEnsemble.isInvalid}
            {...defaultProps}
          />
          <CheckboxField
            inline
            name="active"
            label="Active?"
            value={entity.active.value}
            isInvalid={entity.active.isInvalid}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <InputField
            name="street"
            type="street"
            label="Street Address"
            value={entity.street.value}
            isInvalid={entity.street.isInvalid}
            errorText="Please enter a street address."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col xs="7">
          <InputField
            name="city"
            label="City"
            value={entity.city.value}
            isInvalid={entity.city.isInvalid}
            errorText="Please enter a city."
            {...defaultProps} />
        </Col>
        <Col xs="2">
          <InputField
            name="state"
            label="State"
            value={entity.state.value}
            isInvalid={entity.state.isInvalid}
            errorText="Please enter a state."
            {...defaultProps} />
        </Col>
        <Col xs="3">
          <InputField
            name="zip"
            label="Zip Code"
            type="tel"
            value={entity.zip.value}
            isInvalid={entity.zip.isInvalid}
            errorText="Please enter exactly 5 digits."
            {...defaultProps} />
        </Col>
      </Row>

      <Button className="mt-4" variant="primary" type="submit" onClick={handleOnSubmit}>
        Submit
      </Button>
    </Form>
  );
}
