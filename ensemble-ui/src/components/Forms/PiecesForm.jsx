import React, { useContext, useReducer } from "react";
import { Col, Row, Button, Form, Container, FloatingLabel } from "react-bootstrap";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";
import { entityFormInitializer, entityFormReducer } from '../../utils/reducers';
import { InputField, TextAreaField } from './FormComponents/Fields';


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {object} initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} mode
 * @returns {JSX.Element}
 */
export default function PiecesForm({ initialFormValues, mode }){
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
      if (mode === "create" || mode ==="update") {
        try {
          const response = mode === "create" ? await createEntity(entity) : await updateEntity(entity);
          console.log(response);
          history.go(0);  // refresh the page; history[0] is the current path
        } catch (error) {
          alert(error?.sqlMessage);
        }
      }
    }();
  }


  return(
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
            name="pieceTitle"
            label="Title"
            value={entity.pieceTitle.value}
            isInvalid={entity.pieceTitle.isInvalid}
            errorText="Please enter the piece's title."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} md={2}>
        <Col className="mb-3">
          <InputField
            name="composerFirstName"
            label="Composer First Name"
            value={entity.composerFirstName.value}
            isInvalid={entity.composerFirstName.isInvalid}
            errorText="Please enter the composer's first name."

            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="composerLastName"
            label="Composer Last Name"
            value={entity.composerLastName.value}
            isInvalid={entity.composerLastName.isInvalid}
            errorText="Please enter the composer's last name."
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} md={2}>
        <Col className="mb-3">
          <InputField
            name="arrangerFirstName"
            label="Arranger First Name"
            value={entity.arrangerFirstName.value}
            isInvalid={entity.arrangerFirstName.isInvalid}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="arrangerLastName"
            label="Arranger Last Name"
            value={entity.arrangerLastName.value}
            isInvalid={entity.arrangerLastName.isInvalid}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <TextAreaField
            name="instrumentation"
            label="Instrumentation"
            value={entity.instrumentation.value}
            isInvalid={entity.instrumentation.isInvalid}
            errorText="Please enter the piece's instrumentation."
            {...defaultProps}
          />
        </Col>
      </Row>
  
      <Button className="mt-3" variant="primary" type="submit" onClick={handleOnSubmit}>
        { mode === 'create' ? 'Submit' : 'Commit'}
      </Button>
    </Form>
  )
}