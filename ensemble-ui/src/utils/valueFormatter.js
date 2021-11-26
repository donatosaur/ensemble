/**
 * Formats field values for table. For these data types, we want to make sure they're valid before we actually
 * return their formatted values; if they're not (e.g. the phone number fails a regex check or the date isn't
 * actually a date for some reason), we can just fall back to the original values so that no data is lost
 */
export const valueFormatter = new Map(
  [
    // phoneNumber parser: display phone numbers in a more easily readable (###) ####-#### format
    ["phoneNumber", (value) => {
      let valueAsString = value?.toString();
      return (
        /^\d{10}$/.test(valueAsString) // check that the string is *exactly* 10 digits long
        ? `(${valueAsString.slice(0, 3)}) ${valueAsString.slice(3, 6)}-${valueAsString.slice(6, 10)}`
        : value
      );
    }],
    // boolean parser: true to checkmark; false to x
    ["boolean", (value) => (
      !!value
        ? <h4><i className="bi bi-check2 text-success" /></h4>
        : <h4><i className="bi bi-x text-muted" /></h4>
    )],
    // date parser: display dates in local date format; for options see {@link https://mzl.la/3FNrBwB}
    ["date", (value) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
      const valueAsDate = new Date(value);
      return valueAsDate.toLocaleDateString() !== 'Invalid Date' 
        ? valueAsDate.toLocaleDateString('en-us', options)
        : value;
    }],
    // dateTime parser: display dateTime in local time format; for options see {@link https://mzl.la/3FNrBwB}
    ["dateTime", (value) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
      const valueAsDate = new Date(value);
      return valueAsDate.toLocaleString() !== 'Invalid Date' 
        ? valueAsDate.toLocaleString('en-us', options)
        : value;
    }]
  ]
);
