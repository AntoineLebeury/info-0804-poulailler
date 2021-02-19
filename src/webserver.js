const express = require('express');
const fs = require('fs');
const app = express();
const data = require('./data.json'); //FIXME replace with database
const door = require('./door.json');

app.use(express.json());

app.get('/data', (req, res) => {
  res.status(200).json(data);
});

app.get('/data/:id', (req, res) => { //FIXME replace id with time
  const id = parseInt(req.params.id);
  const d = data.find(d => d.id === id);
  res.status(200).json(d);
});

app.post('/data', (req, res) => {
  data.push(req.body);
  fs.writeFile("./data.json", JSON.stringify(data), function(err) { if (err) { return console.log(err); } console.log("Filed saved");}); //FIXME add row in database
  res.status(200).json(data);
});

app.get('/door', (req, res) => {
  res.status(200).json(door);
});

app.get('/door/open', (req, res) => {
  console.log("Opening door");
  door.push(JSON.parse('{"timestamp": "now", "status": "open"}'));
  //FIXME insert in database instead
  res.status(200).json();
});

app.get('/door/close', (req, res) => {
  console.log("Closing door");
  door.push(JSON.parse('{"timestamp": "now", "status": "close"}'));
  //FIXME insert in database with timestamp
  res.status(200).json();
});

app.listen(8080, () => {
  console.log('Server online');
});
