import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
// button components for Grid Toolbar override
import HelpButton from "./HelpButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SearchButton from "./SearchButton";
import AddButton from "./AddButton";
import SearchForm from "./SearchForm";
import {makeStyles} from "@material-ui/core";

/**
 * Creates a MUI Data Grid for an Entity using the passed in props
 *
 * @param columns an array of columns, formatted to MUI spec ()
 * @param getRows a function that calls the api to fetch rows (SELECT -> GET)
 * @param onCreate a function that calls the api when a row is added (INSERT -> POST)
 * @param onUpdate a function that calls the api to update a row (UPDATE -> PUT)
 * @param onDelete a function that calls the api to delete a row (DELETE -> DELETE)
 * @param entityFormToggle a function that toggles the display state of the EntityForm
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataTable({
  columns,
  fetchRows,
  onCreate,
  onUpdate,
  onDelete,
  entityFormToggle,
  isSearchImplemented,
}) {
  /* ------------------------------ State Hooks ------------------------------ */
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchParameters, setSearchParameters] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [alertContent, setAlertContent] = useState(null);

  // data model (to display data)
  const [fetchNewData, setFetchNewData] = useState(true);         // use effect trigger
  const [rows, setRows] = useState([]);                           // holds rows in whatever present state they're in

  // edit model (to commit changes and update rows)
  const [originalRowStates] = useState(new Map());                // holds copies of rows in their original state
  const [editsToCommit] = useState(new Map());                    // holds rows whose state is "edited"

  // selection model (to perform operations on selected rows)
  const [selectedRows, setSelectedRows] = useState([]);           // holds rows whose state is "selected"

  /* ------------------------------ Effect Hooks ------------------------------ */

  // get data on page load (and whenever a change is successfully made)
  useEffect(() => {
    // if there's no new data to be fetched, do nothing instead
    if (!fetchNewData) return;

    const abortController = new AbortController();
    void async function getData() {
      try {
        // get the rows and set the data model
        const rowData = await fetchRows();
        setRows(rowData);
        
        setFetchNewData(false); // we just fetched data
      } catch (err) {
        // todo: placeholder; push alert onto stack
        setAlertContent(err);
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted or request times out
    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNewData]);


  /* -------------------------------- Grid Toolbar -------------------------------- */
  const Toolbar = () => {
    const onAddButtonClick = (event) => {
      event.preventDefault();
      entityFormToggle();
      setSearchPanelOpen(false);  // only one form panel open at a time
    }

    const onSearchButtonClick = (event) => {
      event.preventDefault();
      entityFormToggle(false);  // only one form panel open at a time
      setSearchPanelOpen(!searchPanelOpen);
    }

    const onEditButtonClick = (event) => {
      event.preventDefault();
      if (selectedRows.length === 0) return;  // do nothing if no rows were selected
      // TODO: placeholder
      const selectedIDs = selectedRows.filter(i => editsToCommit.has(i));
      alert(`This is a placeholder.\nCommitting edits made to selected rows with edits made: ${selectedIDs}`);
      onUpdate();
    }
  
    const onDeleteButtonClick = (event) => {
      event.preventDefault();
      if (selectedRows.length === 0) return;  // do nothing if no rows were selected
      // TODO: placeholder
      // otherwise, display a popup, ask the user to confirm the delete
      alert(`This is a placeholder.\nDeleting rows: ${selectedRows}`);
      onDelete();
    }

    return (
      <GridToolbarContainer>
        <Container fluid className="toolbarContainer">
        <AddButton onClick={onAddButtonClick} />
        {` `}{ isSearchImplemented && <SearchButton onClick={onSearchButtonClick}/> }
        {` `}<EditButton onClick={onEditButtonClick}/>
        {` `}<DeleteButton onClick={onDeleteButtonClick} />
        {` `}<GridToolbarDensitySelector />
        {` `}<GridToolbarExport />
        {` `}<HelpButton />
        </Container>
      </GridToolbarContainer>
    );
  }

  
  /* ---------------------------- Data Table Styles Context ---------------------------- */
  const useStyles = makeStyles({
    root: {
      '& .edited': {
        backgroundColor: 'hsl(45, 100%, 94%) !important',
        fontStyle: 'italic !important',
      }
    }
  });
  const classes = useStyles();


  /* ---------------------------- Data Table JSX Element ---------------------------- */
  return (
    <>
    <div style={{ height: 500, width: '100%' }} className={classes.root}>
      <DataGrid
        // style
        disableSelectionOnClick // make users actually click the checkbox to select a row
        getRowClassName={(params) => {
          // check whether the row was edited to override styles
          if (editsToCommit.has(params.row.id)) return(`edited`);
        }}

        // pagination options
        autoPageSize
        pagination

        // disable client-side column filtering; we need to implement this ourselves
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu

        // data
        rows={rows}
        columns={columns.map(
          column => ({
            ...column,
            sortable: false,  // disable client-side sorting
            flex: 1,          // make all columns flex-grow by default
          })
        )}

        // row edit options
        editMode="row"
        onRowEditStart={(params) => {
          // save the original state of this row
          if (!originalRowStates.has(params.row.id)) {
            originalRowStates.set(params.row.id, cloneDeep(params.row));
          }     
        }}
        onRowEditStop={(params) => {
          if (originalRowStates.has(params.row.id)) {
            let anyValChanged = false;
            const originalState = originalRowStates.get(params.row.id);

            for (const [key, val] of Object.entries(params.row)) {
              let originalVal = originalState[key];
              // treat '', undefined & null the same
              switch(originalVal) {
                case '':
                  if (val === undefined || val === null)  originalVal = val;
                  break;
                case undefined:
                  if (val === '' || val === null) originalVal = val;
                  break;
                case null:
                  if (val === '' || val === undefined) originalVal = val;
                  break;
                default:
                  break;
              }

              // check whether the value changed
              let valChanged = val instanceof Date ? val.getTime() !== originalVal.getTime() : originalVal !== val;
              if (valChanged) {
                editsToCommit.set(params.row.id, params.row);
                anyValChanged = true;
              }
            }

            // check whether the data was restored to its original state, in which case it can be dropped from
            // the edit model (this way it is no longer highlighted in the table)
            if (!anyValChanged) editsToCommit.delete(params.row.id);


          } else {
            // fallback, but we should never get here unless there was a bug, so we should log it
            editsToCommit.set(params.row.id, params.row);
            console.warn('row being edited was never saved to originalRowStates');
          }
        }}
        checkboxSelection // populate checkboxes
        selectionModel={selectedRows}
        onSelectionModelChange={(newSelectedRows) => setSelectedRows(newSelectedRows)}

        // prop overrides
        components={{
          Toolbar: Toolbar,
        }}
      />

      { searchPanelOpen &&
        <Container className={"entityFormContainer"}>
          <SearchForm columns={columns} setSearchParameters={setSearchParameters} />
        </Container>
      }
    </div>
    </>
  );
}
