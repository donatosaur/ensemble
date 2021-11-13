import express from "express";
import db from "../database/db_connector.mjs";

const concertCycles = express.Router();

/**
 * CREATE  POST    /api/ConcertCycles
 * READ    GET     /api/ConcertCycles
 * UPDATE  PUT     /api/ConcertCycles?concertID=...
 * DELETE  DELETE  /api/ConcertCycles?concertID=...
 */


// CREATE
concertCycles.post("/", (req, res) => {
  // destructure body params
  let {
    concertTitle,
    startDate,
    endDate,
    conductorFirstName,
    conductorLastName,
    soloistFirstName,
    soloistLastName,
  } = req.body;

  const insertQuery = "INSERT INTO ConcertCycles (concertTitle, startDate, endDate, conductorFirstName, " +
                      "conductorLastName, soloistFirstName, soloistLastName) VALUES (?, ?, ?, ?, ?, ?, ?);";
                      
  db.query(
    insertQuery, 
    [
      concertTitle,
      startDate,
      endDate,
      conductorFirstName,
      conductorLastName,
      soloistFirstName,
      soloistLastName,
    ],
    (error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json({error: error});
    } else {
      res.status(201).json({status: "Created"});
    }
  });
});


// READ
concertCycles.get("/", (req, res) => {
  db.query("SELECT * FROM ConcertCycles;", (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      res.status(200).json({ status: "OK", data: rows });
    }
  });
});


// UPDATE
concertCycles.put("/", (req, res) => {
  // get body and query params
  let concertID = req.query.concertID;
  let {
    concertTitle,
    startDate,
    endDate,
    conductorFirstName,
    conductorLastName,
    soloistFirstName,
    soloistLastName,
  } = req.body;

  // parse
  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  const updateQuery = "UPDATE ConcertCycles SET concertTitle = ?, startDate = ?, endDate = ?, " +
                      "conductorFirstName = ?, conductorLastName = ?, soloistFirstName = ?, " +
                      "soloistLastName = ? WHERE concertID = ?;"

  db.query(
    updateQuery,
    [
      concertTitle,
      startDate,
      endDate,
      conductorFirstName,
      conductorLastName,
      soloistFirstName,
      soloistLastName,
      concertID
    ],
    (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ status: "OK" });
      }
    }
  );
});


// DELETE
concertCycles.delete("/", (req, res) => {
  // get query params
  let concertID = req.query.concertID;

  // parse
  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  const deleteQuery = "DELETE FROM Pieces WHERE pieceID = ?;"

  db.query(deleteQuery, [concertID],(error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});


export default concertCycles;
