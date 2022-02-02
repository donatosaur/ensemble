import { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { entityFormReducer, entityFormInitializer } from "../../utils/reducers";
import { useEntity } from "../../hooks/useEntity";
import { SelectField } from "./FormComponents/Fields";
import { useGetInstrumentOptions, useGetMusicianOptions } from "../../hooks/useGetOptions";
import SpinnerButton from "./FormComponents/SpinnerButton";
import { generateDefaultProps } from "./helpers";

/**
 * Generates a form for CREATE operations.
 *
 * @param {Object} props
 * @param {Object} props.initialFormValues initial values to pass to entityFormReducer (see useentity?.js)
 * @returns {JSX.Element}
 */
export default function MusiciansInstrumentsForm({ initialFormValues }) {
  // get API calls from context hook and create reducer; dispatch signature is {field, value, isInvalid, modified}
  const { createEntity } = useEntity();
  const [entity, dispatch] = useReducer(entityFormReducer, initialFormValues, entityFormInitializer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const { musicianOptions, error: musicianError } = useGetMusicianOptions();
  const { instrumentOptions, error: instrumentError } = useGetInstrumentOptions();

  // if fetching musicians or instruments failed, let the user know
  useEffect(() => {
    if (!!musicianError || !!instrumentError) {
      setFormAlert(musicianError ?? instrumentError);
    }
  }, [musicianError, instrumentError]);

  // define validation checks
  const validate = new Map([
    ["musicianID", /./],       // required
    ["instrumentID", /./],     // required
  ]);
  const setIsInvalid = (field, value) => validate.has(field) && (!validate.get(field)?.test(`${value}`) ?? false);
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
    } else {
      void (async function submitForm() {
        try {
          const response = await createEntity(request);
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

  return (
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

      <Row xs={1} md={2}>
        <Col className="mb-3">
          <SelectField
            disabled={musicianOptions === null}
            name="musicianID"
            label="Musician"
            value={entity?.musicianID.value}
            isInvalid={entity?.musicianID.isInvalid}
            errorText="Please select a musician."
            {...defaultProps}
          >
            { musicianOptions ?? <option>Loading...</option>}
          </SelectField>
        </Col>
        <Col className="mb-3">
          <SelectField
            disabled={instrumentOptions === null}
            name="instrumentID"
            label="Instrument"
            value={entity?.instrumentID.value}
            isInvalid={entity?.instrumentID.isInvalid}
            errorText="Please select an instrument."
            {...defaultProps}
          >
            { instrumentOptions ?? <option>Loading...</option>}
          </SelectField>
        </Col>
      </Row>

      <SpinnerButton loading={loading} className="mt-4" variant="primary" type="submit" />
    </Form>
  );
}
