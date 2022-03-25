import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";


const piecesConcertCycles = express.Router();

/**
 * CREATE  POST    /api/PiecesConcertCycles
 * READ    GET     /api/PiecesConcertCycles
 * DELETE  DELETE  /api/PiecesConcertCycles?pieceID=...&concertID=...
 */

// CREATE
piecesConcertCycles.post("/", (req, res) => {
  const values = [
    safeParseInt(req.body.pieceID),
    safeParseInt(req.body.concertID),
  ]
  const insertQuery = "INSERT INTO PiecesConcertCycles (pieceID, concertID) VALUES (?, ?);";

  db.query(insertQuery, values, sendResponse.insertResponse(res));
});

// READ
piecesConcertCycles.get("/", (req, res) => {
  const selectQuery = "SELECT Pieces.id AS pieceID, Pieces.pieceTitle AS piece, ConcertCycles.id AS concertID, " +
                      "ConcertCycles.concertTitle AS concertCycle FROM Pieces INNER JOIN PiecesConcertCycles " +
                      "ON Pieces.id = PiecesConcertCycles.pieceID INNER JOIN ConcertCycles ON " +
                      "ConcertCycles.id = PiecesConcertCycles.concertID;"

  db.query(selectQuery, sendResponse.selectResponse(res));
});

// UPDATE is disallowed on this entity
piecesConcertCycles.put("/", (req, res) => {
  res.status(405).json({status: "Method not allowed"});
});

// DELETE
piecesConcertCycles.delete("/", (req, res) => {
  const values = [
    safeParseInt(req.query.pieceID),
    safeParseInt(req.query.concertID),
  ];

  const deleteQuery = "DELETE FROM PiecesConcertCycles WHERE pieceID = ? AND concertID = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default piecesConcertCycles;
