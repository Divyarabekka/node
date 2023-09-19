// Import the express library
const express = require("express");
const bodyParser =require("body-parser");
const mongoose = require("mongoose");

// Create new express application
const app = express();


const PORT = 4000;
const DB_URL = "mongodb://0.0.0.0:27017/admin"
app.use(bodyParser.json());

const bookSchema =new mongoose.Schema( {
    id : Number,
   title: String,
   author: String,
});
const book = mongoose.model("book",bookSchema);

mongoose
.connect(DB_URL,{})
.then(() => console.log("connected mongo"))
.catch((err) => console.log("could not connect mongo",err));

app.post("/book",async (req,res) => {
    const bok = new book(req.body);
    try{
        const saveBook = await bok.save();
        res.send(saveBook);
       } catch(err){
        res.send(err.message);
       }
});
app.get("/book",async (req,res)=>{
    try{
        const books=await book.find();
        res.send(books);
    }
    catch (err){
        res.send(err.message);
    }
});

app.get("/book",async (req,res)=>{
    try{
        const books=await book.findById(req.params.id);
        if(book){
            res.send(book)
        }else{
            res.send("book not found")
        }
        res.send(books);
    }
    catch (err){
        res.send(err.message);
    }
});


app.get("/", (req, res) => {
  res.send("Hello from Express!!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});