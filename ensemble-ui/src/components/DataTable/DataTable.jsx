import React, {useContext, useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { cloneDeepWith } from "lodash";
import { useEntity } from "../../hooks/useEntity";

// button components for Grid Toolbar override
import HelpButton from "./ToolbarButtons/HelpButton";
import SearchButton from "./ToolbarButtons/SearchButton";
import AddButton from "./ToolbarButtons/AddButton";

// button components for custom actions cell
import EditButton from "./ActionButtons/EditButton";
import DeleteButton from "./ActionButtons/DeleteButton";

// other components and hooks
import ConfirmationDialog from "../ConfirmationDialog";
import { EntityDispatchContext } from "../../hooks/EntityContextProvider";

// custom data type formatters
import customDataTypes from "./CustomFormats";

// search form for enabled entities
import MusicianSearchForm from "./SearchForm";

// demo data loader for frontend debugging
// import entityDemoDataMap from "../../data/entityDemoDataMap";
// const getDemoData = async () => entityDemoDataMap.has(entityName) ? entityDemoDataMap.get(entityName) : [];

/**
 * Creates a MUI Data Grid for an Entity using the passed in props
 *
 * @param createFormToggle a function that toggles the display state of the EntityForm
 * @param editFormToggle a function that toggles the display state of the EntityForm
 * @param allowSearch {boolean} whether search is enabled for this table
 * @param allowEdit {boolean} whether editing is enabled for this table
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataTable({
  createFormToggle,
  editFormToggle,
  allowSearch,
  allowEdit
}) {
  /* ------------------------------------------ State Hooks ------------------------------------------ */
  // get the column definitions and api caller from the entity context
  const { columnDefs, getEntity } = useEntity();

  // context hook for edits; dispatch a copy of the row object being edited
  const dispatch = useContext(EntityDispatchContext);

  // state hook for delete confirmation; *null* this to turn off the dialog box
  const [deleteRowID, setDeleteRowID] = useState(null);

  /* eslint-disable no-unused-vars */
  // state and reducer hooks for search panels
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState(null);

  // data model
  const [rows, setRows] = useState([]);

  // error model
  const [alertContent, setAlertContent] = useState(null);


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

        /**
         * Inspect the returned row data. The table **requires** an 'id' key to be present in each
         * row object in order to identify it. If there is no such key (e.g. when we fetch data from
         * an intersection table), we can just insert one; this will not change the underlying data
         * in any meaningful way.
         */
        if (rowData.length > 0 && !rowData[0].hasOwnProperty('id')) {
          for (let i = 0; i < rowData.length; i++) {
            rowData[i]['id'] = i;  // set the row id to its index
          }
        }
        setRows(rowData);
        // setFetchNewData(false);
      } catch (err) {
        console.warn(err);
        setAlertContent(err);  // todo: placeholder; push alert onto stack
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, [getEntity, setRows, searchParameters]);


  /* -------------------------------------------- Columns -------------------------------------------- */

  /**
   * We're using useMemo here to prevent the columns from re-rendering whenever *any* change is detected,
   * which includes instances where the same action button is pressed more than once (e.g. to toggle
   * between editing different rows). In addition, this gives us a pretty significant savings in memory
   * footprint.
   */
  const columns = useMemo(() => [
    ...columnDefs.map(
      column => ({
        ...column,
        filterable: false,  // disable client-side filtering (we need to implement this ourselves)
        editable: false,    // disable inline editing
        sortable: false,    // disable client-side sorting
        flex: column.flex === undefined ? 1 : column.flex,  // flexGrow by default
        // ...customDataTypes.has(column.type) ? customDataTypes.get(column.type) : {},
      })
    ),
    // Create a custom actions button column. See https://mui.com/components/data-grid/columns/#render-cell
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      editable: false,
      sortable: false,
      flex: 0,
      disableClickEventBubbling: true,  // we don't need events to propagate; we are simply toggling state hooks
      renderCell: (rowParams) => {
        console.debug('Rendering table columns...'); // debug
        return (
          <>
            {allowEdit &&
              <EditButton
                onClick={() => {
                  // load the row data
                  const rowIndex = rows.findIndex(row => row.id === parseInt(rowParams.id));
                  if (rowIndex === -1) {
                    // this should never happen; if it does, we absolutely need to know about it
                    console.error('Edit button pressed, but row not found!')
                    return;
                  }

                  /**
                   * TODO // NOTE
                   * Get a deep copy for safety: we want to avoid modifying the original row's underlying data
                   * and send that copy up to the context provider where it can be accessed from the edit form.
                   * We'll need to replace null with '' because of just *how* lazy React's reducer hooks are.
                   * This is a temporary solution to get forms to work.
                   */
                  if (dispatch === null || dispatch === undefined) {
                    console.error('Dispatch function is null!');
                    return;
                  } else {
                    dispatch(cloneDeepWith(rows[rowIndex], (value, key, object) => {
                      if (value === null) {
                        object[key] = '';
                      }
                    }));
                  }

                  // we should only have one form open at any one time
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
    [columnDefs, createFormToggle, editFormToggle, allowEdit, dispatch, rows]
  );


  /* ----------------------------------- Delete Confirmation Dialogue ------------------------------------- */
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



  /* -------------------------------------------- Grid Toolbar -------------------------------------------- */
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
        <p className="d-inline text-primary">{` |`}</p>
        {` `}<GridToolbarDensitySelector/>
        {/*  disable grid export for now: there are new settings mui.com/api/data-grid/grid-print-export-options/ */}
        {/*{` `}<GridToolbarExport />*/}
        {` `}<HelpButton />
        </Container>
      </GridToolbarContainer>
    );
  }


  /* ---------------------------------------- Data Table JSX Element ---------------------------------------- */
  return (
    <>
    <div style={{ height: 510}}>
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
        editMode="row"  // use rowParams instead of cellParams
        onRowEditStart={(_, event) => event.defaultMuiPrevented = true}
        onRowEditStop={(_, event) => event.defaultMuiPrevented = true}
        onCellFocusOut={(_, event) => event.defaultMuiPrevented = true}

        // prop overrides
        components={{
          Toolbar: Toolbar,
        }}
      />

      {/* Render Delete Confirmation Dialogue */}
      <DeleteConfirmation />

      {/* Render Search Panel */}
      { searchPanelOpen && ( allowSearch
         ? <Container className="entityFormContainer">
            <MusicianSearchForm setSearchParameters={setSearchParameters} />
          </Container>
        // this shouldn't ever display, but it's here for safety
        : <p>Search is disabled for this entity.</p>
      )}

    </div>
    </>
  );
}
