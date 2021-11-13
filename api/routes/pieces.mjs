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
pieces.post('/', (req, res) => {
  // destructure body params
  let {
    pieceTitle = null,
    composerFirstName = null,
    composerLastName = null,
    arrangerFirstName = null,
    arrangerLastName = null,
    instrumentation = null
  } = req.body;

  const insertQuery = `INSERT INTO Pieces (pieceTitle, composerFirstName, composerLastName, arrangerFirstName, 
                       arrangerLastName, instrumentation) VALUES ('${pieceTitle}', '${composerFirstName}', 
                       '${composerLastName}', '${arrangerFirstName}', '${arrangerLastName}', '${instrumentation}');`;

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
pieces.get("/", (req, res) => {
  db.query(`SELECT * FROM Pieces;`, (error, rows) => {
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
pieces.put("/", (req, res) => {
  // destructure as we did for the patch request
  let pieceID = req.query.pieceID;
  let {
    pieceTitle = null,
    composerFirstName = null,
    composerLastName = null,
    arrangerFirstName = null,
    arrangerLastName = null,
    instrumentation = null
  } = req.body;

  // parse as we did for the patch request
  pieceID = isNaN(parseInt(pieceID)) ? null : parseInt(pieceID);

  const updateQuery = `UPDATE Pieces SET pieceTitle = '${pieceTitle}', composerFirstName = '${composerFirstName}', ` +
                      `composerLastName = '${composerLastName}', arrangerFirstName = '${arrangerFirstName}', ` +
                      `arrangerLastName = '${arrangerLastName}', instrumentation = '${instrumentation}'` +
                      `WHERE pieceID = ${pieceID};`;

  db.query(updateQuery, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

pieces.delete("/",  (req, res) => {
  // destructure as we did for the patch request
  let pieceID = req.query.pieceID;

  // parse as we did for the patch request
  pieceID = isNaN(parseInt(pieceID)) ? null : parseInt(pieceID);

  const deleteQuery = `DELETE FROM Pieces WHERE pieceID = ${pieceID};`

  db.query(deleteQuery, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
});

export default pieces;
