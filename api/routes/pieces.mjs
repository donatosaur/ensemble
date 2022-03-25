import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";


const pieces = express.Router();


/**
 * CREATE  POST    /api/Pieces
 * READ    GET     /api/Pieces
 * UPDATE  PUT     /api/Pieces?id=...
 * DELETE  DELETE  /api/Pieces?id=...
 */


// CREATE
pieces.post("/", (req, res) => {
  const values = [
    req.body.pieceTitle,
    req.body.composerFirstName,
    req.body.composerLastName,
    req.body.arrangerFirstName,
    req.body.arrangerLastName,
    req.body.instrumentation,
  ];

  const insertQuery = "INSERT INTO Pieces (pieceTitle, composerFirstName, composerLastName, arrangerFirstName, " +
                      "arrangerLastName, instrumentation) VALUES (?, ?, ?, ?, ?, ?);";

  db.query(insertQuery, values, sendResponse.insertResponse(res));
});


// READ
pieces.get("/", (req, res) => {
  db.query("SELECT * FROM Pieces;", sendResponse.selectResponse(res));
});


// UPDATE
pieces.put("/", (req, res) => {
  const values = [
    req.body.pieceTitle,
    req.body.composerFirstName,
    req.body.composerLastName,
    req.body.arrangerFirstName,
    req.body.arrangerLastName,
    req.body.instrumentation,
    safeParseInt(req.query.id),
  ];

  // query
  const updateQuery = "UPDATE Pieces SET pieceTitle = ?, composerFirstName = ?, composerLastName = ?, " +
                      "arrangerFirstName = ?, arrangerLastName = ?, instrumentation = ? WHERE id = ?;";

  db.query(updateQuery, values, sendResponse.insertResponse(res));
});


// DELETE
pieces.delete("/",  (req, res) => {
  const values = safeParseInt(req.query.id);

  const deleteQuery = "DELETE FROM Pieces WHERE id = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default pieces;
