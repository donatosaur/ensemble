/* eslint-disable react/no-array-index-key */
import { useReducer, useState } from "react";
import {
  Form,
  Row,
  Dropdown,
  DropdownButton,
  Button,
  InputGroup,
  Col,
} from "react-bootstrap";

/**
 * Creates a search form for the Musicians table
 *
 * @param {Object} props
 * @param {function(): void} props.setSearchParameters
 * @returns {JSX.Element}
 */
export default function SearchForm({ setSearchParameters }) {
  const [searchOn, setSearchOn] = useState(null);
  const [dropdownTitle, setDropdownTitle] = useState("Select a field");
  const [musician, dispatch] = useReducer(
    // overwrite only the new fields that are passed in
    (oldEntityState, newEntityState) => ({ ...oldEntityState, ...newEntityState }),
    {
      id: "",
      birthdate: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      inEnsemble: 1,
      active: 1,
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  );

  // event handlers
  const handleDropdownOnClick = (event) => {
    setDropdownTitle(event.target.text);
    setSearchOn(event.target.id);
  };

  const handleOnChange = (event) => {
    dispatch({ [event.target.id]: event.target.value });  // slot the new value into the state
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSearchParameters({ [searchOn]: musician[searchOn] });
  };

  /* eslint-disable object-curly-newline */
  const searchFields = [
    { controlID: "id", label: "ID", type: "text", value: musician.id },
    { controlID: "birthdate", label: "Birthdate", type: "date", value: musician.birthdate },
    { controlID: "firstName", label: "First Name", type: "text", value: musician.firstName },
    { controlID: "lastName", label: "Last Name", type: "text", value: musician.lastName },
    { controlID: "email", label: "Email", type: "email", value: musician.email },
    { controlID: "phoneNumber", label: "Phone", type: "text", value: musician.phoneNumber },
    { controlID: "inEnsemble", label: "Ensemble?", type: "boolean", value: musician.inEnsemble },
    { controlID: "active", label: "Active?", type: "boolean", value: musician.active },
    { controlID: "street", label: "Street Address", type: "text", value: musician.street },
    { controlID: "city", label: "City", type: "text", value: musician.city },
    { controlID: "state", label: "State", type: "text", value: musician.state },
    { controlID: "zip", label: "Zip Code", type: "text", value: musician.zip },
  ];
  /* eslint-enable object-curly-newline */

  return (
    <Form>
      <Row className="entityForm">
        <Form.Label><h5>Search</h5></Form.Label>
      </Row>

      <Row>
        <InputGroup>
          {/* Display a dropdown button to select the field to search on */}
          <DropdownButton
            variant="outline-secondary"
            title={dropdownTitle}
            id="searchOnDropdown"
          >
            {searchFields.map((group, i) => (
              <Dropdown.Item
                key={i}
                id={group.controlID}
                onClick={handleDropdownOnClick}
              >
                {`By ${group.label}`}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          {/* Display the appropriate search input depending on what field has been selected */}
          {searchFields.map((group, i) => (
            searchOn === group.controlID
            && (
              <Form.Group
                key={i}
                as={Col}
                controlId={group.controlID}
              >
                { group.type === "boolean"
                  ? (
                    <Form.Select
                      value={group.value}
                      onChange={handleOnChange}
                    >
                      <option key={1} value={1}>Yes</option>
                      <option key={0} value={0}>No</option>
                    </Form.Select>
                  )
                  : (
                    <Form.Control
                      type={group.type}
                      value={group.value}
                      onChange={handleOnChange}
                    />
                  )}
              </Form.Group>
            )
          ))}

          {/* Display placeholder if no field has been selected */}
          {searchOn === null
            && (
              <Form.Group as={Col}>
                <Form.Control disabled type="text" />
              </Form.Group>
            )}

          <Button
            disabled={searchOn === null}
            variant="primary"
            type="submit"
            onClick={handleOnSubmit}
          >
            Search
          </Button>
        </InputGroup>
      </Row>

    </Form>
  );
}
