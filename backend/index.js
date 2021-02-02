const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


// IMPORT MYSQL
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Opendoors744784',
    database: 'studentdb'
});


// GET DATA FROM DATABASE
app.get('/questions', (req, res) => {
    db.query("SELECT * FROM questions", 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result);
        }
    })
})


// POST DATA TO DATABASE
app.post('/create', (req, res) => {
    const question = req.body.question;
    const cid = req.body.cid;

    db.query("INSERT INTO questions (question, cid) VALUES (?,?)"
    [question, cid], (err, result) =>{
        if(err){
            console.log(err)
        } else{
            res.send("Values Inserted")
        }
    }
    )
})


// UPDATE DATA IN DATABASE
app.put('/update', (req, res) => {
    const qid = req.body     //What should go here??
    const question = req.body.question;
    db.query("UPDATE questions SET question = ? WHERE qid = ?", [question, qid], (err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result);
        }
    })
})



// DELETE DATA FROM THE DATABASE
app.delete('/delete', (req, res) => {
    const qid = req.params      //What should go here???
    db.query("DELETE FROM questions WHERE qid =?", qid, (err, result) => {
        if(err) {
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

// MAIN PAGE NODE
const home = (req,res) => {
    res.send('Hello world')
}
app.get('/', home);

app.listen(port, () => {
    console.log("port is listening on port: " + port)
})