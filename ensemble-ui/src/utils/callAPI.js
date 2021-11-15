// set API path
const API_BASE = "/api";


// ------------------------------------ Musicians -----------------------------------
/**
 * @param {object=} [searchParameters] key-value pairs to filter (search) rows
 * @returns {Promise} a promise resolving to all rows for the Instruments table
 */
export async function getMusicians(searchParameters) {
  if (!!searchParameters) {
    let path = "Musicians";
    Object.entries(searchParameters).forEach(([key, value], i) => {
      // slot ?key=value if this is the first 
      path = i === 0 ? `${path}?${key}=${value}` : `${path}&${key}=${value}`;
    });
    return await sendGetRequest(path)
   } else {
    return await sendGetRequest("Musicians");
   }
 }



// ----------------------------------- Instruments -----------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Instruments table
 */
export const getInstruments = async () => await sendGetRequest("Instruments");




// ------------------------------------- Venues --------------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Venues table
 */
export const getVenues = async () => await sendGetRequest("Venues");



// ---------------------------------- ConcertCycles ----------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the ConcertCycles table
 */
export const getConcertCycles = async () => await sendGetRequest("ConcertCycles");



// ------------------------------------- Services ------------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Services table
 */
export const getServices = async () => await sendGetRequest("Services");



// -------------------------------------- Pieces -------------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getPieces = async () => await sendGetRequest("Pieces");


// ------------------------------ MusiciansInstruments -------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getMusiciansInstruments = async () => await sendGetRequest("MusiciansInstruments");


// ------------------------------ MusiciansConcertCycles ------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getMusiciansConcertCycles = async () => await sendGetRequest("MusiciansConcertCycles");



// ------------------------------- PiecesConcertCycles --------------------------------
/**
 * @returns {Promise} a promise resolving to all rows for the Pieces table
 */
export const getPiecesConcertCycles = async () => await sendGetRequest("PiecesConcertCycles");




// ----------------------------------------------  HELPERS  ----------------------------------------------
/**
 * Since we're just sending basic GET requests for most of the endpoints here, this will help reduce
 * code duplication.
 * 
 * @param {string} path the entity's path
 * @returns {Promise} a promise resolving to the rows returned for that entity
 */
 async function sendGetRequest(path) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: 'GET',
  });

  if (!response.ok) {
    return Promise.reject(await response.json());
  }
  return await response.json();
}
