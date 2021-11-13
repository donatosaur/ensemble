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
services.post('/', (req, res) => {
  // destructure body params (use let here because we will need to parse)
  let { startTime = null, endTime = null, isRehearsal = null, venueID = null, concertID = null } = req.body;

  // attempt to parse int values (fall back to null)
  venueID = isNaN(parseInt(venueID)) ? null : parseInt(venueID);
  concertID = isNaN(parseInt(concertID)) ? null : parseInt(concertID);

  // explicitly cast to boolean to prevent injection attacks (but preserve null values)
  isRehearsal = isRehearsal === null ? null : !!isRehearsal;

  const insertQuery = `INSERT INTO Services (startTime, endTime, isRehearsal, venueID, concertID) ` +
                      `VALUES ('${startTime}', '${endTime}', ${isRehearsal}, ${venueID}, ${concertID});`;

  db.query(insertQuery, (error) => {
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
  db.query(`SELECT * FROM Services;`, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(503).json({ error: error });
    } else {
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});


// UPDATE
services.put("/", (req, res) => {
  // destructure as we did for the patch request
  let serviceID = req.query.serviceID;
  let { startTime = null, endTime = null, isRehearsal = null, venueID = null, concertID = null } = req.body;

  // parse as we did for the patch request
  serviceID = isNaN(parseInt(serviceID)) ? null : parseInt(serviceID);
  venueID = isNaN(parseInt(venueID)) ? null : parseInt(venueID);
  concertID = isNaN(parseInt(concertID)) ? null : parseInt(concertID);
  isRehearsal = isRehearsal === null ? null : !!isRehearsal;

  const updateQuery = `UPDATE Services SET startTime = '${startTime}', endTime = '${endTime}', ` +
                      `isRehearsal = ${isRehearsal}, venueID = ${venueID}, concertID = ${concertID} ` +
                      `WHERE serviceID = ${serviceID};`;

  db.query(updateQuery, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

services.delete("/",  (req, res) => {
  // destructure as we did for the patch request
  let serviceID = req.query.serviceID;

  // parse as we did for the patch request
  serviceID = isNaN(parseInt(serviceID)) ? null : parseInt(serviceID);

  const deleteQuery = `DELETE FROM Services WHERE serviceID = ${serviceID};`

  db.query(deleteQuery, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

export default services;
