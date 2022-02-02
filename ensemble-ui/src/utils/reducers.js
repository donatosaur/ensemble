/**
 * @module reducers
 * This module contains helper functions intended to be used with a useReducer hook for each entity's form.
 */

/**
 * @typedef {Object} entityState
 */

/**
 * Reducer to be used in forms.
 *
 * @param {Object} entityState original form state
 * @param {Object} newState
 * @param {string} newState.field name (key) of the field to update
 * @param {any} [newState.value] the new value of the field
 * @param {boolean} [newState.isInvalid] true if the value is invalid (to display error messages)
 * @param {boolean} [newState.modified] should be set to true onBlur
 * @returns {Object}
 */
export const entityFormReducer = (entityState, newState) => {
  const {
    field,
    value,
    isInvalid,
    modified,
  } = newState;

  // override any old values, filling in missing key-value pairs with their original values
  const newFieldState = {
    [field]: {
      value: value ?? entityState[field].value,
      isInvalid: isInvalid ?? entityState[field].isInvalid,
      modified: modified ?? entityState[field].modified,
    },
  };
  return { ...entityState, ...newFieldState };
};

/**
 * Initializer to be used for form reducers.
 * See {@link https://reactjs.org/docs/hooks-reference.html#lazy-initialization React Documentation}
 *
 * @param {Object} initialEntityValues object with initial field-value pairs
 * @returns {Object}
 */
export const entityFormInitializer = (initialEntityValues) => {
  // construct an appropriately-initialized object from the passed field-value pairs; coerce null to empty string
  const initializedEntity = {};
  Object.entries(initialEntityValues).forEach(([field, value]) => {
    initializedEntity[field] = { value: value ?? "", isInvalid: false, modified: false };
  });
};
