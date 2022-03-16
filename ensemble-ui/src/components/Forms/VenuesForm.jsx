import { useReducer, useState } from "react";
import {
  Col,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEntity } from "../../hooks/useEntity";
import { entityFormInitializer, entityFormReducer } from "../../utils/reducers";
import { InputField } from "./FormComponents/Fields";
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
export default function VenuesForm({ initialFormValues, mode }) {
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity, updateEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  // define validation checks
  const validate = new Map([
    ["capacity", /^\d+$/],         // required; digits only
    ["name", /./],                 // required
    ["street", /./],               // required
    ["city", /./],                 // required
    ["state", /./],                // required
    ["zip", /^\d{5}$/],            // exactly five digits
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
    setLoading(false);  // no matter what, we should return the button to its "not loading" state
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
        { mode === "update"
          && (
            <Col className="mb-3" xs={2}>
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

        <Col className="mb-3" xs={4}>
          <InputField
            name="capacity"
            label="Capacity"
            type="number"
            min="0"
            value={entity?.capacity.value}
            isInvalid={entity?.capacity.isInvalid}
            errorText="Please enter an unsigned integer value."
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3">
          <InputField
            name="name"
            label="Venue Name"
            value={entity?.name.value}
            isInvalid={entity?.name.isInvalid}
            errorText="Please enter the venue's name."
            maxLength={100}
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
            value={entity?.street.value}
            isInvalid={entity?.street.isInvalid}
            errorText="Please enter a street address."
            maxLength={100}
            {...defaultProps}
          />
        </Col>
      </Row>

      <Row xs={1}>
        <Col className="mb-3" lg={7}>
          <InputField
            name="city"
            label="City"
            value={entity?.city.value}
            isInvalid={entity?.city.isInvalid}
            errorText="Please enter a city."
            maxLength={50}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3" xs={4} lg={2}>
          <InputField
            name="state"
            label="State"
            value={entity?.state.value}
            isInvalid={entity?.state.isInvalid}
            errorText="Please enter a state."
            maxLength={2}
            {...defaultProps}
          />
        </Col>
        <Col className="mb-3" xs={8} lg={3}>
          <InputField
            name="zip"
            label="Zip Code"
            type="tel"
            value={entity?.zip.value}
            isInvalid={entity?.zip.isInvalid}
            errorText="Please enter exactly 5 digits."
            maxLength={5}
            {...defaultProps}
          />
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  );
}
