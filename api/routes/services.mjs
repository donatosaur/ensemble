import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";
import { safeParseInt } from "../parsers.mjs";


const services = express.Router();


/**
 * CREATE  POST    /api/Services
 * READ    GET     /api/Services
 * UPDATE  PUT     /api/Services?id=...
 * DELETE  DELETE  /api/Services?id=...
 */


// CREATE
services.post("/", (req, res) => {
  const values = [
    startTime,
    endTime,
    isRehearsal,
    safeParseInt(venueID),
    safeParseInt(concertID),
  ];

  const insertQuery = "INSERT INTO Services (startTime, endTime, isRehearsal, venueID, concertID) " +
                      "VALUES (?, ?, ?, ?, ?);";

  db.query(insertQuery, values, sendResponse.insertResponse(res));
});


// READ
services.get("/", (req, res) => {
  db.query("SELECT * FROM Services;", sendResponse.selectResponse(res));
});


// UPDATE
services.put("/", (req, res) => {
  const values = [
    req.body.startTime,
    req.body.endTime,
    req.body.isRehearsal,
    safeParseInt(req.body.venueID),
    safeParseInt(req.body.concertID),
    safeParseInt(req.query.id),
  ];
  
  const updateQuery = "UPDATE Services SET startTime = ?, endTime = ?, isRehearsal = ?, venueID = ?, " +
                      "concertID = ? WHERE id = ?;";

  db.query(updateQuery, values, sendResponse.insertResponse(res));
});

services.delete("/",  (req, res) => {
  const values = [safeParseInt(req.query.id)];

  const deleteQuery = "DELETE FROM Services WHERE id = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default services;
