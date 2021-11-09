// import React from "react";
// import {Form} from "react-bootstrap";
// import Datetime from 'react-datetime';
//
//
// /**
//  * Providers
//  *
//  * @param columnType Mui Column Type {@link https://mui.com/components/data-grid/columns/#column-types}
//  * @param onChange function that updates the appropriate state hook on change
//  * @param key
//  * @constructor
//  */
// export default function SearchFormControlProvider({ columnType, onChange, formKey }) {
//   switch (columnType) {
//     case "actions":
//       return null;
//     case "singleSelect":
//       return null; // todo: we don't have these for now
//     case 'dateTime':
//       return (
//         <>
//           {/* TODO */}
//           <Datetime key={formKey} dateFormat="YYYY-MM-DD" timeFormat={true} onChange={onChange} />
//         </>
//       );
//     case 'date':
//       return (
//         <>
//           <Form.Control key={formKey}  type="date" onChange={onChange} />
//         </>
//       );
//     case 'number':
//       return (
//         <>
//         {/* TODO */}
//         {/*<Form.Select defaultValue="Choose...">*/}
//         {/*  <option>{`<`}</option>*/}
//         {/*  <option>{`<=`}</option>*/}
//         {/*  <option>{`=`}</option>*/}
//         {/*  <option>{`!=`}</option>*/}
//         {/*  <option>{`>`}</option>*/}
//         {/*  <option>{`>=`}</option>*/}
//         {/*</Form.Select>*/}
//         <Form.Control key={formKey}  type="number" onChange={onChange} />
//       </>
//       );
//     case 'boolean':
//       return (
//         <>
//           <Form.Check key={formKey} className="entityFormCheckbox" type="checkbox" onChange={onChange}/>
//         </>
//       )
//     default:  // mui column spec defaults type to "text" when it's not defined
//       return (
//         <>
//         <Form.Control key={formKey} type="text" />
//         </>
//       );
//     }
// }
