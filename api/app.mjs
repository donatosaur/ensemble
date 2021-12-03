import express from "express";
import path from "path";
import "dotenv/config";
import loggingMiddleware from "./logger.mjs";

// import routes
import musicians from "./routes/musicians.mjs";
import instruments from "./routes/instruments.mjs";
import venues from "./routes/venues.mjs";
import concertCycles from "./routes/concertCycles.mjs";
import services from "./routes/services.mjs";
import pieces from "./routes/pieces.mjs";
import musiciansInstruments from "./routes/musiciansInstruments.mjs";
import musiciansConcertCycles from "./routes/musiciansConcertCycles.mjs";
import piecesConcertCycles from "./routes/piecesConcertCycles.mjs";

// Config
const PORT = process.env.PORT || 3332;
const STATIC_CONTENT_DIR = "./public";

const app = express();

// Logging middleware for responses
app.use(loggingMiddleware);

/**
 * Attach JSON parsing middleware. The backend accepts JSON objects with missing/empty fields represented either
 * by null explicitly, or by empty strings (implicitly null). By passing in a reviver, we will convert all
 * empty strings to explicit null values whenever we parse a JSON body for consistency.
 */
app.use(
  express.json({
      reviver: (key, value) => (value === "" ? null : value),
  })
);

// Attach table endpoint routes
app.use("/api/Musicians", musicians);
app.use("/api/Instruments", instruments);
app.use("/api/Venues", venues);
app.use("/api/ConcertCycles", concertCycles);
app.use("/api/Services", services);
app.use("/api/Pieces", pieces);
app.use("/api/MusiciansInstruments", musiciansInstruments);
app.use("/api/MusiciansConcertCycles", musiciansConcertCycles);
app.use("/api/PiecesConcertCycles", piecesConcertCycles);

/**
 * Attach static route to serve frontend. This needs to be attached after all the table endpoints so that any
 * requests are first matched to the API endpoints and lastly interpreted as a request for the frontend.
 * In addition, because of how React apps handle paths, we need to ensure that all routes at this point
 * are captured by the static directory. First, by serving the static html file, and secondly by redirecting
 * any and all other requests to that same file.
 *
 * This is SOP for a React app. For additional info on this, see https://create-react-app.dev/docs/deployment/
 * and also https://expressjs.com/en/5x/api.html#res.sendFile
 */
app.use(express.static(STATIC_CONTENT_DIR));
app.get("/*", function (req, res) {
  res.sendFile(path.resolve(STATIC_CONTENT_DIR, "index.html"));
});

// Attach listener
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}. Press Ctrl + C to terminate.`);
});
