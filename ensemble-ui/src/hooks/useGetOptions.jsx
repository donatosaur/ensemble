/* eslint-disable comma-dangle */
import { useEffect, useState } from "react";
import {
  getInstruments,
  getMusicians,
  getVenues,
  getConcertCycles,
  getPieces,
} from "../utils/callAPI";

/**
 * @module useGetOptions
 */

/**
 * Fetches and sets option elements set to each Instrument"s ID but displayed with Instrument Names
 * @returns {JSX.Element}
 */
export const useGetInstrumentOptions = () => {
  const [instrumentOptions, setInstrumentOptions] = useState(null);
  const [error, setError] = useState(null);

  // when this hook is called and the page first renders, get instrument data and store it as a list of
  // <option> jsx elements
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void (async () => {
      try {
        const instrumentData = await getInstruments();
        setInstrumentOptions(
          <>
            { /* length will be one more than the maximum index, so it won"t be a key for any other options */}
            <option key={instrumentData.length} value="">Choose an instrument...</option>
            {instrumentData.map((instrument) => (
              <option key={instrument.id} value={instrument.id}>
                {`${instrument.name} (id ${instrument.id})`}
              </option>
            ))}
          </>
        );
      } catch (err) {
        // this should never happen, but if it does hopefully the express server re-establishes a DB connection
        setError("GET Instruments failed. Please wait a few seconds and refresh the page.");
      }
    })();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, []);

  return { instrumentOptions, error };
};

/**
 * Fetches and sets option elements set to each Musician"s ID but displayed as Musician Names
 * @returns {JSX.Element}
 */
export const useGetMusicianOptions = () => {
  const [musicianOptions, setMusicianOptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void (async () => {
      try {
        const musicianData = await getMusicians();
        setMusicianOptions(
          <>
            <option key={musicianData.length} value="">Choose a musician...</option>
            { musicianData.map((musician) => (
              <option key={musician.id} value={musician.id}>
                {`${musician.firstName} ${musician.lastName} (id ${musician.id})`}
              </option>
            ))}
          </>
        );
      } catch (err) {
        setError("GET Musicians failed. Please wait a few seconds and refresh the page.");
      }
    })();
    return () => abortController.abort();
  }, []);

  return { musicianOptions, error };
};

/**
 * Fetches and sets option elements set to each Piece"s ID but displayed as Piece Titles
 * @returns {JSX.Element}
 */
export const useGetPieceOptions = () => {
  const [pieceOptions, setPieceOptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void (async () => {
      try {
        const pieceData = await getPieces();
        setPieceOptions(
          <>
            <option key={pieceData.length} value="">Choose a Piece...</option>
            { pieceData.map((piece) => (
              <option key={piece.id} value={piece.id}>
                {`${piece.pieceTitle} (id ${piece.id})`}
              </option>
            ))}
          </>
        );
      } catch (err) {
        setError("GET Venues failed. Please wait a few seconds and refresh the page.");
      }
    })();
    return () => abortController.abort();
  }, []);

  return { pieceOptions, error };
};

/**
 * Fetches and sets option elements set to each Venue"s ID but displayed as Venue Names
 * @returns {JSX.Element}
 */
export const useGetVenueOptions = () => {
  const [venueOptions, setVenueOptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void (async () => {
      try {
        const venueData = await getVenues();
        setVenueOptions(
          <>
            <option key={venueData.length} value="">NULL</option>
            { venueData.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {`${venue.name} (id ${venue.id})`}
              </option>
            ))}
          </>
        );
      } catch (err) {
        setError("GET Venues failed. Please wait a few seconds and refresh the page.");
      }
    })();
    return () => abortController.abort();
  }, []);

  return { venueOptions, error };
};

/**
 * Fetches and sets option elements set to each ConcertCycle"s ID but displayed as Concert Titles
 * @returns {JSX.Element}
 */
export const useGetConcertOptions = () => {
  const [concertOptions, setConcertOptions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void (async () => {
      try {
        // get venue and concert data
        const concertData = await getConcertCycles();
        setConcertOptions(
          <>
            <option key={concertData.length} value="">Choose a ConcertCycle...</option>
            {concertData.map((concertCycle) => (
              <option key={concertCycle.id} value={concertCycle.id}>
                {`${concertCycle.concertTitle} (id ${concertCycle.id})`}
              </option>
            ))}
          </>
        );
      } catch (err) {
        setError("GET ConcertCycles failed. Please wait a few seconds and refresh the page.");
      }
    })();
    return () => abortController.abort();
  }, []);

  return { concertOptions, error };
};
