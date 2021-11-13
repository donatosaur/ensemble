import express from "express";
import db from "../database/db_connector.mjs";

const services = express.Router();


/**
 * CREATE  POST    /api/Services
 * READ    GET     /api/Services
 * UPDATE  PUT     /api/Services?serviceID=...
 * DELETE  DELETE  /api/Services?serviceID=...
 */


// CREATE
services.post("/", (req, res) => {
  // get body params
  let { startTime, endTime, isRehearsal, venueID, concertID } = req.body;

  // parse
  venueID = parseInt(venueID);
  venueID = isNaN(venueID) ? null : venueID;

  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  // query
  const insertQuery = "INSERT INTO Services (startTime, endTime, isRehearsal, venueID, concertID) " +
                      "VALUES (?, ?, ?, ?, ?);";

  db.query(insertQuery, [startTime, endTime, isRehearsal, venueID, concertID],(error) => {
    if (error) {
      // send back a description of the error as well as the error status
      console.log(error);
      res.status(400).json({error: error});
    } else {
      res.status(201).json( {status: "created"});
    }
  });
});


// READ
services.get("/", (req, res) => {
  db.query("SELECT * FROM Services;", (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});


// UPDATE
services.put("/", (req, res) => {
  // get body and query params
  let serviceID = req.query.serviceID;
  let { startTime, endTime, isRehearsal, venueID, concertID } = req.body;

  // parse
  serviceID = parseInt(serviceID);
  serviceID = isNaN(serviceID) ? null : serviceID;

  venueID = parseInt(venueID);
  venueID = isNaN(venueID) ? null : venueID;

  concertID = parseInt(concertID);
  concertID = isNaN(concertID) ? null : concertID;

  // query
  const updateQuery = "UPDATE Services SET startTime = ?, endTime = ?, isRehearsal = ?, venueID = ? " +
                      "concertID = ? WHERE serviceID = ?;";

  db.query(updateQuery, [startTime, endTime, isRehearsal, venueID, concertID, serviceID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

services.delete("/",  (req, res) => {
  // get query params
  let serviceID = req.query.serviceID;

  // parse
  serviceID = parseInt(serviceID);
  serviceID = isNaN(serviceID) ? null : serviceID;

  // query
  const deleteQuery = "DELETE FROM Services WHERE serviceID = ?;";

  db.query(deleteQuery, [serviceID], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

export default services;
