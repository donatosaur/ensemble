import express from "express";
import db from "../database/db_connector.mjs";

let concertcycles = express.Router();

// POST /api/ConcertCycles/ (create)
// GET /api/ConcertCycles/ (get all)
// PUT /api/ConcertCycles/:id (update)
// DELETE /api/ConcertCycles/:id (delete)

// CREATE
concertcycles.post("/", async function (req, res) {

  // Execute query async
  try {
    // some syntax error using template literals that I couldn't figure out
    const createQuery =
      "INSERT INTO ConcertCycles (concertTitle,startDate, endDate, conductorFirstName, conductorLastName, soloistFirstName, soloistLastName) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const fields=Object.values(req.body)
    // create the musician
    await db.execute(createQuery, fields);
    // get all the musicians (not sure how we should handle this/if we want just the row affected)
    let [results, rows] = await db.query("SELECT * FROM ConcertCycles");
    res.send(results);

    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

// READ is universal for all entities (located in app.mjs)

// UPDATE
concertcycles.put("/:id", async function (req, res) {
  // request parameter
  const queryObj = req.body;
  // Execute query async
  try {
    const updateQuery =
      "UPDATE ConcertCycles SET concertTitle = ?, startDate = ?, endDate = ?, conductorFirstName = ?, conductorLastName = ?, soloistFirstName = ?, soloistLastName = ? WHERE concertID = ?;";

    const fields = [
      queryObj.concertTitle,
      queryObj.startDate,
      queryObj.endDate,
      queryObj.conductorFirstName,
      queryObj.conductorLastName,
      queryObj.soloistFirstName,
      queryObj.soloistLastName,
      req.params.id,
    ];
    await db.execute(updateQuery, fields);
    let [results, rows] = await db.query("SELECT * FROM ConcertCycles");
    res.send(results);
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

concertcycles.delete("/:id", async function (req, res) {
  // request parameter
  // Execute query async
  try {
    // Define query
    const createQuery = "DELETE FROM ConcertCycles WHERE concertID = ?;";
    await db.execute(createQuery, [req.params.id]);
    let [results, rows] = await db.query("SELECT * FROM ConcertCycles");
    res.send(results);
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

export default concertcycles;
