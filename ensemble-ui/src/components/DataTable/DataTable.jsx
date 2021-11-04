/* eslint-disable no-unused-vars */
import React, {useEffect, useMemo, useState} from "react";
import  {DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";

// button components for Grid Toolbar override
import HelpButton from "./ToolbarButtons/HelpButton";
import SearchButton from "./ToolbarButtons/SearchButton";
import AddButton from "./ToolbarButtons/AddButton";

// button components for custom actions cell
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

// forms
import SearchForm from "../SearchForms/SearchForm";
import UpdateForm from "../EditForms/UpdateForm";

import { cloneDeep } from "lodash";


/**
 * Creates a MUI Data Grid for an Entity using the passed in props
 *
 * @param columnData {array} an array of columns, formatted to MUI spec ()
 * @param fetchRows  a function that calls the api to fetch rows (SELECT -> GET)
 * @param onCreate a function that calls the api when a row is added (INSERT -> POST)
 * @param onUpdate a function that calls the api to update a row (UPDATE -> PUT)
 * @param onDelete a function that calls the api to delete a row (DELETE -> DELETE)
 * @param createFormToggle a function that toggles the display state of the EntityForm
 * @param isSearchImplemented {boolean} whether search is enabled for this table
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataTable({
  columnData,
  fetchRows,
  onCreate,
  onUpdate,
  onDelete,
  createFormToggle,
  isSearchImplemented,
}) {
  /* ------------------------------ State Hooks ------------------------------ */
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState({});
  const [updateParameters, setUpdateParameters] = useState({});
  const [alertContent, setAlertContent] = useState(null);

  // data model
  const [fetchNewData, setFetchNewData] = useState(true);
  const [rows, setRows] = useState([]);


  // get data on page load (and whenever a change is successfully made)
  useEffect(() => {
    if (!fetchNewData) return;

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

  /* ------------------------------ Column Hooks ------------------------------ */
  const columns = useMemo(() => [
      ...columnData.map(
        column => ({
          ...column,
          sortable: false,  // disable client-side sorting
          flex: 1,          // make all columns flex-grow by default
        })
      ),
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        editable: false,
        sortable: false,
        width: 120,
        disableClickEventBubbling: true,  // we don't want events to propagate
        renderCell: (params) => {
          return (
            <>
              <EditButton
                onClick={() => {
                  // load the row data
                  const rowIndex = rows.findIndex(row => row.id === parseInt(params.id));
                  if (rowIndex === -1) {
                    // this shouldn't happen; if it does, we should know about it
                    console.error('Edit button pressed, but row not found!')
                  }

                  setUpdateParameters(cloneDeep(rows[rowIndex]));

                  // only one form should be open at a time
                  setEditPanelOpen(true);
                  setSearchPanelOpen(false);
                  createFormToggle(false);
                }
                }/>

              <DeleteButton
                onClick={() => {
                  // display a popup, ask the user to confirm the delete
                  alert(`This is a placeholder. Deleting entity with id ${params.id.toString()}`);
                  onDelete();
                }}
              />
            </>
          );
        }
      },
    ],
    [columnData, createFormToggle, onDelete, rows]
  );


  /* -------------------------------- Grid Toolbar -------------------------------- */
  const Toolbar = () => {
    const onAddButtonClick = (event) => {
      event.preventDefault();
      createFormToggle();
      setSearchPanelOpen(false);  // only one form panel open at a time
      setEditPanelOpen(false);
    }
    const onSearchButtonClick = (event) => {
      event.preventDefault();
      createFormToggle(false);  // only one form panel open at a time
      setSearchPanelOpen(!searchPanelOpen);
    }

    return (
      <GridToolbarContainer>
        <Container fluid className="toolbarContainer">
        <AddButton onClick={onAddButtonClick} />
        {` `}{ isSearchImplemented && <SearchButton onClick={onSearchButtonClick}/> }
        {` |`}
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

        // row edit options: disable inline editing
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

      { searchPanelOpen &&
        <Container className={"entityFormContainer"}>
          <SearchForm
            columns={columnData}
            setSearchParameters={setSearchParameters}
          />
        </Container>
      }

      { editPanelOpen &&
      <Container className={"entityFormContainer"}>
        <UpdateForm
          columns={columnData}
          updateParameters={updateParameters}
          setUpdateParameter={setUpdateParameters}
        />
      </Container>
      }
    </div>
    </>
  );
}
