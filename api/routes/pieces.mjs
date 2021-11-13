import express from "express";
import db from "../database/db_connector.mjs";

const pieces = express.Router();


/**
 * CREATE  POST    /api/Pieces
 * READ    GET     /api/Pieces
 * UPDATE  PUT     /api/Pieces?pieceID=...
 * DELETE  DELETE  /api/Pieces?pieceID=...
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
        res.status(400).json({error: error});
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
      res.status(500).json({ error: error });
    } else {
      res.status(200).json({ status: "OK", data: rows });
    }
  });
});


// UPDATE
pieces.put("/", (req, res) => {
  // get body and query params
  let pieceID = req.query.pieceID;
  let {
    pieceTitle,
    composerFirstName,
    composerLastName,
    arrangerFirstName,
    arrangerLastName,
    instrumentation,
  } = req.body;

  // parse
  pieceID = parseInt(pieceID);
  pieceID = isNaN(pieceID) ? null : pieceID;

  // query
  const updateQuery = "UPDATE Pieces SET pieceTitle = ?, composerFirstName = ?, composerLastName = ?, " +
                      "arrangerFirstName = ?, arrangerLastName = ?, instrumentation = ? WHERE pieceID = ?;";

  db.query(
    updateQuery,
    [
      pieceTitle,
      composerFirstName,
      composerLastName,
      arrangerFirstName,
      arrangerLastName,
      instrumentation,
      pieceID
    ],
    (error) => {
      if (error) {
        // send back a description of the error as well as the error status
        console.log(error);
        res.status(400).json({error: error});
      } else {
        res.status(200).json( {status: "OK"});
      }
    });
});


// DELETE
pieces.delete("/",  (req, res) => {
  // get query params
  let pieceID = req.query.pieceID;

  // parse
  pieceID = parseInt(pieceID);
  pieceID = isNaN(pieceID) ? null : pieceID;

  // query
  const deleteQuery = "DELETE FROM Pieces WHERE pieceID = ?;";

  db.query(deleteQuery, [pieceID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default pieces;
