import React from "react";
import DataTable from "./DataTable/DataTable";
import entityConfig from "../data/entityConfig.json"
import entityDemoDataMap from "../data/entityDemoDataMap";


/**
 * Provides a DataTable for the specified Entity
 *
 * @param entityName the entity for which the DataTable should be provided
 * @param createFormToggle a function that toggles the display state of the entity page's create form
 * @param editFormToggle a function that toggles the display state of the entity page's edit form
 * @returns {JSX.Element|null} JSX.Element if the entity has all the required properties
 * @constructor
 */
export default function DataTableProvider({entityName, createFormToggle, editFormToggle}){
  // get the column definitions
  const columns = entityConfig[entityName] !== undefined ? entityConfig[entityName]['fields'] : null;

  // placeholder: todo get the appropriate functions for the entity
  const fetchRows = async () => {
    return entityDemoDataMap.has(entityName) ? entityDemoDataMap.get(entityName) : [];
  };

  // placeholder: todo prevent table generation if the entity is undefined or missing
  if (columns === null || fetchRows === null) {
    console.error("Error: missing entity data");
    return null;
  }

  return (
   <DataTable
     columnData={columns}
     fetchRows={fetchRows}
     createFormToggle={createFormToggle}
     editFormToggle={editFormToggle}
     allowSearch={
       entityName === 'Musicians'
     }
     allowEdit={
       entityName !== 'MusiciansConcertCycles'
       && entityName !== 'MusiciansInstruments'
       && entityName !== 'PiecesConcertCycles'
     }
   />
  );
}
