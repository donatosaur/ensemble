import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";


let venues = express.Router();

/**
 * CREATE  POST    /api/Venues
 * READ    GET     /api/Venues
 * UPDATE  PUT     /api/Venues?id=...
 * DELETE  DELETE  /api/Venues?id=...
 */

// CREATE
venues.post("/", function (req, res) {
  const values = [
    req.body.capacity,
    req.body.name,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
  ];

  const createQuery = "INSERT INTO Venues (capacity, name, street, city, state, zip) VALUES (?, ?, ?, ?, ?, ?);";
  
  db.query(createQuery, values, sendResponse.insertResponse(res));
});

// READ
venues.get("/", (req, res) => {
  db.query("SELECT * FROM Venues;", sendResponse.selectResponse(res));
});

// UPDATE
venues.put("/", function (req, res) {
  const values = [
    req.body.capacity,
    req.body.name,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    safeParseInt(req.query.id),
  ];

  const updateQuery = "UPDATE Venues SET capacity = ?, name = ?, street = ?, city = ?, state = ?, zip = ? WHERE id = ?;";

  db.query(
    updateQuery, values, sendResponse.updateResponse(res));
});

// DELETE
venues.delete("/", function (req, res) {
  const values = [safeParseInt(req.query.id)];
  const deleteQuery = "DELETE FROM Venues WHERE id = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default venues;
