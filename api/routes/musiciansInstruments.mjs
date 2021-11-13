import express from "express";
import db from "../database/db_connector.mjs";

const musiciansInstruments = express.Router();


/**
 * CREATE  POST    /api/MusiciansInstruments
 * READ    GET     /api/MusiciansInstruments
 * DELETE  DELETE  /api/MusiciansInstruments?musicianID=...&instrumentID=...
 */


// CREATE
musiciansInstruments.post('/', (req, res) => {
  // destructure body params (use let here because we will need to parse)
  let { musicianID = null, instrumentID = null } = req.body;

  // attempt to parse int values (fall back to null)
  musicianID = isNaN(parseInt(musicianID)) ? null : parseInt(musicianID);
  instrumentID = isNaN(parseInt(instrumentID)) ? null : parseInt(instrumentID);

  const insertQuery = `INSERT INTO MusiciansInstruments (musicianID, instrumentID) VALUES (${musicianID}, ${instrumentID})`;

  db.query(insertQuery, (error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json({error: error});
    } else {
      res.status(201).json( {status: "created"});
    }
  });
});


// READ
musiciansInstruments.get("/", (req, res) => {
  db.query(`SELECT * FROM MusiciansInstruments;`, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(503).json({ error: error });
    } else {
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});


// UPDATE is disallowed on this entity
musiciansInstruments.put("/", (req, res) => {
  res.status(405).send();
});


musiciansInstruments.delete("/",  (req, res) => {
  // destructure as we did for the patch request
  let [musicianID, instrumentID] = [req.query.musicianID, req.query.instrumentID];

  // parse as we did for the patch request
  musicianID = isNaN(parseInt(musicianID)) ? null : parseInt(musicianID);
  instrumentID = isNaN(parseInt(instrumentID)) ? null : parseInt(instrumentID);

  const deleteQuery = `DELETE FROM MusiciansInstruments WHERE musicianID = ${musicianID} AND instrumentID = ${instrumentID};`

  db.query(deleteQuery, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

export default musiciansInstruments;