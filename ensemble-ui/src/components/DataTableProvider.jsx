import React from "react";
import DataTable from "./DataTable/DataTable";
import entityColumnMap from "../data/entityColumnMap";
import entityDemoDataMap from "../data/entityDemoDataMap";


export default function DataTableProvider({entityName}){

  // get the column definitions
  let columns = entityColumnMap.has(entityName) ? entityColumnMap.get(entityName) : null;

  // todo: placeholder: get the appropriate function; for now, these do nothing
  let fetchRows = async () => {
    return entityDemoDataMap.has(entityName) ? entityDemoDataMap.get(entityName) : []
  };
  let onCreate = () => {};
  let onUpdate = () => {};
  let onDelete  = () => {};

  // if the entity is undefined or something is missing, log an error instead of returning the component
  if (columns === null || fetchRows === null || onCreate === null || onUpdate === null || onDelete === null) {
    console.log("Error: missing entity data")
    return null;
  }

  return (
   <DataTable
     columns={columns}
     fetchRows={fetchRows}
     onCreate={onCreate}
     onUpdate={onUpdate}
     onDelete={onDelete}
   />
  );

}
