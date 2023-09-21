const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose");

// Create new express application
const app = express();
const PORT = 4000;
function logRequest(req,res,next){
    console.log(`received ${req.method} request for
    ${req.url} at ${new Date().toISOString()}`);
    next();
}

function sampleAuthentication(req,res,next){
    if(req.query.token === "seacret"){
        req.user= {id:1 , name:"div"}
        next();
    }
        else{
            res.status(401).send("Unauthenticated");
        }
    }

app.use(bodyParser.json());
app.use("/secure",sampleAuthentication);
app.use(logRequest);

app.get("/mentor",(req,res) => {
    res.send("hi , mentor");
});

app.get("/student", (req , res) => {
    res.send("hi", student);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });