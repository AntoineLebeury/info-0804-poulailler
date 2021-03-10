const express = require('express');
const fs = require('fs');
const app = express();
const door = require('./door.json'); //FIXME replace with database
const { Client } = require('pg')

app.use(express.json());

// Connection à la base de données
const client = new Client({
  user: 'info0804server',
  host: 'localhost',
  database: 'INFO-0804',
  password: 'password',
});
client.connect();

var data_all;
app.get('/data', (req, res) => {
  client.query('SELECT * FROM mesures', (err2, res2) => {
    res.status(200).json(res2.rows);
  });
});

app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  client.query('SELECT * FROM mesures WHERE mesure_id =' + id, (err2, res2) => {
    res.status(200).json(res2.rows[0]);
  });
});

app.post('/data', (req, res) => {
  client.query('INSERT INTO mesures VALUES (DEFAULT, (SELECT NOW()),' + req.body.temperature + ',' + req.body.pression + ',' + req.body.luminosite + ')', (err2, res2) => {
    console.log(err2, res2);
  });
  res.status(200);
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
