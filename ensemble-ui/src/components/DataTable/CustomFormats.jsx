
// see https://mui.com/components/data-grid/columns/#column-types
// and https://mui.com/api/data-grid/grid-col-def/


// For these data types, we want to match the regex values before attempting to reformat, and to fall back
// to the passed value if there is no match; this will let us handle cases where data is either formatted
// in an unexpected way (unlikely) or is represented as an empty string (more likely) without losing data
const customDataTypes = new Map(
  [
    // phoneNumber definition
    ["phoneNumber", { type:"string", valueFormatter: ({ value }) => {
      let valueAsString = value.toString();
      return valueAsString.match(/^\d{10}$/)  // exactly 10 digits
        ? `(${valueAsString.slice(0, 3)}) ${valueAsString.slice(3, 6)}-${valueAsString.slice(6, 10)}`
        : value;
    }}],
    // zip code definition
    ["zipCode", { type:"string", valueFormatter: ({ value }) => {
        let valueAsString = value.toString();
        return valueAsString.match(/^\d{1,5}$/) // 1 to 5 digits only
          ? valueAsString.padStart(5, "0")
          : value;
      }}],
    // display date and dateTime as strings
    ["date", { type:"string" }],
    ["dateTime", { type:"string" }],
  ]
);

export default customDataTypes;
