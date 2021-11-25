import React, { useEffect, useState } from "react";
import { Container, Table } from 'react-bootstrap';
import { cloneDeepWith } from "lodash";

// button components for custom actions cell
import EditButton from "./ActionButtons/EditButton";
import DeleteButton from "./ActionButtons/DeleteButton";

// other components and hooks
import ConfirmationModal from "../ConfirmationDialog";
import { useEntity } from "../../hooks/useEntity";

// search form for enabled entities
import SearchForm from "./SearchForm";
import Toolbar from './Toolbar';

import { valueFormatter } from '../../utils/valueFormatter';
import { useHistory } from 'react-router-dom';

// demo data loader for frontend debugging
// import entityDemoDataMap from "../../data/entityDemoDataMap";
// const getDemoData = async () => entityDemoDataMap.has(entityName) ? entityDemoDataMap.get(entityName) : [];

/**
 * Creates a Data Table for an Entity using the passed in props
 *
 * @param setCreateFormOpen a function that toggles the display state of the EntityForm
 * @param setEditFormOpen a function that toggles the display state of the EntityForm
 * @param [setEditFormValues] a function that sets the initial state of the edit form; pass nothing to disable edit
 * @param allowSearch {boolean} whether search is enabled for this table
 * @returns {JSX.Element}
 
 */
export default function DataTable({
  setCreateFormOpen,
  setEditFormOpen,
  setEditFormValues,
  allowSearch,
}) {
  /* ------------------------------------------ State Hooks ------------------------------------------ */
  // get the column definitions and api caller from the entity context
  const { fields, getEntity, deleteEntity, deleteParamsAsFields } = useEntity();
  const history = useHistory();

  // state hook for delete confirmation; *null* this to turn off the dialog box
  const [deleteParams, setDeleteParams] = useState(null);

  // state and reducer hooks for search panels
  const [searchParameters, setSearchParameters] = useState(null);
  const [alertContent, setAlertContent] = useState(null);

  // data model
  const [rows, setRows] = useState([]);



  /* ------------------------------------------ Effect Hooks ------------------------------------------ */
  // get data on page load (and whenever a change is successfully made)
  useEffect(() => {
    // if (!fetchNewData) return;                     // safety: fetching and rendering rows is expensive
    const abortController = new AbortController();   // to abort async requests
    console.log('Fetching new data...');
    void async function getData() {
      try {
        // get the rows and set the data model
        let rowData = !!searchParameters ? await getEntity(searchParameters) : await getEntity();
        setRows(rowData);
        // setFetchNewData(false);
      } catch (error) {
        console.warn(error);
        setAlertContent(error);  // todo: placeholder; push alert onto stack
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, [getEntity, setRows, searchParameters]);

  /* ------------------------------------------- Action Cell ------------------------------------------- */
  const ActionCell = ({rowIndex}) => {
    return (
      <td key={rowIndex}>
        { setEditFormValues &&
          <EditButton onClick={() => {

            // make sure a row index was actually passed; if it was not, log it and stop
            if (rowIndex === null || rowIndex === undefined) {
              console.error('Edit button pressed, but row not found!');
              return;
            }

            // get a deep copy for safety: we want to avoid modifying the original row's underlying data
            try {
              setEditFormValues(cloneDeepWith(rows[rowIndex], (value, key, object) => {
                if (value === null) {
                  object[key] = '';
                }
              }));
            } catch (error) {
              console.error(error)  // we should never get here; passing a null/undefined value should disable edits
            }

            // we should only have one form open at any one time
            setCreateFormOpen(false);
            setEditFormOpen(true);
            }}
          />
        }

        <DeleteButton onClick={() => {
          // close other forms
          setCreateFormOpen(false);
          setEditFormOpen(false);

          // make sure a row index was actually passed; if it was not, log it and stop
          if (rowIndex === null || rowIndex === undefined) {
            console.error('Delete button pressed, but row not found!');
            return;
          }
          // get the correct parameters to pass to deleteEntity
          const deleteParams = deleteParamsAsFields?.map(field => rows[rowIndex]?.[field]);
          console.log(`Setting delete to fields ${deleteParamsAsFields} as ${deleteParams}...`);
          setDeleteParams(deleteParams);
        }}
        />
      </td>
    );
  }


  /* ----------------------------------- Delete Confirmation Dialogue ------------------------------------- */
  const handleCancel = () => setDeleteParams(null);  // this will close the ConfirmationModal
  const handleDelete = async () => {
    try {
      const response = await deleteEntity(...deleteParams);
      console.log(response);
      // refresh the page; history[0] is the current path
      history.go(0);
    } catch (error) {
      console.warn(error);
      setAlertContent(error);  // todo: placeholder; push alert onto stack
    } finally {
      setDeleteParams(null);
    }
  }

  const DeleteConfirmation = () => {
    return (
      <ConfirmationModal
        show = {deleteParams !== null}
        title = {"Confirm Delete"}
        description = {`Are you sure you want to delete the entity with ${deleteParamsAsFields}=${deleteParams}?`}
        cancelButtonText = {"Cancel"}
        confirmButtonText = {"Confirm"}
        handleCancel = {handleCancel}
        handleConfirm = {handleDelete}
      />
    );
  }


  /* ------------------------------------- Toolbar Event Handlers ---------------------------------------- */
  const handleAddButtonClick = (event) => {
    event.preventDefault();
    setCreateFormOpen(true);               // toggle add form
    setEditFormOpen(false);            // only one form panel open at a time
  }

  const handleDensityButtonClick = null;  // todo: disabled for now

  /* -------------------------------------------- Data Table -------------------------------------------- */
  return (
    <>
      <Toolbar
        handleAddButtonClick={handleAddButtonClick}
        handleDensityButtonClick={handleDensityButtonClick}
      />

      {/*{ rows && <VirtualizedTable*/}
      {/*   // actions = {ActionCell}*/}
      {/*   tableProps={{*/}
      {/*     className: "mt-2",*/}
      {/*     hover: true,*/}
      {/*     bordered: false,*/}
      {/*   }}*/}
      {/*    rows={rows}*/}
      {/*    fields={fields}*/}
      {/*/>}*/}

      <Table responsive className="mt-2" bordered striped size="lg">
        <thead>
        <tr>
          { fields.map((field, i) => <td key={i}>{field?.columnConfig?.headerName}</td>) }
          <td key={fields.length} children={"Actions"} />
        </tr>
        </thead>

        {/* Rows */}
        <tbody>
        { rows.map((row, index) => (
          <tr key={index}>
            {fields.map((column, i) => (
              <td key={i}>
                { valueFormatter.has(column.type)
                  ? valueFormatter.get(column.type)(row[column.field])
                  : row[column.field] }
              </td>
            ))}
            <ActionCell rowIndex={index} />
          </tr>
        ))
        }
        </tbody>

        {/* Footer */}
      </Table>

      {/* Render Delete Confirmation Dialogue */}
      <DeleteConfirmation />

      {/* Render Search Panel */}
      { allowSearch &&
          <Container className="entityFormContainer">
            <SearchForm setSearchParameters={setSearchParameters} />
          </Container>
      }

    </>
  );
}
