const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
const port = 5000;


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



//  INITIALIZE SESSION
app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

// IMPORT MYSQL
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Opendoors744784',
    database: 'studentdb'
});


// POST ACCOUNT TO DB
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err)
        }
            db.query(
              "INSERT INTO accounts (username, password) VALUES (?,?)",
              [username, hash],
              (err, result) => {
                console.log(err);
              }
            );
    })


})


// GET FOR LOGIN
app.get("/login", (req, res) => {
    if (req.session.user){
        res.send({ loggedIn: true, user: req.session.user })
    } else{
        res.send({ loggedIn: false });
    }
})


//LOG INTO ACCOUNT
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM accounts WHERE username = ?;",
        username,
        (err, result) => {
            if(err){
                res.send({ err: err })
            } 
                if (result.length > 0){
                    bcrypt.compare(password, result[0].password, (err, response) => {
                        if(response) {
                            req.session.user = result
                            console.log(req.session.user);
                            res.send(result)
                        }else {
                            res.send({ message: "Wrong Username and/or Password" })
                        }
                    })
                } else {
                    res.send({ message: "User does not exist" })
                }
        }
    )
})


// GET DATA FROM DATABASE (QUESTIONS.JS/SIDEBAR.JS)
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


// POST DATA TO DATABASE (QUESTIONS.JS)
app.post('/create', (req, res) => {
    console.log(req)
    const question = req.body.question;
    const cid = req.body.cid;
    console.log(cid);
    console.log(question)
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


// UPDATE DATA IN DATABASE (QUESTIONS.JS)
app.put('/update', (req, res) => {
    const qid = req.body.qid;     //What should go here??
    const question = req.body.question;
    db.query("UPDATE questions SET question = ? WHERE qid = ?", [question, qid], (err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result);
        }
    })
})



// DELETE DATA FROM THE DATABASE (QUESTIONS.JS)
app.delete('/delete', (req, res) => {
    const qid = req.params.qid;      //What should go here???
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