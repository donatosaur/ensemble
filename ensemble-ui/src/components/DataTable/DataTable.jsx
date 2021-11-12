import React, {useContext, useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import { cloneDeep } from "lodash";

// button components for Grid Toolbar override
import HelpButton from "./ToolbarButtons/HelpButton";
import SearchButton from "./ToolbarButtons/SearchButton";
import AddButton from "./ToolbarButtons/AddButton";

// button components for custom actions cell
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

// other components and hooks
import ConfirmationDialog from "../ConfirmationDialog";
import { EntityDispatchContext } from "../EntityContextProvider";

// custom data type formatters
import customDataTypes from "./CustomFormats";

// search form for enabled entities
import MusicianSearchForm from "./SearchForm";



/**
 * Creates a MUI Data Grid for an Entity using the passed in props
 *
 * @param columnData {array} an array of columns, formatted to MUI spec ()
 * @param fetchRows  a function that calls the api to fetch rows (SELECT -> GET)
 * @param createFormToggle a function that toggles the display state of the EntityForm
 * @param editFormToggle a function that toggles the display state of the EntityForm
 * @param allowSearch {boolean} whether search is enabled for this table
 * @param allowEdit {boolean} whether editing is enabled for this table
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataTable({
  columnData,
  fetchRows,
  createFormToggle,
  editFormToggle,
  allowSearch,
  allowEdit
}) {
  /* ------------------------------ State Hooks ------------------------------ */
  // context hook for edits; dispatch a copy of the row object being edited
  const dispatch = useContext(EntityDispatchContext);

  // state hook for delete confirmation; *null* this to turn off the dialog box
  const [deleteRowID, setDeleteRowID] = useState(null);

  /* eslint-disable no-unused-vars */
  // state and reducer hooks for search panels
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState({});

  // data model
  const [fetchNewData, setFetchNewData] = useState(true);
  const [rows, setRows] = useState([]);

  // error model
  const [alertContent, setAlertContent] = useState(null);



  /* ------------------------------ Effect Hooks ------------------------------ */
  // get data on page load (and whenever a change is successfully made)
  useEffect(() => {
    if (!fetchNewData) return; // prevent infinite data fetching

    const abortController = new AbortController();
    void async function getData() {
      try {
        // get the rows and set the data model
        const rowData = await fetchRows();
        setRows(rowData);
        setFetchNewData(false);
      } catch (err) {
        setAlertContent(err);  // todo: placeholder; push alert onto stack
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted or request times out
    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNewData]);


  /* -------------------------------- Columns -------------------------------- */
  // we're using useMemo here because the column cells will re-render every time there's a change, which includes
  // instances in which the same action button is pressed more than once; the memory footprint savings here are
  // pretty significant as well; storing all th

  const columns = useMemo(() => [
    ...columnData.map(
      column => ({
        ...column,
        filterable: false,  // disable client-side filtering (we need to implement this ourselves)
        editable: false,    // disable inline editing
        sortable: false,    // disable client-side sorting
        flex: column.flex === undefined ? 1 : column.flex,  // flexGrow by default
        valueFormatter: null,
        ...customDataTypes.has(column.type) ? customDataTypes.get(column.type) : {},
      })
    ),
    // create an action column: see https://mui.com/components/data-grid/columns/#render-cell for formatting here
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      editable: false,
      sortable: false,
      flex: 0,
      disableClickEventBubbling: true,  // we don't want events to propagate (we're just toggling state hooks)
      renderCell: (rowParams) => {
        // console.log('rendering...');
        return (
          <>
            {allowEdit &&
              <EditButton
                onClick={() => {
                  // load the row data
                  const rowIndex = rows.findIndex(row => row.id === parseInt(rowParams.id));
                  if (rowIndex === -1) {
                    // this shouldn't happen; if it does, we should know about it
                    console.error('Edit button pressed, but row not found!')
                  }

                  // get a deep copy so we don't inadvertently modify the original row data, and
                  // send it up to the context provider
                  if (dispatch === null || dispatch === undefined) {
                    console.error('Dispatch function is null!');
                    return;
                  } else {
                    dispatch(cloneDeep(rows[rowIndex]));
                    // console.log('Dispatching...', rows[rowIndex])
                  }

                  // only one form should be open at a time
                  editFormToggle(true);
                  setSearchPanelOpen(false);
                  createFormToggle(false);
                }}
              />
            }

            <DeleteButton onClick={() => setDeleteRowID(parseInt(rowParams.id))} />
          </>
        );
      }
    },
  ],
    [columnData, createFormToggle, editFormToggle, allowEdit, dispatch, rows]
  );


  /* ----------------------- Delete Confirmation Dialogue ------------------------- */
  const DeleteConfirmation = () => {

    return (
      <ConfirmationDialog
        show = {deleteRowID !== null}
        title = {"Confirm Delete"}
        description = {`Are you sure you want to delete the entity with ID ${deleteRowID}?`}
        cancelButtonText = {"Cancel"}
        confirmButtonText = {"Confirm"}
        handleCancel = {() => setDeleteRowID(null)}
        handleConfirm = {() => setDeleteRowID(null)} // todo: placeholder
      />
    );
  }



  /* -------------------------------- Grid Toolbar -------------------------------- */
  const Toolbar = () => {
    const onAddButtonClick = (event) => {
      event.preventDefault();
      createFormToggle();
      editFormToggle(false);
      setSearchPanelOpen(false);  // only one form panel open at a time
    }
    const onSearchButtonClick = (event) => {
      event.preventDefault();
      setSearchPanelOpen(!searchPanelOpen);
      createFormToggle(false);
      editFormToggle(false);  // only one form panel open at a time
    }

    return (
      <GridToolbarContainer>
        <Container fluid className="toolbarContainer">
        <AddButton onClick={onAddButtonClick} />
        {` `}{ allowSearch && <SearchButton onClick={onSearchButtonClick}/> }
        {` |`}
        {` `}<GridToolbarDensitySelector />
        {` `}<GridToolbarExport />
        {` `}<HelpButton />
        </Container>
      </GridToolbarContainer>
    );
  }

  
  /* ---------------------------- Data Table Styles Context ---------------------------- */
  // not currently in use, but useful 
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
    <div style={{ height: 500}} className={classes.root}>
      <DataGrid
        // style
        disableSelectionOnClick // don't allow users to select rows

        // pagination options
        autoPageSize
        pagination

        // disable client-side column filtering; we need to implement this ourselves
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu

        // data
        rows={rows}
        columns={columns}

        // row edit options: disable inline editing; we're using forms
        editMode="row"
        onRowEditStart={(_, event) => {
          event.defaultMuiPrevented = true;
        }}
        onRowEditStop={(_, event) => {
          event.defaultMuiPrevented = true;
        }}
        onCellFocusOut={(_, event) => {
          event.defaultMuiPrevented = true;
        }}

        // prop overrides
        components={{
          Toolbar: Toolbar,
        }}
      />

      <DeleteConfirmation />

      { allowSearch
        ? searchPanelOpen &&
          <Container className="entityFormContainer">
            <MusicianSearchForm
              setSearchParameter={columnData}
              dispatch={setSearchParameters}
            />
          </Container>
        // this shouldn't ever display, but it's here for safety
        : <p>Search is disabled for this entity.</p>
      }

    </div>
    </>
  );
}
