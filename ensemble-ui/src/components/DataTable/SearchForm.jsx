import React, { useReducer, useState } from "react";
import { Form, Row, Dropdown, DropdownButton, Button, InputGroup, Col } from "react-bootstrap";

/**
 * Creates a search form for the Musicians table
 *
 * @param setSearchParameters state hook
 * @returns {JSX.Element}
 
 */
export default function SearchForm({setSearchParameters}){
  const [searchOn, setSearchOn] = useState(null);
  const [searchTitle, setDropdownTitle] = useState("Select a field")

  const [musician, dispatch] = useReducer(
    // overwrite only the new fields that are passed in
    (oldEntityState, newEntityState) => ({...oldEntityState, ...newEntityState}),
    {
      birthdate: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      inEnsemble: "",
      active: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    }
  );

  const handleDropdownOnClick = (event) => {
    setDropdownTitle(event.target.text);
    setSearchOn(event.target.id);
  }

  const handleOnChange = (event) => {
    // slot the new value into the state
    dispatch({[event.target.id]: event.target.value});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSearchParameters({[searchOn]: musician[searchOn]});
  }

  // todo: placeholder for now to just generate the forms quickly for the demo
  const searchFields = [
    { controlID: "birthdate", label: "Birthdate", type: "date", value: musician['birthdate'] },
    { controlID: "firstName", label: "First Name", type: "text", value: musician['firstName'] },
    { controlID: "lastName", label: "Last Name", type: "text", value: musician['lastName'] },
    { controlID: "email", label: "Email", type: "email", value: musician['email'] },
    { controlID: "phoneNumber", label: "Phone", type: "text", value: musician['phoneNumber'] },
    { controlID: "inEnsemble", label: "Ensemble?", type: "boolean", value: musician['inEnsemble']},
    { controlID: "active", label: "Active?", type: "boolean", value: musician['active'] },
    { controlID: "street", label: "Street Address", type: "text", value: musician['street'] },
    { controlID: "city", label: "City", type: "text", value: musician['city'] },
    { controlID: "state", label: "State", type: "text", value: musician['state'] },
    { controlID: "zip", label: "Zip Code", type: "text", value: musician['zip'] },
  ]

  return (

    <Form>
      <Row className="entityForm" >
        <Form.Label><h5>Search</h5></Form.Label>
      </Row>

      <Row>
        <InputGroup>
          <DropdownButton
            variant="outline-secondary"
            title={searchTitle}
            id="searchOnDropdown"
          >
            {
              searchFields.map( (group, index) => (
                <Dropdown.Item
                  key={index}
                  id={group.controlID}
                  onClick={handleDropdownOnClick}
                >
                  {`By ${group.label}`}
                </Dropdown.Item>
              ))
            }
          </DropdownButton>

          { searchFields.map( (group, index) => (
            searchOn === group.controlID &&
            <Form.Group
              key={index}
              as={Col}
              controlId={group.controlID}>
                { group.type === 'boolean'
                  ? <Form.Select
                    value={group.value}
                    onChange={handleOnChange}
                  >
                    <option key={2} value={""}/>
                    <option key={1} value={true}>Yes</option>
                    <option key={0} value={false}>No</option>
                  </Form.Select>
                  : <Form.Control
                    type={group.type}
                    value={group.value}
                    onChange={handleOnChange}
                  />
                }
              </Form.Group>
          ))
          }

          {searchOn === null &&
            <Form.Group as={Col}>
              <Form.Control disabled type="text"/>
            </Form.Group>
          }

          <Button
            disabled={searchOn === null}
            variant="secondary"
            type="submit"
            onClick={handleOnSubmit}
          >
            Search
          </Button>
        </InputGroup>
      </Row>

    </Form>
  )
}
