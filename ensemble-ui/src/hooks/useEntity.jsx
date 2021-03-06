import React, { createContext, useContext } from "react";
import * as callAPI from "../utils/callAPI";
import entityConfig from "../entityConfig.json";

/**
* @module useEntity
*/

/**
 * JSON field
 * @typedef {Object} field
 * @property {string} field
 * @property {{"headerName": string; "type"?: string; "wrap"?: boolean}} columnConfig
 * @property {{"label": string; "errorText"?: string}} formConfig
 */

/**
 * Entity context returned by useEntity
 * @typedef {Object} entityContext
 * @property {field[]} fields
 * @property {(searchParams?: string) => Promise} getEntity async API call for READ
 * @property {(entity: Object) => Promise} createEntity async API for CREATE
 * @property {(entity: Object) => Promise} updateEntity async API call for UPDATE
 * @property {(id1: string, id2?: string) => Promise} deleteEntity async API call for DELETE
 * @property {string[]} deleteParamsAsFields  the parameters required to send a DELETE request
 */

/**
 * Supported entity names
 * @typedef { "Musicians" | "Instruments" | "Pieces" | "Services" | "Venues" | "ConcertCycles" | 
 *            "MusiciansInstruments" | "MusiciansConcertCycles" | "PiecesConcertCycles" } entityName
 */

/**
 * Create the context hook (see https://reactjs.org/docs/context.html#reactcreatecontext). A parameter
 * is required for defaultValue, but the actual context here will depend on the entity name that is
 * passed when the element is created ({@see initializeContext})
 */
const EntityAPIContext = createContext(null);

// fetch the data and api calls we want to provide depending on the entity
const initializeContext = (entityName) => {
  switch(entityName) {
    case "Musicians":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getMusicians,
        createEntity: callAPI.createMusician,
        updateEntity: callAPI.updateMusician,
        deleteEntity: callAPI.deleteMusician,
        deleteParamsAsFields: ['id'],
      }
    case "Instruments":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getInstruments,
        createEntity: callAPI.createInstrument,
        updateEntity: callAPI.updateInstrument,
        deleteEntity: callAPI.deleteInstrument,
        deleteParamsAsFields: ['id'],
      }
    case "Pieces":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getPieces,
        createEntity: callAPI.createPiece,
        updateEntity: callAPI.updatePiece,
        deleteEntity: callAPI.deletePiece,
        deleteParamsAsFields: ['id'],
      }
    case "Services":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getServices,
        createEntity: callAPI.createService,
        updateEntity: callAPI.updateService,
        deleteEntity: callAPI.deleteService,
        deleteParamsAsFields: ['id'],
      }
    case "Venues":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getVenues,
        createEntity: callAPI.createVenue,
        updateEntity: callAPI.updateVenue,
        deleteEntity: callAPI.deleteVenue,
        deleteParamsAsFields: ['id'],
      }
    case "ConcertCycles":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getConcertCycles,
        createEntity: callAPI.createConcertCycle,
        updateEntity: callAPI.updateConcertCycle,
        deleteEntity: callAPI.deleteConcertCycle,
        deleteParamsAsFields: ['id'],
      }
    case "MusiciansInstruments":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getMusiciansInstruments,
        createEntity: callAPI.createMusicianInstrument,
        updateEntity: () => {}, // do nothing
        deleteEntity: callAPI.deleteMusicianInstrument,
        deleteParamsAsFields: ['musicianID', 'instrumentID'],
      }
    case "MusiciansConcertCycles":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getMusiciansConcertCycles,
        createEntity: callAPI.createMusicianConcertCycle,
        updateEntity: () => {},
        deleteEntity: callAPI.deleteMusicianConcertCycle,
        deleteParamsAsFields: ['musicianID', 'concertID'],
      }
    case "PiecesConcertCycles":
      return {
        fields: entityConfig[entityName].fields,
        getEntity: callAPI.getPiecesConcertCycles,
        createEntity: callAPI.createPieceConcertCycle,
        updateEntity: () => {},
        deleteEntity: callAPI.deletePieceConcertCycle,
        deleteParamsAsFields: ['pieceID', 'concertID'],
      }
    default: {
      console.error("initializeContext called with undefined entityName");
      return null;
    }
  }
}


/**
 * Provides the appropriate context provider based on the passed entity name. The entity name **MUST** have
 * a corresponding definition in entityConfig.json and be one of the defined entityNames
 *
 * @param {Object} props
 * @param {entityName} props.entityName 
 * @param {JSX.Element} props.children
 * @returns {JSX.Element}
 */
export default function EntityAPIProvider({ entityName, children }) {
  // provide the entityAPI
  return(
    <EntityAPIContext.Provider value={initializeContext(entityName)}>
      {children}
    </EntityAPIContext.Provider>
  );
}


/**
 * Returns the entityAPI context hook provided by an EntityAPIProvider See {@link module:callAPI callAPI}
 *
 * @returns {entityContext}
 * @throws Error if the entity or context provider not defined
 */
export function useEntity() {
  /**
   * Before returning the context hook, we need to make sure the context was actually provided. This helps
   * keep the code extensible if we want to add additional entities later. A very good explanation about this
   * strategy, and the place we learned it from, is provided by Kent Dodd's blogpost about custom provider hooks:
   * https://kentcdodds.com/blog/how-to-use-react-context-effectively#the-custom-provider-component
   */
  if (EntityAPIContext === null) {
    throw new Error("useEntity may only be called from within an EntityAPIProvider");
  }

  // get the context and make sure it was actually populated
  const entityAPI = useContext(EntityAPIContext);
  if (entityAPI === null) {
    throw new Error("EntityAPIContext was called with an undefined entity");
  }

  return entityAPI;
}
