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
  // destructure body params
  let { musicianID, instrumentID } = req.body;

  // parse (fall back to null)
  musicianID = parseInt(musicianID);
  musicianID = isNaN(musicianID) ? null : musicianID;

  instrumentID = parseInt(instrumentID);
  instrumentID = isNaN(instrumentID) ? null : instrumentID;

  const insertQuery = "INSERT INTO MusiciansInstruments (musicianID, instrumentID) VALUES (?, ?);";

  db.query(insertQuery, [musicianID, instrumentID], (error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(201).json( {status: "Created"});
    }
  });
});


// READ
musiciansInstruments.get("/", (req, res) => {
  let selectQuery= "SELECT Musicians.id as musicianID, Musicians.firstName, Musicians.lastName, Instruments.id as instrumentID, Instruments.name " +
  "FROM Musicians INNER JOIN MusiciansInstruments ON Musicians.id = MusiciansInstruments.musicianID INNER JOIN Instruments ON MusiciansInstruments.instrumentID = Instruments.id;"

  // db.query("SELECT * FROM MusiciansInstruments;", (error, rows) => {
  db.query(selectQuery, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(503).json(error);
    } else {
      res.status(200).json(rows);
    }
  });
});


// UPDATE is disallowed on this entity
musiciansInstruments.put("/", (req, res) => {
  res.status(405).json({status: "Method not allowed"});
});


// DELETE
musiciansInstruments.delete("/",  (req, res) => {
  // get query params
  let [musicianID, instrumentID] = [req.query.musicianID, req.query.instrumentID];

  // parse
  musicianID = parseInt(musicianID);
  musicianID = isNaN(musicianID) ? null : musicianID;

  instrumentID = parseInt(instrumentID);
  instrumentID = isNaN(instrumentID) ? null : instrumentID;

  const deleteQuery = "DELETE FROM MusiciansInstruments WHERE musicianID = ? AND instrumentID = ?;";

  db.query(deleteQuery, [musicianID, instrumentID],(error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default musiciansInstruments;
