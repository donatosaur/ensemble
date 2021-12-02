/**
 * @module callAPI
 *
 * All API calls made by the frontend are located in this file, with the following notation:
 *
 *    * `API_BASE` means the base url for all API endpoints. This could be a full URL or simply the relative
 *      path to the endpoints (e.g. /api if all endpoints are located at http://localhost/api/...). This
 *      value is expected to be a constant declared at the top of the module.
 *
 *    * `path` means the path relative to API_BASE for a particular endpoint; this means that the expected
 *      path for something like "http://localhost/api/Musicians" would be "Musicians"
 *
 *
 * API calls are guaranteed to resolve to the following:
 *    * getEntities: JSON array if successful; string if rejected
 *    * createEntity: JSON object if successful; string if rejected
 *    * updateEntity: JSON object if successful; string if rejected
 *    * deleteEntity: JSON object if successful; string if rejected
 */

// set API path
const API_BASE = "/api";


// ------------------------------------ Musicians -----------------------------------
/**
 * Issues a GET request for Musicians
 *
 * @param {Object} [searchParameters] key-value pairs to filter (search) rows
 * @returns {Promise} a promise resolving to all rows for the Musicians table
 *                    (optionally, that match the searchParameters passed)
 */
export async function getMusicians(searchParameters) {
  if (!!searchParameters) {
    let path = "Musicians";
    Object.entries(searchParameters).forEach(([key, value], i) => {
      // slot ?key=value if this is the first search parameter, otherwise string together with &
      path = i === 0 ? `${path}?${key}=${value}` : `${path}&${key}=${value}`;
    });
    return await sendGetRequest(path);
  } else {
    return await sendGetRequest("Musicians");
  }
}

/**
 * Issues a POST requests for Musicians
 *
 * @param {Object} body field-value pairs representing Musicians data
 * @returns {Promise} a promise resolving to server response
 */
export const createMusician = async (body) => await sendPostRequest("Musicians", body);


/**
 * Issues a PUT request for Musicians
 *
 * @param {Object} body field-value pairs representing Musicians data
 * @returns {Promise} a promise resolving to server response
 */
export const updateMusician = async (body) => {
  // split id from response body
  const {id, ...rest} = body;
  return await sendPutRequest("Musicians", rest, `id=${id}`);
}


/**
 * Issues a DELETE request for Musicians
 *
 * @param {string | number} id the musicianID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteMusician = async (id) => {
  return await sendDeleteRequest("Musicians", `id=${id}`);
}


// ----------------------------------- Instruments -----------------------------------
/**
 * Issues a GET request for Instruments
 *
 * @returns {Promise} a promise resolving to all rows for the Instruments table
 */
export const getInstruments = async () => await sendGetRequest("Instruments");


/**
 * Issues a POST request for Instruments
 *
 * @param {Object} body field-value pairs representing Instruments data
 * @returns {Promise} a promise resolving to server response
 */
export const createInstrument = async (body) => await sendPostRequest("Instruments", body);


/**
 * Issues a PUT request for Instruments
 *
 * @param {Object} body field-value pairs representing Instruments data
 * @returns {Promise} a promise resolving to server response
 */
export const updateInstrument = async (body) => {
  const {id, ...rest} = body;
  return await sendPutRequest("Instruments", rest, `id=${id}`);
}


/**
 * Issues a DELETE request for Instruments
 *
 * @param {string | number} id the instrumentID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteInstrument = async (id) => {
  return await sendDeleteRequest("Instruments", `id=${id}`);
}


// ------------------------------------- Venues --------------------------------------
/**
 * Issues a GET request for Venues
 *
 * @returns {Promise} a promise resolving to all rows for the Venues table
 */
export const getVenues = async () => await sendGetRequest("Venues");


/**
 * Issues a POST request for Venues
 *
 * @param {Object} body field-value pairs representing Venues data
 * @returns {Promise} a promise resolving to server response
 */
export const createVenue = async (body) => await sendPostRequest("Venues", body);


/**
 * Issues a PUT request for Venues
 *
 * @param {Object} body field-value pairs representing Venues data
 * @returns {Promise} a promise resolving to server response
 */
export const updateVenue = async (body) => {
  const {id, ...rest} = body;
  return await sendPutRequest("Venues", rest, `id=${id}`);
}


/**
 * Issues a DELETE request for Venues
 *
 * @param {string | number} id the venueID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteVenue = async (id) => {
  return await sendDeleteRequest("Venues", `id=${id}`);
}


// ---------------------------------- ConcertCycles ----------------------------------
/**
 * Issues a GET request for ConcertCycles
 *
 * @returns {Promise} a promise resolving to all rows for the ConcertCycles table
 */
