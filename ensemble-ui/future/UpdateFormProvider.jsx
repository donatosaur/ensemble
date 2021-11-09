// import React from "react";
// import {Form} from "react-bootstrap";
// import Datetime from 'react-datetime';
//
//
// /**
//  * Providers
//  *
//  * @param columnType Mui Column Type {@link https://mui.com/components/data-grid/columns/#column-types}
//  * @param value value of the form
//  * @param setValue function that updates the appropriate state hook on change
//  * @constructor
//  */
// export default function UpdateFormProvider({ columnType, formKey, disabled, value, handleOnChange }) {
//   switch (columnType) {
//     case "actions":
//       // these columns only hold action buttons
//       return null;
//     case "singleSelect":
//       // we shouldn't have any of these
//       return null;
//     case 'dateTime':
//       return (
//         // TODO
//         <Datetime
//           dateFormat="YYYY-MM-DD"
//           key={formKey}
//           value={value}
//           timeFormat={true}
//           disabled={disabled}
//           onChange={handleOnChange}
//         />
//       );
//     case 'date':
//       return (
//         <Form.Control
//           type="date"
//           key={formKey}
//           value={value}
//           disabled={disabled}
//           onChange={handleOnChange}
//         />
//       );
//     case 'number':
//       return (
//         <Form.Control
//           type="number"
//           key={formKey}
//           value={value}
//           disabled={disabled}
//           onChange={handleOnChange}
//         />
//       );
//     case 'boolean':
//       return (
//         <Form.Check
//           className="entityFormCheckbox"
//           type="checkbox"
//           key={formKey}
//           checked={value}
//           disabled={disabled}
//           onChange={(event) => {
//           handleOnChange(event);
//           }}
//         />
//       )
//     default:  // mui column spec defaults type to "text" when it's not defined
//       return (
//         <Form.Control
//           type="text"
//           key={formKey}
//           value={value}
//           disabled={disabled}
//           onChange={handleOnChange} />
//       );
//     }
// }
