import React, { useEffect, useState } from "react";
import { 
  DataGrid, 
  GridToolbarContainer, 
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridFooter, 
  GridFooterContainer 
} from "@mui/x-data-grid";
import { Button, Container, Row } from "react-bootstrap";


/**
 *
 * @param columns an array of columns, formatted to MUI spec ()
 * @param getRows a function that calls the api to fetch rows (SELECT -> GET)
 * @param onCreate a function that calls the api when a row is added (INSERT -> POST)
 * @param onUpdate a function that calls the api to update a row (UPDATE -> PUT)
 * @param onDelete a function that calls the api to delete a row (DELETE -> DELETE)
 * @returns {JSX.Element}
 * @constructor
 */
export default function DataTable({ columns, fetchRows, onCreate, onUpdate, onDelete }) {
  // state hooks
  const [fetchNewData, setFetchNewData] = useState(true);
  const [alert, setAlert] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [rows, setRows] = useState([]);


  // effect hooks
  // get data on page load (and whenever a change is successfully made)
  useEffect(() => {
    // if we get here and there's no new data to be fetched, do nothing instead
    if (!fetchNewData) {
      return;
    }
    
    setFetchNewData(false);  // we're fetching new data, so update the state hook to reflect that
    const abortController = new AbortController();
    void async function getData() {
      try {
        const rowData = await fetchRows();
        setRows(rowData);
      } catch (err) {
        // todo: placeholder; push alert onto stack
        setAlert(err);
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted or request times out
    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNewData]);



  // top toolbar
  const Toolbar = () => {
    const addEntry = (event) => {
      event.preventDefault();
    }
  
    const editEntry = (event) => {
      event.preventDefault();
    }
  
    const deleteEntry = (event) => {
      event.preventDefault();
    }
  
    return (
      <GridToolbarContainer>
        
        <Button
          className="toolbarButton"
          variant="outline-light"
          aria-label="Add Entity"
          onClick={addEntry}
        >
          <i className="bi bi-plus-lg" />
          {` Add New`}
        </Button>

        <Button
          className="toolbarButton"
          variant="outline-light"
          aria-label="Edit Entity"
          onClick={editEntry}
        >
          <i class="bi bi-pencil" />
          {` Edit`}
        </Button>

        <Button
          className="toolbarButton"
          variant="outline-light"
          aria-label="Edit Entity"
          onClick={deleteEntry}
        >
          <i class="bi-trash" />
          {` Delete Checked`}
        </Button>
  
        <GridToolbarDensitySelector />
        <GridToolbarExport />
  
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        // style
        disableSelectionOnClick // make users actually click the selector

        // disable double-click to edit cells (we'll handle this with checkboxes instead)
        onCellDoubleClick = { (params, event) => {event.defaultMuiPrevented=true} }

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

        // row edit options: populate checkboxes at left and track all the row ids that the user has selected
        editMode="row"
        checkboxSelection
        selectionModel={selectedRows}
        onSelectionModelChange={ (newSelectedRows) => {
          setSelectedRows(newSelectedRows);
          console.log(newSelectedRows); // debugging
        }}

        // prop overrides
        components={{
          Toolbar: Toolbar,
        }}
        // componentProps={{
        // }}
      />
    </div>
  );
}
