/**
 * Creates a function that returns true only if the input is INVALID based on the following criteria:
 *   - the field was modified at least once AND
 *   - there is a **valid** regex check defined on the field (this is why we null coalesce to false) AND
 *   - the regex check fails (because the regex is defined on valid states)
 *
 * @param {Map} validationMap a map of key: regex pairs
 * @returns {function(string, string): boolean} a validation function
 */
export function generateSetIsInvalid(validationMap) {
  return (field, value) => validationMap.has(field) && (!validationMap.get(field)?.test(`${value}`) ?? false);
}

/**
 * Constructs default props for the entity (onBlur & onChange)
 * @param {object} entity key-value pairs representing the entity
 * @param {function(string, string)} setIsInvalid function returned by {@link generateSetIsInvalid}
 * @param {function} dispatch a dispatch function for the entity
 * @returns {object} default props for the entity
 */
// eslint-disable-next-line import/prefer-default-export
export function generateDefaultProps(entity, setIsInvalid, dispatch) {
  return {
    onBlur: (event) => dispatch({
      field: event.target.name,
      isInvalid: setIsInvalid(event.target.name, event.target.value),
      modified: true,
    }),
    onChange: (event) => dispatch({
      field: event.target.name,
      value: event.target.type === "checkbox" ? event.target.checked : event.target.value,
      isInvalid: entity[event.target.name].modified && setIsInvalid(event.target.name, event.target.value),
    }),
  };
}
