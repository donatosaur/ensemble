import express from "express";
import "dotenv/config";

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


/**
 * Attach JSON parsing middleware. The backend accepts JSON objects with missing/empty fields represented either
 * by null explicitly, or by empty strings (implicitly null). By passing in a reviver, we will convert all
 * empty strings to explicit null values whenever we parse a JSON body for consistency.
 */
app.use(express.json({
    reviver: (key, value) => value === "" ? null : value,
}));


// Attach table endpoint routes
app.use('/api/Musicians', musicians);
app.use('/api/Instruments', instruments);
app.use('/api/Venues', venues);
app.use('/api/ConcertCycles', concertCycles);
app.use('/api/Services', services);
app.use('/api/Pieces', pieces);
app.use('/api/MusiciansInstruments', musiciansInstruments);
app.use('/api/MusiciansConcertCycles', musiciansConcertCycles);
app.use('/api/PiecesConcertCycles', piecesConcertCycles);


/**
 * Attach static route to serve frontend. This needs to be attached after all the table endpoints so that any
 * requests are first matched to the API endpoints and lastly interpreted as a request for the frontend.
 */
app.use(express.static(STATIC_CONTENT_DIR));


// Handle any errors that we didn't catch
app.use((error, req, res, next) => {
    // this is serious enough that we need to log it as an error
    console.error(`Unhandled error occurred during ${req.method} request at ${req.originalUrl}`, `${error}`);
    res.status(500).json({ error: '500 - Server Error' });
});


// Attach listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