export const getConcertCycles = async () => await sendGetRequest("ConcertCycles");


/**
 * Issues a POST request for ConcertCycles
 *
 * @param {Object} body field-value pairs representing ConcertCycles data
 * @returns {Promise} a promise resolving to server response
 */
export const createConcertCycle = async (body) => await sendPostRequest("ConcertCycles", body);


/**
 * Issues a PUT request for ConcertCycles
 *
 * @param {Object} body field-value pairs representing ConcertCycles data
 * @returns {Promise} a promise resolving to server response
 */
export const updateConcertCycle = async (body) => {
  const {id, ...rest} = body;
  return await sendPutRequest("ConcertCycles", rest, `id=${id}`);
}


/**
 * Issues a DELETE request for ConcertCycles
 *
 * @param {string | number} id the concertID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteConcertCycle = async (id) => {
  return await sendDeleteRequest("ConcertCycles", `id=${id}`);
}


// ------------------------------------- Services ------------------------------------
/**
 * Issues a GET request for Services
 *
 * @returns {Promise} a promise resolving to all rows for the Services table
 */
export const getServices = async () => {
  /**
   * DATETIME SQL strings will be in the form `YYYY-MM-DD HH:mm:ss` but the HTML spec for
   * datetime-local is `YYYY=MM-DDTHH:mm:ss`, so we need to convert all these values; normally
   * this sort of consistency should be enforced on the backend but it was easier to handle it
   * here in order to maintain compliance with the project requirements\
   */
  /** @type {Object[]} */
  const services = await sendGetRequest("Services");
  services.forEach((service) => {
    if (service?.startTime !== undefined) {
      service.startTime = service.startTime.toString().replace(' ', 'T');
    }
    if (service ?.endTime !== undefined) {
      service.endTime = service.endTime.toString().replace(' ', 'T');
    }
  });
  return services;
}


/**
 * Issues a POST request for Services
 *
 * @param {Object} body field-value pairs representing Services data
 * @returns {Promise} a promise resolving to server response
 */
export const createService = async (body) => await sendPostRequest("Services", body);


/**
 * Issues a PUT request for Services
 *
 * @param {Object} body field-value pairs representing Services data
 * @returns {Promise} a promise resolving to server response
 */
export const updateService = async (body) => {
  const {id, ...rest} = body;
  return await sendPutRequest("Services", rest, `id=${id}`);
}


/**
 * Issues a DELETE request for Services
 *
 * @param {string | number} id the serviceID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteService = async (id) => {
  return await sendDeleteRequest("Services", `id=${id}`);
}


// -------------------------------------- Pieces -------------------------------------
/**
 * Issues a GET request for Pieces
 *
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getPieces = async () => await sendGetRequest("Pieces");


/**
 * Issues a POST request for Pieces
 *
 * @param {Object} body field-value pairs representing Pieces data
 * @returns {Promise} a promise resolving to server response
 */
export const createPiece = async (body) => await sendPostRequest("Pieces", body);


/**
 * Issues a PUT request for Pieces
 *
 * @param {Object} body field-value pairs representing Pieces data
 * @returns {Promise} a promise resolving to server response
 */
export const updatePiece = async (body) => {
  const {id, ...rest} = body;
  return await sendPutRequest("Pieces", rest, `id=${id}`);
}


/**
 * Issues a DELETE request for Pieces
 *
 * @param {string | number} id the pieceID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deletePiece = async (id) => {
  return await sendDeleteRequest("Pieces", `id=${id}`);
}


// ------------------------------ MusiciansInstruments -------------------------------
/**
 * Issues a GET request for MusiciansInstruments
 *
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getMusiciansInstruments = async () => await sendGetRequest("MusiciansInstruments");


/**
 *  Issues a POST request for MusiciansInstruments
 *
 * @param {Object} body field-value pairs representing MusiciansInstruments data
 * @returns {Promise} a promise resolving to server response
 */
export const createMusicianInstrument = async (body) => await sendPostRequest("MusiciansInstruments", body);


/**
 * Issues a DELETE request for MusiciansInstruments
 *
 * @param {string | number} musicianID the musicianID of the row to be deleted
 * @param {string | number} instrumentID the instrumentID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteMusicianInstrument = async (musicianID, instrumentID) => {
  const queryString = `musicianID=${musicianID}&instrumentID=${instrumentID}`
  return await sendDeleteRequest("MusiciansInstruments", queryString);
}


// ------------------------------ MusiciansConcertCycles ------------------------------
/**
 * Issues a GET request for MusiciansConcertCycles
 *
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getMusiciansConcertCycles = async () => await sendGetRequest("MusiciansConcertCycles");


/**
 * Issues a POST request for MusiciansConcertCycles
 *
 * @param {Object} body field-value pairs representing MusiciansConcertCycles data
 * @returns {Promise} a promise resolving to server response
 */
