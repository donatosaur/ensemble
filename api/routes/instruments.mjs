import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";

const instruments = express.Router();


/**
 * CREATE  POST    /api/Instruments
 * READ    GET     /api/Instruments
 * UPDATE  PUT     /api/Instruments?id=...
 * DELETE  DELETE  /api/Instruments?id=...
 */


// CREATE
instruments.post("/", (req, res) => {
  const values = [req.body.name];
  const insertQuery = "INSERT INTO Instruments (name) VALUE (?);";

  db.query(insertQuery, queryParams, sendResponseinsertResponse(res));
});


// READ
instruments.get("/", (req, res) => {
  db.query("SELECT * FROM Instruments;", sendResponse.selectResponse(res));
});


// UPDATE
instruments.put("/", (req, res) => {
  const values = [
    req.body.name,
    safeParseInt(req.query.id),
  ];

  const updateQuery = "UPDATE Instruments SET name = ? WHERE id = ?";

  db.query(updateQuery, values, sendResponse.updateResponse(res));
});

instruments.delete("/",  (req, res) => {
  const values = [safeParseInt(req.query.id)];
  const deleteQuery = "DELETE FROM Instruments WHERE id = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default instruments;
