import express from "express";
import db from "../database/db_connector.mjs";

const instruments = express.Router();


/**
 * CREATE  POST    /api/Instruments
 * READ    GET     /api/Instruments
 * UPDATE  PUT     /api/Instruments?id=...
 * DELETE  DELETE  /api/Instruments?id=...
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
      res.status(400).json(error);
    } else {
      res.status(201).json( {status: "Created"});
    }
  });
});


// READ
instruments.get("/", (req, res) => {
  db.query("SELECT * FROM Instruments;", (error, rows) => {
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
instruments.put("/", (req, res) => {
  // destructure
  let { name } = req.body;

  // parse
  let id = parseInt(req.query.id);
  id = isNaN(id) ? null : id;

  const updateQuery = "UPDATE Instruments SET name = ? WHERE id = ?";

  db.query(updateQuery, [name, id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

instruments.delete("/",  (req, res) => {
  // parse
  let id = parseInt(req.query.id);
  id = isNaN(id) ? null : id;

  const deleteQuery = `DELETE FROM Instruments WHERE id = ?;`

  db.query(deleteQuery, [id],(error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default instruments;
