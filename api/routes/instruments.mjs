import express from "express";
import db from "../database/db_connector.mjs";
import services from "./services.mjs";

const instruments = express.Router();


/**
 * CREATE  POST    /api/Instruments
 * READ    GET     /api/Instruments
 * UPDATE  PUT     /api/Instruments?instrumentID=...
 * DELETE  DELETE  /api/Instruments?instrumentID=...
 */


// CREATE
instruments.post("/", (req, res) => {
  // destructure body params
  let { name } = req.body;

  const insertQuery = "INSERT INTO Instruments (name) VALUE (?);"

  db.query(insertQuery, [name],(error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json({error: error});
    } else {
      res.status(201).json( {status: "Created"});
    }
  });
});


// READ
instruments.get("/", (req, res) => {
  db.query("SELECT * FROM Pieces;", (error, rows) => {
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
instruments.put("/", (req, res) => {
  // destructure
  let { name } = req.body;

  // parse
  let instrumentID = parseInt(req.query.instrumentID);
  instrumentID = isNaN(instrumentID) ? null : instrumentID;

  const updateQuery = "UPDATE Instruments SET name = ? WHERE instrumentID = ?";

  db.query(updateQuery, [name, instrumentID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

services.delete("/",  (req, res) => {
  // parse
  let instrumentID = parseInt(req.query.instrumentID);
  instrumentID = isNaN(instrumentID) ? null : instrumentID;

  const deleteQuery = `DELETE FROM Services WHERE serviceID = ?;`

  db.query(deleteQuery, [instrumentID],(error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default instruments;
