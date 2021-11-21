// For these data types, we want to match the regex values before attempting to reformat so that we may fall back
// to the original values instead of parsing data that is formatted in an unexpected way, preventing data loss

export const valueFormatter = new Map(
  [
    // phoneNumber parser (to display phone numbers in a more easily readable (###) ####-#### format)
    ["phoneNumber", (value) => {
      let valueAsString = value?.toString();
      return (
        /^\d{10}$/.test(valueAsString)
        ? `(${valueAsString.slice(0, 3)}) ${valueAsString.slice(3, 6)}-${valueAsString.slice(6, 10)}`
        : value
      );
    }],
    // display booleans as check or x
    ["boolean", (value) => (
      !!value
        ? <h4><i className="bi bi-check2 text-success" /></h4>
        : <h4><i className="bi bi-x text-muted" /></h4>
    )],
    // ["dateTime", { type:"string" }],
  ]
);
