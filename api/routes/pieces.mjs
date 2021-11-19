import express from "express";
import db from "../database/db_connector.mjs";

const pieces = express.Router();


/**
 * CREATE  POST    /api/Pieces
 * READ    GET     /api/Pieces
 * UPDATE  PUT     /api/Pieces?id=...
 * DELETE  DELETE  /api/Pieces?id=...
 */


// CREATE
pieces.post("/", (req, res) => {
  // get body params
  let {
    pieceTitle,
    composerFirstName,
    composerLastName,
    arrangerFirstName,
    arrangerLastName,
    instrumentation,
  } = req.body;

  // query
  const insertQuery = "INSERT INTO Pieces (pieceTitle, composerFirstName, composerLastName, arrangerFirstName, " +
                      "arrangerLastName, instrumentation) VALUES (?, ?, ?, ?, ?, ?);";

  db.query(
    insertQuery,
    [
      pieceTitle,
      composerFirstName,
      composerLastName,
      arrangerFirstName,
      arrangerLastName,
      instrumentation,
    ],
    (error) => {
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
pieces.get("/", (req, res) => {
  db.query(`SELECT * FROM Pieces;`, (error, rows) => {
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
pieces.put("/", (req, res) => {
  // get body and query params
  let id = req.query.id;
  let {
    pieceTitle,
    composerFirstName,
    composerLastName,
    arrangerFirstName,
    arrangerLastName,
    instrumentation,
  } = req.body;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // query
  const updateQuery = "UPDATE Pieces SET pieceTitle = ?, composerFirstName = ?, composerLastName = ?, " +
                      "arrangerFirstName = ?, arrangerLastName = ?, instrumentation = ? WHERE id = ?;";

  db.query(
    updateQuery,
    [
      pieceTitle,
      composerFirstName,
      composerLastName,
      arrangerFirstName,
      arrangerLastName,
      instrumentation,
      id
    ],
    (error) => {
      if (error) {
        // send back a description of the error as well as the error status
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(200).json( {status: "OK"});
      }
    });
});


// DELETE
pieces.delete("/",  (req, res) => {
  // get query params
  let id = req.query.id;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // query
  const deleteQuery = "DELETE FROM Pieces WHERE id = ?;";

  db.query(deleteQuery, [id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default pieces;
