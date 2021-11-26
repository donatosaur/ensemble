import React, { useEffect, useState } from "react";
import { getInstruments, getMusicians, getVenues, getConcertCycles, getPieces } from "../../../utils/callAPI";

/**
 * Options elements with values set to each Instrument's ID but displayed as Instrument Names
 * @returns {JSX.Element}
 */
export const InstrumentOptions = () => {
  const [instruments, setInstruments] = useState([]);

  // get data only when the form is first loaded
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void async function getData() {
      try {
        // get the instrument data
        const instrumentData = await getInstruments();
        setInstruments(instrumentData);
      } catch (error) {
        console.warn(error);
        // this should never happen, but if it does hopefully the express server re-establishes a DB connection
        alert('GET Instruments failed. Please wait a few seconds and refresh the page.');
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, []);

  return(
    <>
      { /* length will be one more than the maximum index, so it won't be a key for any other options */ }
      <option key={instruments.length} value=''>Choose an instrument...</option>
      { instruments.map((instrument, i) => (
          <option key={i} value={instrument.id}>
            {`${instrument.name} (id ${instrument.id})`}
          </option>
        )
      )}
    </>
  );
}


/**
 * Options elements with values set to each Musician's ID but displayed as Musician Names
 * @returns {JSX.Element}
 */
 export const MusicianOptions = () => {
  const [musicians, setMusicians] = useState([]);

  // get data only when the form is first loaded
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void async function getData() {
      try {
        // get the instrument data
        const musicianData = await getMusicians();
        setMusicians(musicianData);
      } catch (error) {
        console.warn(error);
        // this should never happen, but if it does hopefully the express server re-establishes a DB connection
        alert('GET Musicians failed. Please wait a few seconds and refresh the page.');
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, []);

  return(
    <>
      <option key={musicians.length}>Choose a musician...</option>
      { musicians.map((musician, i) => (
          <option key={i} value={musician.id}>
            {`${musician.firstName} ${musician.lastName} (id ${musician.id})`}
          </option>
        )
      )}
    </>
  );
}


/**
 * Options elements with values set to each Venue's ID but displayed as Venue Names
 * @returns {JSX.Element}
 */
 export const VenueOptions = () => {
  const [venues, setVenues] = useState([]);

  // get data only when the form is first loaded
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void async function getData() {
      try {
        // get the instrument data
        const venueData = await getVenues();
        setVenues(venueData);
      } catch (error) {
        console.warn(error);
        // this should never happen, but if it does hopefully the express server re-establishes a DB connection
        alert('GET Venues failed. Please wait a few seconds and refresh the page.');
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, []);

  return(
    <>
      <option key={venues.length} value=''>NULL</option>
      { venues.map((venue, i) => (
          <option key={i} value={venue.id}>
            {`${venue.name} (id ${venue.id})`}
          </option>
        )
      )}
    </>
  );
}


/**
 * Options elements with values set to each ConcertCycle's ID but displayed as Concert Titles
 * @returns {JSX.Element}
 */
 export const ConcertCycleOptions = () => {
  const [concertCycles, setConcertCycles] = useState([]);

  // get data only when the form is first loaded
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void async function getData() {
      try {
        // get the instrument data
        const concertCycleData = await getConcertCycles();
        setConcertCycles(concertCycleData);
      } catch (error) {
        console.warn(error);
        // this should never happen, but if it does hopefully the express server re-establishes a DB connection
        alert('GET ConcertCycles failed. Please wait a few seconds and refresh the page.');
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, []);

  return(
    <>
      <option key={concertCycles.length} value=''>Choose a ConcertCycle...</option>
      { concertCycles.map((concertCycle, i) => (
          <option key={i} value={concertCycle.id}>
            {`${concertCycle.concertTitle} (id ${concertCycle.id})`}
          </option>
        )
      )}
    </>
  );
}


/**
 * Options elements with values set to each Piece's ID but displayed as Piece Titles
 * @returns {JSX.Element}
 */
 export const PieceOptions = () => {
  const [pieces, setPieces] = useState([]);

  // get data only when the form is first loaded
  useEffect(() => {
    const abortController = new AbortController();   // to abort async requests
    void async function getData() {
      try {
        // get the instrument data
        const pieceData = await getPieces();
        setPieces(pieceData);
      } catch (error) {
        console.warn(error);
        // this should never happen, but if it does hopefully the express server re-establishes a DB connection
        alert('GET Pieces failed. Please wait a few seconds and refresh the page.');
      }
    }();
    // prevent memory leaks by aborting request if component is no longer mounted; for an explanation of
    // what cleanup functions do, see https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1
    return () => abortController.abort();
  }, []);

  return(
    <>
      <option key={pieces.length} value=''>Choose a Piece...</option>
      { pieces.map((piece, i) => (
          <option key={i} value={piece.id}>
            {`${piece.pieceTitle} (id ${piece.id})`}
          </option>
        )
      )}
    </>
  );
}
