import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";


const musiciansInstruments = express.Router();


/**
 * CREATE  POST    /api/MusiciansInstruments
 * READ    GET     /api/MusiciansInstruments
 * DELETE  DELETE  /api/MusiciansInstruments?musicianID=...&instrumentID=...
 */


// CREATE
musiciansInstruments.post('/', (req, res) => {
  const values = [
    safeParseInt(req.body.musicianID),
    safeParseInt(req.body.instrumentID),
  ];

  const insertQuery = "INSERT INTO MusiciansInstruments (musicianID, instrumentID) VALUES (?, ?);";

  db.query(insertQuery, values, sendResponse.insertResponse(res));
});


// READ
musiciansInstruments.get("/", (req, res) => {
  const selectQuery= "SELECT Musicians.id AS musicianID, CONCAT_WS(' ', Musicians.firstName, Musicians.lastName) AS " +
                   "musician, Instruments.id AS instrumentID, Instruments.name AS instrument FROM Musicians " +
                   "INNER JOIN MusiciansInstruments ON Musicians.id = MusiciansInstruments.musicianID " +
                   "INNER JOIN Instruments ON MusiciansInstruments.instrumentID = Instruments.id;";

  db.query(selectQuery, sendResponse.selectResponse(res));
});


// UPDATE is disallowed on this entity
musiciansInstruments.put("/", (req, res) => {
  res.status(405).json({status: "Method not allowed"});
});


// DELETE
musiciansInstruments.delete("/",  (req, res) => {
  const values = [
    safeParseInt(req.query.musicianID),
    safeParseInt(req.query.instrumentID),
  ];

  const deleteQuery = "DELETE FROM MusiciansInstruments WHERE musicianID = ? AND instrumentID = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default musiciansInstruments;
