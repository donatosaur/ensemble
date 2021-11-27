import express from "express";
import db from "../database/db_connector.mjs";

const musiciansConcertCycles = express.Router();

/**
 * CREATE  POST    /api/MusiciansConcertCycles
 * READ    GET     /api/MusiciansConcertCycles
 * DELETE  DELETE  /api/MusiciansConcertCycles?musicianID=...&concertID=...
 */

// CREATE
musiciansConcertCycles.post("/", (req, res) => {
  // destructure body params
  let { musicianID, concertID } = req.body;

  // parse (fall back to null)
  musicianID = parseInt(musicianID);
  musicianID = isNaN(musicianID) ? null : musicianID;

  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  const insertQuery = "INSERT INTO MusiciansConcertCycles (musicianID, concertID) VALUES (?, ?);";

  db.query(insertQuery, [musicianID, concertID], (error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(201).json({ status: "Created" });
    }
  });
});

// READ
musiciansConcertCycles.get("/", (req, res) => {
  const selectQuery = "SELECT Musicians.id AS musicianID, CONCAT_WS(' ', Musicians.firstName, Musicians.lastName) " +
                      "AS musician, ConcertCycles.id AS concertID, ConcertCycles.concertTitle AS concertCycle FROM " +
                      "Musicians INNER JOIN MusiciansConcertCycles ON Musicians.id = MusiciansConcertCycles.musicianID " +
                      "INNER JOIN ConcertCycles ON ConcertCycles.id = MusiciansConcertCycles.concertID"
  db.query(selectQuery, (error, rows) => {
    // db.query("SELECT * FROM MusiciansConcertCycles;", (error, rows) => {
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
musiciansConcertCycles.put("/", (req, res) => {
  res.status(405).json({status: "Method not allowed"});
});

// DELETE
musiciansConcertCycles.delete("/", (req, res) => {
  // get query params
  let [musicianID, concertID] = [req.query.musicianID, req.query.concertID];

  // parse
  musicianID = parseInt(musicianID);
  musicianID = isNaN(musicianID) ? null : musicianID;

  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  const deleteQuery = "DELETE FROM MusiciansConcertCycles WHERE musicianID = ? AND concertID = ?;";

  db.query(deleteQuery, [musicianID, concertID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default musiciansConcertCycles;
