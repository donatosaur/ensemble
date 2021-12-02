/**
 * @module reducers
 * This module contains helper functions intended to be used with a useReducer hook for each entity's form.
 */

/**
 * Reducer to be used in forms.
 * See {@link https://reactjs.org/docs/hooks-reference.html#usereducer React Documentation}
 *
 * @param {Object} entityState original form state
 * @param {Object} newState
 * @param {string} newState.field name (key) of the field to update
 * @param {any} [newState.value] the new value of the field
 * @param {boolean} [newState.isInvalid] true if the value is invalid (to display error messages)
 * @param {boolean} [newState.modified] should be set to true onBlur
 */
export const entityFormReducer = (entityState, { field, value, isInvalid, modified }) => {
  // override any old values, filling in missing key-value pairs with their original values...
  const newFieldState = {
    [field]: {
      value: value ?? entityState[field].value,
      isInvalid: isInvalid ?? entityState[field].isInvalid,
      modified: modified ?? entityState[field].modified,
    }
  }
  // ... and return a new state with the field's values overridden
  return {...entityState, ...newFieldState};
}

/**
 * Initializer to be used for form reducers.
 * See {@link https://reactjs.org/docs/hooks-reference.html#lazy-initialization React Documentation}
 *
 * @param {Object} initialEntityValues object with initial field-value pairs
 */
export const entityFormInitializer = (initialEntityValues) => {
  // construct an appropriately-initialized object from the passed-in field-value pairs
  const initializedEntity = {};
  for (const [field, value] of Object.entries(initialEntityValues)) {
    // coerce null values to empty string; react controlled forms require all form values to be not nullish
    initializedEntity[field] = { value: value ?? '', isInvalid: false, modified: false }
  }
  return initializedEntity;
}
