import React from "react";
import DataTable from "./DataTable/DataTable";
import entityConfig from "../data/entityConfig.json"
import entityDemoDataMap from "../data/entityDemoDataMap";

// when this is set to true, show demo data instead
const DEBUG_TABLE = false;

/**
 * Provides a DataTable for the specified Entity
 *
 * @param entityName the entity for which the DataTable should be provided
 * @param getRows an async function that sends a GET request to the appropriate API endpoints for row data
 * @param createFormToggle a function that toggles the display state of the entity page's create form
 * @param editFormToggle a function that toggles the display state of the entity page's edit form
 * @returns {JSX.Element|null} JSX.Element if the entity has all the required properties
 * @constructor
 */
export default function DataTableProvider({
  entityName,
  getRows,
  createFormToggle,
  editFormToggle
}){
  // get the column definitions and ensure that they were successfully found in the config file
  const columns = entityConfig[entityName] !== undefined ? entityConfig[entityName]['fields'] : null;
  if (columns === null) return null; // TODO: throw error with ErrorBoundary

  // demo data fetcher (used when DEBUG_TABLE is set to true)
  const getDemoData = async () => entityDemoDataMap.has(entityName) ? entityDemoDataMap.get(entityName) : [];

  return (
   <DataTable
     columnData={columns}
     getRows={DEBUG_TABLE ? getDemoData : getRows}
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
