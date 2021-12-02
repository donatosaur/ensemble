import React, { useReducer, useState } from "react";
import { Col, Row, Form, Alert } from "react-bootstrap";
import { useEntity } from "../../hooks/useEntity";
import { useHistory } from "react-router-dom";
import { entityFormInitializer, entityFormReducer } from '../../utils/reducers';
import { InputField, TextAreaField } from './FormComponents/Fields';
import SpinnerButton from './FormComponents/SpinnerButton';


/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useEntity.js)
 * @param {"create" | "update"} props.mode
 * @returns {JSX.Element}
 */
export default function PiecesForm({ initialFormValues, mode }){
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  // define validation checks
  const validate = new Map([
    ['pieceTitle', /./],                 // required
    ['composerFirstName', /./],          // required
    ['composerLastName', /./],           // required
    ['instrumentation', /./],            // required
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
          // rejected promises for call API are guaranteed to be strings
          setFormAlert(`${error}`);
        }
      }();
    }
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
  }


  return(
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
          <Col className="mb-3" xs={2}>
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
            maxLength={100}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} lg={2}>
        <Col className="mb-3">
          <InputField
            name="composerFirstName"
            label="Composer First Name"
            value={entity.composerFirstName.value}
            isInvalid={entity.composerFirstName.isInvalid}
            errorText="Please enter the composer's first name."
            maxLength={50}
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
            maxLength={50}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1} lg={2}>
        <Col className="mb-3">
          <InputField
            name="arrangerFirstName"
            label="Arranger First Name"
            value={entity.arrangerFirstName.value}
            isInvalid={entity.arrangerFirstName.isInvalid}
            maxLength={50}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="arrangerLastName"
            label="Arranger Last Name"
            value={entity.arrangerLastName.value}
            isInvalid={entity.arrangerLastName.isInvalid}
            maxLength={50}
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

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  )
}