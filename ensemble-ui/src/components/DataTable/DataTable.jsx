import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
// button components for Grid Toolbar override
import HelpButton from "./HelpButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SearchButton from "./SearchButton";
import AddButton from "./AddButton";
import SearchForm from "./SearchForm";

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
}) {
  /* ------------------------------ State Hooks ------------------------------ */
  // data model
  const [fetchNewData, setFetchNewData] = useState(true);
  const [rows, setRows] = useState([]);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [alertContent, setAlertContent] = useState(null);

  // edit model (to commit changes and update rows)
  const [rowEditModel, setRowEditModel] = useState({});
  const [editsToCommit] = useState(new Map());

  // selection model (to perform operations on selected rows)
  const [selectedRows, setSelectedRows] = useState([]);

  /* ------------------------------ Effect Hooks ------------------------------ */

  // get data on page load (and whenever a change is successfully made)
  useEffect(() => {
    // if there's no new data to be fetched, do nothing instead
    if (!fetchNewData) return;

    const abortController = new AbortController();
    void async function getData() {
      try {
        const rowData = await fetchRows();
        setRows(rowData); // set the data model
        setFetchNewData(false); // update the state hook
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
      const selectedIDs = selectedRows.filter(i => editsToCommit.has(i.toString()));
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
        {` `}<SearchButton onClick={onSearchButtonClick}/>
        {` `}<EditButton onClick={onEditButtonClick}/>
        {` `}<DeleteButton onClick={onDeleteButtonClick} />
        {` `}<GridToolbarDensitySelector />
        {` `}<GridToolbarExport />
        {` `}<HelpButton />
        </Container>
      </GridToolbarContainer>
    );
  }


  /* ---------------------------- Data Table JSX Element ---------------------------- */
  return (
    <>
    <div style={{ height: 500, width: '100%' }}>
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
        columns={columns.map(
          column => ({
            ...column,
            sortable: false,  // disable client-side sorting
            flex: 1,          // make all columns flex-grow by default
          })
        )}

        // row edit options
        editMode="row"
        editRowsModel={rowEditModel}
        onEditRowsModelChange={(rowBeingEdited) => setRowEditModel(rowBeingEdited)}
        onRowEditStop={() => {
          for (const key in rowEditModel) editsToCommit.set(key, rowEditModel[key]);
        }}
        checkboxSelection // populate checkboxes
        selectionModel={selectedRows}
        onSelectionModelChange={(newSelectedRows) => setSelectedRows(newSelectedRows)}

        // prop overrides
        components={{
          Toolbar: Toolbar,
          // LoadingOverlay:
        }}
        // componentProps={{
        // }}
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
