import express from "express";
import db from "../database/db_connector.mjs";
import instruments from "./instruments.mjs";

let musicians = express.Router();

/**
 * CREATE  POST    /api/Musicians
 * READ    GET     /api/Musicians
 * UPDATE  PUT     /api/Musicians?musicianID=...
 * DELETE  DELETE  /api/Musicians?musicianID=...
 */

// CREATE
musicians.post("/", async function (req, res) {
  // request parameter
  const queryObj = req.body;

  // Execute query async
  try {
    // some syntax error using template literals that I couldn't figure out
    // const createQuery = `INSERT INTO Musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, state, zip, inEnsemble, active) VALUES (${queryObj.firstName}, ${queryObj.lastName}, ${queryObj.birthdate}, ${queryObj.email}, ${queryObj.phoneNumber}, ${queryObj.street}, ${queryObj.city}, ${queryObj.state}, ${queryObj.zip}, ${queryObj.inEnsemble}, ${queryObj.active});`
    const createQuery =
      "INSERT INTO Musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, state, zip, inEnsemble, active) VALUES (?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?);";
    const fields = [
      queryObj.firstName,
      queryObj.lastName,
      queryObj.birthdate,
      queryObj.email,
      queryObj.phoneNumber,
      queryObj.street,
      queryObj.city,
      queryObj.state,
      queryObj.zip,
      queryObj.inEnsemble,
      queryObj.active,
    ];
    // could refactor, depends what order sent from front end
    // const fields=Object.values(req.body)
    // create the musician
    await db.execute(createQuery, fields);
    // get all the musicians (not sure how we should handle this/if we want just the row affected)
    let [results, rows] = await db.query("SELECT * FROM Musicians")
    res.send(results)


    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

// READ
instruments.get("/", (req, res) => {
  db.query("SELECT * FROM Musicians;", (error, rows) => {
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
musicians.put("/:id", async function (req, res) {
  // request parameter
  const queryObj = req.body;
  // Execute query async
  try {
    const updateQuery =
      "UPDATE Musicians SET firstName = ?, lastName = ?, birthdate = ?, email = ?, phoneNumber= ?, street= ?, city = ?, state = ?, zip = ?, inEnsemble = ?, active = ? WHERE musicianID = ?";
    const fields = [
      queryObj.firstName,
      queryObj.lastName,
      queryObj.birthdate,
      queryObj.email,
      queryObj.phoneNumber,
      queryObj.street,
      queryObj.city,
      queryObj.state,
      queryObj.zip,
      queryObj.inEnsemble,
      queryObj.active,
      req.params.id,
    ];
    await db.execute(updateQuery, fields);
    let [results, rows] = await db.query("SELECT * FROM Musicians")
    res.send(results)
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

musicians.delete("/:id", async function (req, res) {
  // request parameter
  // Execute query async
  try {
    // Define query
    const createQuery = "DELETE FROM Musicians WHERE musicianID = ?;";
    await db.execute(createQuery, [req.params.id]);
    let [results, rows] = await db.query("SELECT * FROM Musicians")
    res.send(results);
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

export default musicians;