export const createMusicianConcertCycle = async (body) => await sendPostRequest("MusiciansConcertCycles", body);


/**
 * Issues a DELETE request for MusiciansConcertCycles
 *
 * @param {string | number} musicianID the pieceID of the row to be deleted
 * @param {string | number} concertID the concertID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deleteMusicianConcertCycle = async (musicianID, concertID) => {
  const queryString = `musicianID=${musicianID}&concertID=${concertID}`
  return await sendDeleteRequest("MusiciansConcertCycles", queryString);
}


// ------------------------------- PiecesConcertCycles --------------------------------
/**
 * Issues a GET request for PiecesConcertCycles
 *
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getPiecesConcertCycles = async () => await sendGetRequest("PiecesConcertCycles");


/**
 * Issues a POST request for PiecesConcertCycles
 *
 * @param {Object} body field-value pairs representing PiecesConcertCycles data
 * @returns {Promise} a promise resolving to server response
 */
export const createPieceConcertCycle = async (body) => await sendPostRequest("PiecesConcertCycles", body);


/**
 * Issues a DELETE request for PiecesConcertCycles
 *
 * @param {string | number} pieceID the pieceID of the row to be deleted
 * @param {string | number} concertID the concertID of the row to be deleted
 * @returns {Promise} a promise resolving to server response
 */
export const deletePieceConcertCycle = async (pieceID, concertID) => {
  const queryString = `pieceID=${pieceID}&concertID=${concertID}`
  return await sendDeleteRequest("PiecesConcertCycles", queryString);
}


// ----------------------------------------------  HELPERS  ----------------------------------------------
 /**
 * GET requests
  *
 * @param {string} path the entity's path
 * @returns {Promise} a promise resolving to the rows returned for that entity
 */
async function sendGetRequest(path) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: "GET",
  });
  return await handleResponse(response);
}

/**
 * POST requests
 *
 * @param {string} path the entity's path
 * @param {Object} body a JSON-compatible object
 * @returns {Promise} a promise resolving to server response
 */
async function sendPostRequest(path, body) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await handleResponse(response);
}

/**
 * PUT requests
 *
 * @param {string} path the entity's path
 * @param {Object} body a JSON-compatible object
 * @param {string} queryString a query string consisting of entityID-value pairs(s) *without* a leading `?` character
 * @param {function} [replacer] a {@link https://mzl.la/2YNrn8W replacer function}
 * @returns {Promise} a promise resolving to server response
 */
async function sendPutRequest(path, body, queryString, replacer = null) {
  const response = await fetch(`${API_BASE}/${path}?${queryString}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body, replacer),
  });
  return await handleResponse(response);
}

/**
 * DELETE requests
 *
 * @param {string} path the entity's path
 * @param {string} queryString a query string consisting of entityID-value pairs(s) *without* a leading `?` character
 * @returns {Promise} a promise resolving to server response
 */
async function sendDeleteRequest(path, queryString) {
  const response = await fetch(`${API_BASE}/${path}?${queryString}`, {
    method: "DELETE"
  });
  return await handleResponse(response);
}

/**
 * Parses the response. Resolves to {@type Object} if successful, {@type string} if rejected.
 *
 * @param {Response} response response object
 */
async function handleResponse(response) {
  // attempt to parse the response as JSON
  let parsedResponse;
  try {
    parsedResponse = await response.json();
  } catch (error) {
    // this will happen only when the response was not formatted as JSON; this isn't expected, but is here
    // for safety: we should have a way to handle unexpected response types
    console.error('Error parsing response: response was not formatted as JSON');
    return Promise.reject(`${response.status}: ${response.statusText}`);
  }

  /**
   * At this point, we have a valid JSON object, but we must still check whether the response was successful. If
   * it wasn't, reject the promise in a way that is consistent by resolving to a string as the reason for rejection.
   * If the backend sends back an error message from the sql database, that error message is helpful and will be
   * used as the reason for rejection; otherwise, we can fall back to the status text.
   */
  if (!response.ok) {
    return Promise.reject(parsedResponse?.sqlMessage ?? `${response.status}: ${response.statusText}`)
  }
  return parsedResponse;
}