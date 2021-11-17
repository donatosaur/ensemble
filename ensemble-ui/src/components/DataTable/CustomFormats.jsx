// see https://mui.com/components/data-grid/columns/#column-types
// and https://mui.com/api/data-grid/grid-col-def/


// For these data types, we want to match the regex values before attempting to reformat so that we may fall back
// to the original values instead of parsing data that is formatted in an unexpected way, preventing data loss
const customDataTypes = new Map(
  [
    // phoneNumber parser (to display phone numbers in a more easily readable (###) ####-#### format)
    ["phoneNumber", { type:"string", valueGetter: ({ value }) => {
      if (value === null) return;
      let valueAsString = value.toString();
      console.log(value);
      return valueAsString.match(/^\d{10}$/)  // exactly 10 digits
        ? `(${valueAsString.slice(0, 3)}) ${valueAsString.slice(3, 6)}-${valueAsString.slice(6, 10)}`
        : value;
    }}],
    // ["dateTime", { type:"string" }],
  ]
);

export default customDataTypes;
