import express from "express";
import db from "../database/db_connector.mjs";

let instruments = express.Router();

// POST /api/Instruments/ (create)
// GET /api/Instruments/ (get all)
// PUT /api/Instruments/:id (update)
// DELETE /api/Instruments/:id (delete)

// CREATE
instruments.post("/", async function (req, res) {
  // request parameter
  const queryObj = req.body;

  // Execute query async
  try {
    const createQuery ="INSERT INTO Instruments (name) VALUES (?);"
    // create the musician
    await db.execute(createQuery, [queryObj.name]);
    // get all the musicians (not sure how we should handle this/if we want just the row affected)
    let [results, rows] = await db.query("SELECT * FROM Instruments")
    res.send(results)

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
instruments.put("/:id", async function (req, res) {
  // request parameter
  const queryObj = req.body;
  // Execute query async
  try {
    const updateQuery = "UPDATE Instruments SET name = ? WHERE instrumentID = ?;"
      
    const fields = [
      queryObj.name,
      req.params.id
    ];
    await db.execute(updateQuery, fields);
    let [results, rows] = await db.query("SELECT * FROM Instruments")
    res.send(results)
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

instruments.delete("/:id", async function (req, res) {
  // request parameter
  // Execute query async
  try {
    // Define query
    const createQuery = "DELETE FROM Instruments WHERE instrumentID = ?;";
    await db.execute(createQuery, [req.params.id]);
    let [results, rows] = await db.query("SELECT * FROM Instruments")
    res.send(results);
    // Log error if table doesn't exist, connection problem, etc
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Error: "Request failed",
    });
  }
});

export default instruments;
