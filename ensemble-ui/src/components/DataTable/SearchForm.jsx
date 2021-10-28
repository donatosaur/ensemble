import React from "react";
import {Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import SearchFormControlProvider from "./SearchFormControlProvider";


/**
 * Generates a search form based on the passed in MUI column spec
 *
 * @param columns an array of columns to build search parameters on, formatted to MUI spec
 * @param setSearchParameters a function that updates the searchParameters array state hook
 * @returns {JSX.Element}
 * @constructor
 */
export default function SearchForm({ columns, setSearchParameters }) {

  return (
    <>
      <Form>
        <Row className="entityForm">
          <Form.Label>Search</Form.Label>
        </Row>

        <Row className="entityForm" xs={1} sm={2} xl={3}>
        {
          columns.map(
            (column) => {
              return(
                <>

                  <Form.Group as={Col} controlId={column.field} className="entityForm">
                    <FloatingLabel controlId={column.field} label={column.headerName}>
                      <SearchFormControlProvider
                        onChange={() => {}} // todo
                        columnType={column.type}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </>
              );
            }
          )
        }
        </Row>

        <Button className="formButton" variant="primary" type="submit">
            Search
        </Button>
      </Form>

    </>
  );
}
