import express from "express";
import db from "../database/db_connector.mjs";

const piecesConcertCycles = express.Router();


/**
 * CREATE  POST    /api/PiecesConcertCycles
 * READ    GET     /api/PiecesConcertCycles
 * DELETE  DELETE  /api/PiecesConcertCycles?pieceID=...&concertID=...
 */


// CREATE
piecesConcertCycles.post('/', (req, res) => {
  // destructure body params (use let here because we will need to parse)
  let { pieceID = null, concertID = null } = req.body;

  // attempt to parse int values (fall back to null)
  pieceID = isNaN(parseInt(pieceID)) ? null : parseInt(pieceID);
  concertID = isNaN(parseInt(concertID)) ? null : parseInt(concertID);

  const insertQuery = `INSERT INTO PiecesConcertCycles (pieceID, concertID) VALUES (${pieceID}, ${concertID})`;

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
piecesConcertCycles.get("/", (req, res) => {
  db.query(`SELECT * FROM PiecesConcertCycles;`, (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(503).json({ error: error });
    } else {
      res.status(200).json({ status: "ok", data: rows });
    }
  });
});


// UPDATE is disallowed on this entity
piecesConcertCycles.put("/", (req, res) => {
 res.status(405).send();
});


piecesConcertCycles.delete("/",  (req, res) => {
  // destructure as we did for the patch request
  let [pieceID, concertID] = [req.query.pieceID, req.query.concertID];

  // parse as we did for the patch request
  pieceID = isNaN(parseInt(pieceID)) ? null : parseInt(pieceID);
  concertID = isNaN(parseInt(concertID)) ? null : parseInt(concertID);

  const deleteQuery = `DELETE FROM PiecesConcertCycles WHERE pieceID = ${pieceID} AND concertID = ${concertID};`

  db.query(deleteQuery, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

export default piecesConcertCycles;
