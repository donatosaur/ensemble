import express from "express";
import db from "../database/db_connector.mjs";

const piecesConcertCycles = express.Router();

/**
 * CREATE  POST    /api/PiecesConcertCycles
 * READ    GET     /api/PiecesConcertCycles
 * DELETE  DELETE  /api/PiecesConcertCycles?pieceID=...&concertID=...
 */

// CREATE
piecesConcertCycles.post("/", (req, res) => {
  // destructure body params
  let { pieceID, concertID } = req.body;

  // parse (fall back to null)
  pieceID = parseInt(pieceID);
  pieceID = isNaN(pieceID) ? null : pieceID;

  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  const insertQuery = "INSERT INTO PiecesConcertCycles (pieceID, concertID) VALUES (?, ?);";

  db.query(insertQuery, [pieceID, concertID], (error) => {
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
piecesConcertCycles.get("/", (req, res) => {
  const selectQuery = "SELECT Pieces.id AS pieceID, Pieces.pieceTitle AS piece, ConcertCycles.id AS concertID, " +
                      "ConcertCycles.concertTitle AS concertCycle FROM Pieces INNER JOIN PiecesConcertCycles " +
                      "ON Pieces.id = PiecesConcertCycles.pieceID INNER JOIN ConcertCycles ON " +
                      "ConcertCycles.id = PiecesConcertCycles.concertID;"

  // db.query("SELECT * FROM PiecesConcertCycles;", (error, rows) => {
  db.query(selectQuery, (error, rows) => {
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
piecesConcertCycles.put("/", (req, res) => {
  res.status(405).json({status: "Method not allowed"});
});

// DELETE
piecesConcertCycles.delete("/", (req, res) => {
  // get query params
  let [pieceID, concertID] = [req.query.pieceID, req.query.concertID];

  // parse
  pieceID = parseInt(pieceID);
  pieceID = isNaN(pieceID) ? null : pieceID;

  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  const deleteQuery = "DELETE FROM PiecesConcertCycles WHERE pieceID = ? AND concertID = ?;";

  db.query(deleteQuery, [pieceID, concertID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default piecesConcertCycles;
