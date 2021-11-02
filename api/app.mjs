import express from 'express'
import 'dotenv/config'
import db from './database/db_connector.mjs'

let PORT = process.env.PORT || 3332;    

const app = express();    

/*
    ROUTES
*/
   
app.get('/', async function(req, res)
    {
        // Define our queries
        const query1 = 'DROP TABLE IF EXISTS diagnostic;';
        const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        const query3 = 'INSERT INTO diagnostic (text) VALUES ("is MySQL working?")';
        const query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts
       
        try{
            await db.query(query1)
            await db.query(query2)
            await db.query(query3)
            let [results, rows]=await db.query(query4)
            res.send(JSON.stringify(results));
        } catch (error){
            console.log(error)
        }
    });                                    

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});