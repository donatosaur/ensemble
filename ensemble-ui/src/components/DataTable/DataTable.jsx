import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { Button, Container } from "react-bootstrap";

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

  return (
    <Container fluid>
      <div style={{ height: 500, width: '80%' }}>
        <DataGrid
          // styling
          className={"table"}

          // pagination options
          autoPageSize
          pagination

          // disable builtin client-side column filtering; we need to implement this ourselves
          disableColumnFilter
          disableColumnSelector
          disableColumnMenu

          // data
          rows={[]}
          columns={columns}

          // row edit options
          editMode="row"
          checkboxSelection
          // selectionModel={selectedRows}
          // onSelectionModelChange={
          //   (newSelectedRows) => {
          //     setSelectedRows(newSelectedRows);
          //     console.log(newSelectedRows);
          //   }
          // }

        />
      </div>
    </Container>
  );
}



