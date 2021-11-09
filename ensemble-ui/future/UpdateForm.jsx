// import React from "react";
// import {Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
// import UpdateFormProvider from "./UpdateFormProvider";
//
//
// /**
//  * Generates a form for use with UPDATE queries, based on the MUI column spec located in src/data/entityConfig.json.
//  * Each column entity produces a form input element based on the type of the column data, with its corresponding
//  * field. The field names here will always match what is expected by the backend.
//  *
//  *
//  *
//  * @param columns {array} an array of columns to build search parameters on, formatted to MUI spec, used to generate
//  *                        the form input elements dynamically
//  * @param updateParameters an object that holds all the fields that should be prefilled with data. these correspond to
//  *                         the respective SQL table column names for a particularly entity.
//  * @param setUpdateParameters a function that updates the updateParameters state hook
//  * @returns {JSX.Element}
//  * @constructor
//  */
// export default function UpdateForm({ columns, updateParameters, setUpdateParameters }) {
//
//   const handleOnSubmit = (event) => {
//     event.preventDefault();
//     console.log(updateParameters);
//   }
//
//   return (
//     <>
//       <Form>
//         <Row className="entityForm">
//           <Form.Label>Update</Form.Label>
//         </Row>
//
//         <Row className="entityForm" xs={1} sm={2} xl={3}>
//         {
//           // map each column field to an input form field (excluding any internally used row id columns that
//           // are marked unsearchable; for example, the row id for the entity table, which is only used to provide
//           // a unique key for the html element and doesn't correspond to anything meaningful)
//           columns.map(
//             (column) => {
//               if (column.searchable === false) return null;
//
//               return(
//                 <Form.Group
//                   as={Col}
//                   key={column.field}
//                   controlId={column.field}
//                   className="entityForm"
//                 >
//                   <FloatingLabel
//                     key={column.field}
//                     controlId={column.field}
//                     label={column.headerName}
//                   >
//                     <UpdateFormProvider
//                       disabled={!column.editable}
//                       formKey={column.field}
//                       handleOnChange={(event) => {
//                        setUpdateParameters(
//                          {...updateParameters, [column.field]: event.target.value}
//                        );
//                       }}
//                       value={updateParameters[column.field]}
//                       columnType={column.type}
//                     />
//                   </FloatingLabel>
//                 </Form.Group>
//               );
//             }
//           )
//         }
//         </Row>
//
//         <Button className="formButton" variant="primary" type="submit" onClick={handleOnSubmit}>
//             Commit
//         </Button>
//       </Form>
//
//     </>
//   );
// }
