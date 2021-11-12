import express from 'express'
import 'dotenv/config'
import db from './database/db_connector.mjs'
import musicians from './routes/musicians.mjs';
// import router2 from './routes/test.mjs'

let PORT = process.env.PORT || 3332;    

const app = express();  

// donato MVP
const options = {
    reviver: (key, value) => value === '' ? null : value
  }

app.use(express.json(options))
/*
    ROUTES
*/
   

// READ endpoint for all tables
app.get('/api/:entity', async function(req, res)
{
    // request parameter
    
    const entity= req.params.entity
    // Define query
    const selectQuery=`SELECT * FROM ${entity}`

    // Execute query async
    try{
        let [results, rows]=await db.query(selectQuery)
        res.status(400).json(results)
    // Log error if table doesn't exist, connection problem, etc
    } catch (error){
        console.log(error)
        res.status(500).json({ Error: 'Request failed' })
    }
}); 


// table endpoints
app.use('/api/Musicians', musicians)
// app.use('/api/Instruments', instruments)
// app.use('/api/Venues', venues)
// app.use('/api/ConcertCycles', concertcycles)
// app.use('/api/Services', services)
// app.use('/api/Pieces', pieces)
// app.use('/api/MusiciansInstruments', musiciansinstruments)
// app.use('/api/MusiciansConcertCycles', musiciansconcertcycles)
// app.use('/api/PiecesConcertCycles', piecesconcertcycles)



/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});