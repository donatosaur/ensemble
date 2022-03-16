/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */

import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import { cloneDeep } from "lodash";
import { useEntity } from "../../hooks/useEntity";
import valueFormatter from "../../utils/valueFormatter";

// button components for custom actions cell
import EditButton from "./ActionButtons/EditButton";
import DeleteButton from "./ActionButtons/DeleteButton";

// other components
import ConfirmationModal from "../ConfirmationDialog";
import SearchForm from "./SearchForm";
import Toolbar from "./Toolbar";
import Pagination from "./TablePagination";

/**
 * Creates a Data Table for an Entity using the passed in props
 *
 * @param {Object} props
 * @param {function(boolean): void} props.setCreateFormOpen a function that toggles the display state of the EntityForm
 * @param {function(boolean): void} props.setEditFormOpen a function that toggles the display state of the EntityForm
 * @param {function(*): void} [props.setEditFormValues] function to the initial state of the edit form; to disable
 *                                                      editing, pass a falsy value
 * @param {boolean} props.allowSearch whether search is enabled for this table
 * @returns {JSX.Element}
 */
export default function DataTable({
  setCreateFormOpen,
  setEditFormOpen = () => {},
  setEditFormValues,
  allowSearch,
}) {
  /* ---------------------------------------------- Hooks ----------------------------------------------- */
  const {
    fields,
    getEntity,
    deleteEntity,
    deleteParamsAsFields,
  } = useEntity();

  const [searchParameters, setSearchParameters] = useState(null); // search query parameters for API call
  const [loading, setLoading] = useState(true);                   // loading indicator
  const [deleteParams, setDeleteParams] = useState(null);         // params for delete; *null* to hide modal
  const [alertContent, setAlertContent] = useState(null);         // alert above table; *null* to hide alert
  const [pageSize] = useState(10);                                // pages per row
  const [currentPage, setCurrentPage] = useState(1);              // current page
  const [rows, setRows] = useState([]);

  // READ data on page load (and whenever a change is successfully made)
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void (async () => {
      try {
        setLoading(true);
        // if there are search parameters, call the API using them; otherwise, get everything
        const rowData = searchParameters ? await getEntity(searchParameters) : await getEntity();
        setRows(rowData);
      } catch (error) {
        setAlertContent(`${error}`);
      } finally {
        setLoading(false);
      }
    })();
    // prevent memory leaks by aborting request if component is no longer mounted
    return () => abortController.abort();
  }, [getEntity, searchParameters]);

  /* -------------------------------------------- Action Cell ------------------------------------------- */
  const ActionCell = ({ rowIndex }) => (
    <td key={rowIndex} className="text-nowrap">
      {/* Button for UPDATE: initializes the form with the correct row data */}
      { setEditFormValues && (
        <EditButton onClick={() => {
          // make sure a row index was actually passed; if it was not, log it and stop
          if (rowIndex === null || rowIndex === undefined) {
            console.error("Edit button pressed, but row not found!");
            return;
          }

          // get a deep copy for safety: we want to avoid modifying the original row's underlying data
          setEditFormValues(cloneDeep(rows[rowIndex]));

          // we should only have one form open at any one time
          setCreateFormOpen(false);
          setEditFormOpen(true);
        }}
        />
      )}
      {/* Button for DELETE: sets the correct params for the query string and opens a modal */}
      <DeleteButton onClick={() => {
        // close other forms
        setCreateFormOpen(false);
        setEditFormOpen(false);
        // make sure a row index was actually passed; if it was not, log it and stop
        if (rowIndex === null || rowIndex === undefined) {
          console.error("Delete button pressed, but row not found!");
          return;
        }
        // get the correct parameters to pass to deleteEntity
        const newDeleteParams = deleteParamsAsFields?.map((field) => rows[rowIndex]?.[field]);
        console.log(`Setting delete to fields ${deleteParamsAsFields} as ${deleteParams}.`);
        setDeleteParams(newDeleteParams);
      }}
      />
    </td>
  );

  /* ------------------------------------- Delete Confirmation Modal -------------------------------------- */
  const handleDelete = async () => {
    try {
      await deleteEntity(...deleteParams);
    } catch (error) {
      setAlertContent("That row could not be deleted. Please delete any many-to-many relationships first.");
    } finally {
      setDeleteParams(null);
    }
  };

  const DeleteConfirmation = () => (
    <ConfirmationModal
      show={deleteParams !== null}
      title="Confirm Delete"
      description={`Are you sure you want to delete the row with ${deleteParamsAsFields} ${deleteParams}?`}
      handleCancel={() => setDeleteParams(null)}  // setting to null closes the modal
      handleConfirm={handleDelete}
    />
  );

  /* --------------------------------------------- Data Table -------------------------------------------- */
  /* eslint-disable react/no-array-index-key */

  const PaginatedTableBody = () => {
    // determine the range of rows to display (without exceeding the array boundaries)
    const i = Math.round((currentPage - 1) * pageSize);
    const j = Math.round(currentPage * pageSize) <= rows.length ? Math.round(currentPage * pageSize) : rows.length;

    // slice the correct range of rows and map them to a table body
    return (
      <tbody>
        { rows.slice(i, j).map((row, index) => (
          <tr key={index}>
            {/* map the row by by matching the correct column field value for each cell */}
            { fields.map((column, columnIndex) => (
              // optionally format the row, if its custom data type formatting is defined;
              // default wrap text to "false"
              <td key={columnIndex} className={column.columnConfig?.wrap ?? false ? "text-wrap" : "text-nowrap"}>
                { valueFormatter.has(column.columnConfig?.type)
                  ? valueFormatter.get(column.columnConfig?.type)(row[column.field])
                  : row[column.field]}
              </td>
            ))}
            {/* render the action cell with edit and delete buttons */}
            <ActionCell rowIndex={index} />
          </tr>
        ))}
      </tbody>
    );
  };

  const TableHeader = () => (
    <thead className="text-nowrap">
      <tr>
        { fields.map((field, i) => <td key={i}>{field.columnConfig?.headerName}</td>) }
        <td key={fields.length}> Actions </td>
      </tr>
    </thead>
  );

  const TableToolbar = () => (
    <Toolbar
      handleAddButtonClick={(event) => {
        event.preventDefault();
        setCreateFormOpen(true);
        setEditFormOpen(false);
      }}
      handleReloadButtonClick={
        // render reload button only if search is enabled on this entity
        allowSearch
          ? (event) => {
            event.preventDefault();
            setCreateFormOpen(false);
            setEditFormOpen(false);
            // trigger a refresh only once (searchParameters is already in our dependency array)
            if (searchParameters !== null) {
              setSearchParameters(null);
            }
          }
          : null
      }
    />
  );

  const TablePagination = () => (
    <Container className="paginationContainer">
      <Pagination
        currentPage={currentPage}
        minPage={1}
        maxPage={Math.ceil(rows.length / pageSize)}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );

  return (
    <>
      {/* Render alerts (if any) above table */}
      { alertContent && (
        <Alert
          key="tableAlert"
          variant="danger"
          onClose={() => setAlertContent(null)}
          dismissible
        >
          { alertContent }
        </Alert>
      )}

      {/* Render Table */}
      <Container className="dataTableContainer">
        <TableToolbar />
        <Table responsive hover size="lg">
          <TableHeader />
          { loading && (
            <caption className="border-0 mt-4 text-center">
              <Spinner animation="border" variant="secondary" />
            </caption>
          )}

          { !loading && (rows.length === 0
            ? (
              <caption className="border-0 mt-4 text-center">
                <h2>No rows.</h2>
              </caption>
            )
            : <PaginatedTableBody />
          )}
        </Table>
        { !loading && rows.length > 0 && <TablePagination /> }
      </Container>

      {/* Render Delete Confirmation Dialogue */}
      <DeleteConfirmation />

      {/* Render Search Panel */}
      { allowSearch && (
        <Container className="searchContainer">
          <SearchForm setSearchParameters={setSearchParameters} />
        </Container>
      )}
    </>
  );
}
