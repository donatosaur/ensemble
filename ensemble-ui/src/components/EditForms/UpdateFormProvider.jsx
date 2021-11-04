import React from "react";
import {Form} from "react-bootstrap";
import Datetime from 'react-datetime';


/**
 * Providers
 *
 * @param columnType Mui Column Type {@link https://mui.com/components/data-grid/columns/#column-types}
 * @param value value of the form
 * @param setValue function that updates the appropriate state hook on change
 * @constructor
 */
export default function UpdateFormProvider({ columnType, value, setValue }) {
  // const onChange = (field, value) => {
  //   setUpdateParameters(
  //     {...updateParameters, ...{field: value}}
  //   )
  // }
  // for now, do nothing
  const onChange = () => {}

  switch (columnType) {
    case "actions":
      return null;
    case "singleSelect":
      return null; // todo: we don't have these for now
    case 'dateTime':
      return (
        <>
          {/* TODO */}
          <Datetime dateFormat="YYYY-MM-DD" value={value} timeFormat={true} onChange={setValue} />
        </>
      );
    case 'date':
      return (
        <>
          <Form.Control type="date" value={value} onChange={setValue} />
        </>
      );
    case 'number':
      return (
        <>
        {/* TODO */}
        {/*<Form.Select defaultValue="Choose...">*/}
        {/*  <option>{`<`}</option>*/}
        {/*  <option>{`<=`}</option>*/}
        {/*  <option>{`=`}</option>*/}
        {/*  <option>{`!=`}</option>*/}
        {/*  <option>{`>`}</option>*/}
        {/*  <option>{`>=`}</option>*/}
        {/*</Form.Select>*/}
        <Form.Control type="number" value={value} onChange={setValue} />
      </>
      );
    case 'boolean':
      return (
        <>
          <Form.Check className="entityFormCheckbox" type="checkbox" checked={value} onChange={setValue}/>
        </>
      )
    default:  // mui column spec defaults type to "text" when it's not defined
      return (
        <>
        <Form.Control value={value} onChange={setValue} type="text" />
        </>
      );
    }
}
