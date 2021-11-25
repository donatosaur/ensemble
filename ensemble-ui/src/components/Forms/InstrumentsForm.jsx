import React, { useReducer } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { InputField } from './FormComponents/Fields';
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from 'react-router-dom';



/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {object} initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} mode
 * @returns {JSX.Element}
 */
export default function InstrumentsForm({ initialFormValues, mode }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();

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
    void async function submitForm(){
      if (mode === "create" || mode === "update") {
        try {
          // map fields and check whether any value is marked as invalid before submitting; normally it would be
          // best to use entries.forEach here, but we need to return control if something is invalid
          const request = {}
          for (const [field, fieldObject] of Object.entries(entity)) {
            if (fieldObject.isInvalid) {
              alert('At least one input field is invalid; please check the instructions under each field.')
              return;
            }
            request[field] = fieldObject;
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
          name="name"
          label="Instrument Name"
          value={entity.name.value}
          isInvalid={entity.name.isInvalid}
          errorText="Please enter the instrument's name."
          {...defaultProps}
        />
      </Col>
      </Row>


      <Button className="m-1" variant="primary" type="submit" onClick={handleOnSubmit}>
        { mode === 'create' ? 'Submit' : 'Commit'}
      </Button>
    </Form>
  );
}
