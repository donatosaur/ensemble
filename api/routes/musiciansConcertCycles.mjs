import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";

const musiciansConcertCycles = express.Router();

/**
 * CREATE  POST    /api/MusiciansConcertCycles
 * READ    GET     /api/MusiciansConcertCycles
 * DELETE  DELETE  /api/MusiciansConcertCycles?musicianID=...&concertID=...
 */

// CREATE
musiciansConcertCycles.post("/", (req, res) => {
  const values = [
    safeParseInt(req.body.musicianID),
    safeParseInt(req.body.concertID),
  ];

  const insertQuery = "INSERT INTO MusiciansConcertCycles (musicianID, concertID) VALUES (?, ?);";
  db.query(insertQuery, values, sendResponse.insertResponse(res));
});

// READ
musiciansConcertCycles.get("/", (req, res) => {
  const selectQuery = "SELECT Musicians.id AS musicianID, CONCAT_WS(' ', Musicians.firstName, Musicians.lastName) " +
                      "AS musician, ConcertCycles.id AS concertID, ConcertCycles.concertTitle AS concertCycle FROM " +
                      "Musicians INNER JOIN MusiciansConcertCycles ON Musicians.id = MusiciansConcertCycles.musicianID " +
                      "INNER JOIN ConcertCycles ON ConcertCycles.id = MusiciansConcertCycles.concertID";
  
  db.query(selectQuery, sendResponse.selectResponse(res));
});

// UPDATE is disallowed on this entity
musiciansConcertCycles.put("/", (req, res) => {
  res.status(405).json({status: "Method not allowed"});
});

// DELETE
musiciansConcertCycles.delete("/", (req, res) => {
  const values = [
    safeParseInt(req.query.musicianID),
    safeParseInt(req.query.concertID),
  ];

  const deleteQuery = "DELETE FROM MusiciansConcertCycles WHERE musicianID = ? AND concertID = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default musiciansConcertCycles;
