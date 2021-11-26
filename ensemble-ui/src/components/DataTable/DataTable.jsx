import React, { useEffect, useState } from "react";
import { Container, Table, Alert } from 'react-bootstrap';
import { cloneDeepWith } from "lodash";

// button components for custom actions cell
import EditButton from "./ActionButtons/EditButton";
import DeleteButton from "./ActionButtons/DeleteButton";

// other components and hooks
import ConfirmationModal from "../ConfirmationDialog";
import Pagination from "./TablePagination";
import { useEntity } from "../../hooks/useEntity";

// search form for enabled entities
import SearchForm from "./SearchForm";
import Toolbar from './Toolbar';

import { valueFormatter } from '../../utils/valueFormatter';
import { useHistory } from 'react-router-dom';


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

  const [searchParameters, setSearchParameters] = useState(null); // search query parameters for API call
  const [deleteParams, setDeleteParams] = useState(null);         // params for delete; *null* to hide modal
  const [alertContent, setAlertContent] = useState(null);         // alert above table; *null* to hide alert
  const [pageSize, setPageSize] = useState(10);                   // pages per row
  const [currentPage, setCurrentPage] = useState(1);              // current page
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
      <td key={rowIndex} className="text-nowrap">
        {/* If UPDATE is allowed, sets the correct row value for the form to obtain data and opens the form */}
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
        {/* Button for DELETE; sets the correct params and opens a modal */}
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


  /* ------------------------------------- Delete Confirmation Modal -------------------------------------- */
  const handleDelete = async () => {
    try {
      const response = await deleteEntity(...deleteParams);
      console.log(response);
      history.go(0);  // refresh the page; history[0] is the current path
    } catch (error) {
      console.warn(error);
      setAlertContent('That entity could not be deleted. Please delete any many-to-many relationships first.');
      console.log(error.sqlMessage ?? error);
    } finally {
      setDeleteParams(null);
    }
  }
  const DeleteConfirmation = () => {
    return (
      <ConfirmationModal
        show={deleteParams !== null}
        title="Confirm Delete"
        description={`Are you sure you want to delete the entity with ${deleteParamsAsFields}=${deleteParams}?`}
        handleCancel={() => setDeleteParams(null)}  // setting to null closes the modal
        handleConfirm={handleDelete}  
      />
    );
  }


  /* ------------------------------------- Toolbar Event Handlers ---------------------------------------- */
  const handleAddButtonClick = (event) => {
    event.preventDefault();
    // only one form modal should be open at any one time; close other forms
    setCreateFormOpen(true);
    setEditFormOpen(false);
  }


  /* --------------------------------------------- Data Table -------------------------------------------- */

  /**
   * Originally, we tried mixing the MUI table component here which had pagination included; however there
   * were some styling and responsiviness issues when we wrapped it in a responsive bootstrap container.
   * However, we can just use react-bootstrap's pagination elements (to be rendered separately below the 
   * table) to set the correct page value and sizes. Then we just need to do some basic math to render
   * the correct slice of table rows. The range of rows to display is simply the slice of the array from
   * one less than a 1-indexed page number to the page number.
   * 
   * The visual inspiration here was {@link https://mui.com/components/data-grid/pagination/ MUI's pagination}
   */
  const PaginatedTableBody = () => {
    // determine the range of rows to display (without exceeding the array boundaries)
    const i = Math.round((currentPage - 1) * pageSize);
    const j = Math.round(currentPage * pageSize) <= rows.length ? Math.round(currentPage * pageSize) : rows.length;
    console.log(i, j)
    
    // slice the correct range of rows and map them to a table body; return a closure here 
    return rows.slice(i, j).map((row, index) => (
        <tr key={index}>
          {/* map the row by by matching the correct column field value for each cell */}
          {fields.map((column, i) => (
            // optionally format the row, if its custom data type formatting is defined
            <td key={i}>
              { valueFormatter.has(column.columnConfig?.type)
                ? valueFormatter.get(column.columnConfig?.type)(row[column.field])
                : row[column.field] 
              }
            </td>
          ))}
          {/* render the action cell with edit and delete buttons */}
          <ActionCell rowIndex={index} />
        </tr>
    ))
    }



  return (
    <>
      {/* render any alerts above the table */}
      { alertContent &&
        <Alert 
          key="tableAlert" 
          variant="danger"
          onClose={() => setAlertContent(null)}
          children={alertContent}
          dismissible
        />
      }

      {/* render the toolbar above the table */}
      <Toolbar handleAddButtonClick={handleAddButtonClick} />

      <Table responsive className="mt-2 text-nowrap" bordered striped size="sm">
        {/* Header */}
        <thead className="table-dark">
        <tr>
          { fields.map((field, i) => <td key={i}>{field.columnConfig?.headerName}</td>) }
          <td key={fields.length} children={"Actions"} />
        </tr>
        </thead>

        {/* only render the current paginated */}
        <tbody>
          <PaginatedTableBody />
        </tbody>
        

        {/* table footer with pagination */}
        <caption className="text-reset">
          <Pagination
            currentPage={currentPage}
            minPage={1}
            maxPage={Math.floor(rows.length / pageSize)}
            // setCurrentPage={setCurrentPage}
            // setPageSize={setPageSize}
          />
        </caption>

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
