import React, { createContext, useContext } from "react";
import * as callAPI from "../utils/callAPI";
import entityConfig from "../data/entityConfig.json";

// create the context hook
const EntityAPIContext = createContext(null);

// fetch the data and api calls we want to provide depending on the entity
const initializeContext = (entityName) => {
  switch(entityName) {
    case "Musicians":
      return {
        columnDefs: entityConfig['Musicians']['fields'],
        getEntity: callAPI.getMusicians,
        createEntity: callAPI.createMusician,
        updateEntity: callAPI.updateMusician,
        deleteEntity: callAPI.deleteMusician,
      }
    case "Instruments":
      return {
        columnDefs: entityConfig['Instruments']['fields'],
        getEntity: callAPI.getInstruments,
        createEntity: callAPI.createInstrument,
        updateEntity: callAPI.updateInstrument,
        deleteEntity: callAPI.deleteInstrument,
      }
    case "Pieces":
      return {
        columnDefs: entityConfig['Pieces']['fields'],
        getEntity: callAPI.getPieces,
        createEntity: callAPI.createPiece,
        updateEntity: callAPI.updatePiece,
        deleteEntity: callAPI.deletePiece,
      }
    case "Services":
      return {
        columnDefs: entityConfig['Services']['fields'],
        getEntity: callAPI.getServices,
        createEntity: callAPI.createService,
        updateEntity: callAPI.updateService,
        deleteEntity: callAPI.deleteService,
      }
    case "Venues":
      return {
        columnDefs: entityConfig['Venues']['fields'],
        getEntity: callAPI.getVenues,
        createEntity: callAPI.createVenue,
        updateEntity: callAPI.updateVenue,
        deleteEntity: callAPI.deleteVenue,
      }
    case "ConcertCycles":
      return {
        columnDefs: entityConfig['ConcertCycles']['fields'],
        getEntity: callAPI.getConcertCycles,
        createEntity: callAPI.createConcertCycle,
        updateEntity: callAPI.updateConcertCycle,
        deleteEntity: callAPI.deleteConcertCycle,
      }
    case "MusiciansInstruments":
      return {
        columnDefs: entityConfig['MusiciansInstruments']['fields'],
        getEntity: callAPI.getMusiciansInstruments,
        createEntity: callAPI.createMusicianInstrument,
        updateEntity: null,
        deleteEntity: callAPI.deleteMusicianInstrument,
      }
    case "MusiciansConcertCycles":
      return {
        columnDefs: entityConfig['MusiciansConcertCycles']['fields'],
        getEntity: callAPI.getMusiciansConcertCycles,
        createEntity: callAPI.createMusicianConcertCycle,
        updateEntity: null,
        deleteEntity: callAPI.deleteConcertCycle,
      }
    case "PiecesConcertCycles":
      return {
        columnDefs: entityConfig['PiecesConcertCycles']['fields'],
        getEntity: callAPI.getPiecesConcertCycles,
        createEntity: callAPI.createPieceConcertCycle,
        updateEntity: null,
        deleteEntity: callAPI.deletePieceConcertCycle,
      }
    default: {
      console.warn("initializeContext called with undefined entityName");
      return null;
    }
  }
}


/**
 * Provides the appropriate context provider based on the passed entity name. The entity name **MUST** have
 * a corresponding definition in entityConfig.json and be one of the defined entityNames
 *
 * @param entityName {"Musicians" | "Instruments" | "Pieces" | "Services" | "Venues" | "ConcertCycles" |
 *                    "MusiciansInstruments" | "MusiciansConcertCycles" | "PiecesConcertCycles"}
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function EntityAPIProvider({ entityName, children }) {
  // provide the entityAPI
  return(
    <EntityAPIContext.Provider value={initializeContext(entityName)}>
        {children}
    </EntityAPIContext.Provider>
  )
}


/**
 * Returns the entityAPI context hook provided by an EntityAPIProvider
 *
 * @returns { columnDefs, getEntity, createEntity, updateEntity, deleteEntity }
 * @throws Error if the entity or context provider are undefined
 */
export function useEntity() {
  // make sure the context was actually provided
  if (EntityAPIContext === undefined || EntityAPIContext === null) {
    throw new Error("useEntity may only be called from within an EntityAPIProvider");
  }

  // get the context and make sure it was actually populated
  const entityAPI = useContext(EntityAPIContext);
  if (entityAPI === undefined || entityAPI === null) {
    throw new Error("EntityAPIContext was called with an undefined entity");
  }

  // at this point, we can safely return the context hook
  return entityAPI;
}
