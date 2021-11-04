import React from "react";
import {Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import UpdateFormProvider from "./UpdateFormProvider";


/**
 * Generates an update form based on the passed in MUI column spec
 *
 * @param columns {array} an array of columns to build search parameters on, formatted to MUI spec
 * @param updateParameters update parameters prefilled
 * @param setUpdateParameters a function that updates the updateParameters state hook
 * @returns {JSX.Element}
 */
export default function UpdateForm({ columns, updateParameters, setUpdateParameters }) {

  return (
    <>
      <Form>
        <Row className="entityForm">
          <Form.Label>Update</Form.Label>
        </Row>

        <Row className="entityForm" xs={1} sm={2} xl={3}>
        {
          columns.map(
            (column) => {
              if (column.searchable === false) return null;

              return(
                <>
                  <Form.Group as={Col} controlId={column.field} className="entityForm">
                    <FloatingLabel controlId={column.field} label={column.headerName}>
                      <UpdateFormProvider
                        onChange={setUpdateParameters}
                        value={updateParameters[column.field]}
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
            Commit
        </Button>
      </Form>

    </>
  );
}
