
const bodyParser = require("body-parser");
const express = require ("express");
const app = express();
const PORT = 3000; 

app.use(bodyParser.json()); // For parsing JSON bodies

let rooms = [
  { no: 1, 
    R_name: "king",
    date: "1/2/2000" ,
    time: "10.20am",
    status: "booked",
    customer_name:"AAA"},
  { no: 2, R_name: "queen" ,date: "3/4/2000", time: "1.00pm",status:"available",customer_name: "BBB"},
];

app.get("/AllRooms", (req, res) => {
  res.json(rooms);
});
let customer = [
    { no : 1, customer_name: "AAA", date:"1/1/2023",time:"12.00pm"},
    { no : 2, customer_name: "BBB", date:"2/2/2023",time:"2.00pm"},
];
app.get("/getCustomers",(req,res) =>{
    res.json(customer);
});

app.post("/bookRoom", (req, res) => {
  const newItem = req.body;
  if (!newItem.no || !newItem.R_name || !newItem.date ) {
    return res.status(500).send("rooms must have an No,name & date!!");
  }

  rooms.push(newItem);

  res.status(201).send(`Items added with ID: ${newItem.no}`);
});

app.put("/rooms/:no", (req, res) => {
  const itemId = parseInt(req.params.no);
  const updatedItem = req.body;

  const index = rooms.findIndex((item) => item.no === itemId);
  if (index === -1) {
    return res.status(400).send("room not found");
  }

  if (!updatedItem.R_name) {
    return res.status(500).send("Room  name must!");
  }
  if (!updatedItem.date) {
    return res.status(500).send("Item must have a booking date!");
  }
  if (!updatedItem.time) {
    return res.status(500).send("Item must have a booking time!");
  }

  rooms[index].R_name = updatedItem.R_name;
  rooms[index].date= updatedItem.date ;
  rooms[index].time = updatedItem.time;
  res.status(201).send(`room detaile updated with ID: ${itemId}`);
});

app.delete("/rooms/no", (req, res) => {
  const itemId = parseInt(req.params.no);

  const index = rooms.findIndex((item) => item.no === itemId);
  if (index === -1) {
    return res.status(400).send("Item not found");
  }

  rooms.splice(index, 1);
  res.status(201).send(`Items deleted with ID: ${itemId}`);
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});