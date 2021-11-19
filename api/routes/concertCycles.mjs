import express from "express";
import db from "../database/db_connector.mjs";

const concertCycles = express.Router();

/**
 * CREATE  POST    /api/ConcertCycles
 * READ    GET     /api/ConcertCycles
 * UPDATE  PUT     /api/ConcertCycles?id=...
 * DELETE  DELETE  /api/ConcertCycles?id=...
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
      res.status(400).json(error);
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
      res.status(503).json(error);
    } else {
      res.status(200).json(rows);
    }
  });
});


// UPDATE
concertCycles.put("/", (req, res) => {
  // get body and query params
  let id = req.query.id;
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
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  const updateQuery = "UPDATE ConcertCycles SET concertTitle = ?, startDate = ?, endDate = ?, " +
                      "conductorFirstName = ?, conductorLastName = ?, soloistFirstName = ?, " +
                      "soloistLastName = ? WHERE id = ?;"

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
      id
    ],
    (error) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(200).json({ status: "OK" });
      }
    }
  );
});


// DELETE
concertCycles.delete("/", (req, res) => {
  // get query params
  let id = req.query.id;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  const deleteQuery = "DELETE FROM ConcertCycles WHERE id = ?;"

  db.query(deleteQuery, [id],(error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});


export default concertCycles;
