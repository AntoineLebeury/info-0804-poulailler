const express = require('express');
const fs = require('fs');
const app = express();
const data = require('./data.json'); //FIXME replace with database

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

app.listen(8080, () => {
  console.log('Server online');
});
