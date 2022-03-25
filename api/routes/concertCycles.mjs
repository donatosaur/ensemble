import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";


const concertCycles = express.Router();

/**
 * CREATE  POST    /api/ConcertCycles
 * READ    GET     /api/ConcertCycles
 * UPDATE  PUT     /api/ConcertCycles?id=...
 * DELETE  DELETE  /api/ConcertCycles?id=...
 */


// CREATE
concertCycles.post("/", (req, res) => {
  const values = [
    req.body.concertTitle,
    req.body.startDate,
    req.body.endDate,
    req.body.conductorFirstName,
    req.body.conductorLastName,
    req.body.soloistFirstName,
    req.body.soloistLastName,
  ];

  const insertQuery = "INSERT INTO ConcertCycles (concertTitle, startDate, endDate, conductorFirstName, " +
                      "conductorLastName, soloistFirstName, soloistLastName) VALUES (?, ?, ?, ?, ?, ?, ?);";

  db.query(insertQuery, values, sendResponse.insertResponse(res));
});

// READ
concertCycles.get("/", (req, res) => {
  db.query("SELECT * FROM ConcertCycles;", sendResponse.selectResponse(res));
});


// UPDATE
concertCycles.put("/", (req, res) => {
  const values = [
    safeParseInt(req.query.id),
    req.body.concertTitle,
    req.body.startDate,
    req.body.endDate,
    req.body.conductorFirstName,
    req.body.conductorLastName,
    req.body.soloistFirstName,
    req.body.soloistLastName,
  ];

  const updateQuery = "UPDATE ConcertCycles SET concertTitle = ?, startDate = ?, endDate = ?, " +
                      "conductorFirstName = ?, conductorLastName = ?, soloistFirstName = ?, " +
                      "soloistLastName = ? WHERE id = ?;";

  db.query(updateQuery, values, sendResponse.updateResponse(res));
});


// DELETE
concertCycles.delete("/", (req, res) => {
  const values = [safeParseInt(req.query.id)];
  const deleteQuery = "DELETE FROM ConcertCycles WHERE id = ?;";
  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});


export default concertCycles;
