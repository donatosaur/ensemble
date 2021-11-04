import {cloneDeep, mapValues} from "lodash";

/**
 * Returns a function that takes a new editModel (newModel), injects any values that are missing into the
 * edit model (by pulling them from the editedRows map). Intended to be used with React.useCallback so that
 * unnecessary rerenders are avoided.
 *
 * @param setEditRowsModel function that sets the editRowsModel state hook
 * @param editedRows {Map<String, Object>} map of rowID -> editedState
 * @returns {(function(*): void)}
 */
export function useHandleEditRowsModelChange(editedRows, setEditRowsModel) {
  return (newModel) => {
    // copy to avoid callbacks firing on the original while we modify it
    const updatedModel = {...newModel};

    // this is going to be O(nm) where n = rows in edit model and m = keys in each row, but there are so few
    // keys that the performance impact on editing should be marginal; something to keep in mind
    Object.keys(updatedModel).forEach((id) => {
      // iterate over the properties (cells) of the row that was changed
      for (const key in updatedModel[id]) {
        // empty string -> null; undefined -> null
        if (updatedModel[id][key]['value'] === undefined || updatedModel[id][key]['value'] === '') {
          updatedModel[id][key]['value'] = null;
        }
      }
      // flatten the rows in the edit model to match the Row format, e.g. {name, birthdate, ...}
      // insert the row id (which must be in the row object to match the expected mui row obj spec)
      // and note that this row was edited
      const flattenedRow = mapValues(updatedModel[id], 'value');
      const idAsString = id.toString();

      // find the row being edited and insert the newly updated values
      editedRows.set(idAsString, {...editedRows.get(idAsString), ...flattenedRow});

    });
    setEditRowsModel(updatedModel);
  }
}


/**
 * Returns a closure that handles rowEditStart by adding the row being edited (in editedRows) to
 * OriginalRowStates if it's not already present there
 * @param originalRows {Map<String, Object>} map of rowID -> originalState
 * @param editedRows {Map<String, Object>} map of rowID -> editedState
 * @returns {(function(*=): void)}
 */
export function useHandleRowEditStart(originalRows, editedRows) {
  return (params) => {
    console.log('params', params);
    const rowID = params.id.toString();
    console.log(`EDIT START fired on row ${rowID}`);

    // save the original state of this row (if we haven't done so before)
    if (!originalRows.has(rowID)) {
      originalRows.set(rowID, cloneDeep(params.row));
      console.log(`Original state recorded for row ${rowID}`);
    }
    console.log(editedRows);
    // we're editing a row (it's the responsibility of the stop handler to determine whether it was modified)
    editedRows.set(rowID, params.row);
  };
}


/**
 * Returns a closure that handles rowEditStop by checking whether the row being edited was changed (comparing
 * its state in originalRowStates to that in editedRows) and removing it from editedRows if not.
 * @param originalRows {Map<String, Object>} map of rowID -> originalState
 * @param editedRows {Map<String, Object>} map of rowID -> editedState
 * @returns {(function(*): void)}
 */
export function useHandleRowEditStop(originalRows, editedRows) {
  return (params) => {
    const rowID = params.id.toString();
    console.log(`EDIT STOP fired on row ${rowID}`);

    /**
     * There are some inconsistencies with the timing for this event firing for clicks and keypress. Sometimes,
     * the event first on keypress before params.row is updated to reflect the cell value where the keypress
     * was made. For safety, we should rely on the editedRows map and not params.row if we can help it.
     */
    if (editedRows.has(rowID)) {
      // get the edited and original row states
      const editedRow = editedRows.get(rowID);
      const originalRow = originalRows.get(rowID);

      // determine whether any value has changed from its original value
      let anyValueChanged = false;
      for (const [key, value] of Object.entries(originalRow)) {
        // if the value somehow never made it into the edit model, pull it from the original
        if (editedRow[key] === undefined) {
          editedRow[key] = cloneDeep(value);
        }

        // check whether this value differs from the original
        let valueChanged = editedRow[key] instanceof Date
          ? editedRow[key].getTime() !== value.getTime()
          : editedRow[key] !== value;
        if (valueChanged) {
          anyValueChanged = true;
        }
      }
      // if nothing changed, the row's state is no longer "edited"
      if (!anyValueChanged) {
        editedRows.delete(rowID);
        console.log(`Removing row ${rowID} from editedRows`)
      }
    } else {
      // fallback, but we really should never get here
      editedRows.set(rowID, {...editedRows.get(rowID), ...params.row});
      console.warn('row being edited was never saved to originalRowStates');
    }
  }
}
