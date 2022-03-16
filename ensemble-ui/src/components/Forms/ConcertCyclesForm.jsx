/* eslint-disable react/jsx-props-no-spreading */
import { useReducer, useState } from "react";
import {
  Col,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InputField } from "./FormComponents/Fields";
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import SpinnerButton from "./FormComponents/SpinnerButton";
import { generateSetIsInvalid, generateDefaultProps } from "./helpers";

/**
 * Generates a form for CREATE and UPDATE operations with fields pre-populated with initialFormValues.
 *
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useentity?.js)
 * @param {"create" | "update"} props.mode
 * @returns {JSX.Element}
 */
export default function ConcertCyclesForm({ initialFormValues, mode }) {
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  // define validation checks
  const validate = new Map([
    ["concertTitle", /./],            // required
    ["startDate", /./],               // required; the input field will handle formatting
    ["endDate", /./],                 // required
    ["conductorFirstName", /./],      // required
    ["conductorLastName", /./],       // required
  ]);
  const setIsInvalid = generateSetIsInvalid(validate);
  const defaultProps = generateDefaultProps(entity, setIsInvalid, dispatch);

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
        dispatch({ field, isInvalid: fieldIsInvalid });
        validated = false;
      }
    });

    // if the input was invalid, let the user know; otherwise immediately submit the request
    if (!validated) {
      setFormAlert("At least one input field is invalid. Please check the instructions under each field.");
    } else if (mode === "create" || mode === "update") {
      void (async function submitForm() {
        try {
          const response = mode === "create" ? await createEntity(request) : await updateEntity(request);
          console.log(response);
          navigate();  // refresh the page; history[0] represents the current path
        } catch (error) {
          // rejected promises for call API are guaranteed to be strings
          setFormAlert(`${error}`);
        }
      }());
    }
    setLoading(false); // no matter what, we should return the button to its "not loading" state
  };

  return initialFormValues && (
    <Form noValidate className="entityForm" onSubmit={handleOnSubmit}>
      { formAlert && (
        <Alert
          key="formAlert"
          variant="danger"
          onClose={() => setFormAlert(null)}
          dismissible
        >
          { formAlert }
        </Alert>
      )}

      <Row>
        { mode === "update" && (
          <Col className="mb-3" xs="2">
            <InputField
              disabled
              name="id"
              label="ID"
              value={entity?.id.value}
              isInvalid={entity?.id.isInvalid}
              {...defaultProps}
            />
          </Col>
        )}
        <Col className="mb-3">
          <InputField
            name="concertTitle"
            label="Concert Title"
            value={entity?.concertTitle.value}
            isInvalid={entity?.concertTitle.isInvalid}
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
            value={entity?.startDate.value}
            isInvalid={entity?.startDate.isInvalid}
            errorText="Please enter a start date."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="endDate"
            label="End Date"
            type="date"
            value={entity?.endDate.value}
            isInvalid={entity?.endDate.isInvalid}
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
            value={entity?.conductorFirstName.value}
            isInvalid={entity?.conductorFirstName.isInvalid}
            errorText="Please enter the conductor's first name."
            maxLength={50}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="conductorLastName"
            label="Conductor Last Name"
            value={entity?.conductorLastName.value}
            isInvalid={entity?.conductorLastName.isInvalid}
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
            value={entity?.soloistFirstName.value}
            isInvalid={entity?.soloistFirstName.isInvalid}
            maxLength={50}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="soloistLastName"
            label="Soloist Last Name"
            value={entity?.soloistLastName.value}
            isInvalid={entity?.soloistLastName.isInvalid}
            maxLength={50}
            {...defaultProps}
          />
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  );
}
