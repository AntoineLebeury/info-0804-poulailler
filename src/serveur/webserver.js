const express = require('express');
const fs = require('fs');
const app = express();
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
  res.status(200).json();
});

app.get('/door', (req, res) => {
  client.query('SELECT timestamp, ouverte FROM porte WHERE timestamp = (SELECT MAX(timestamp) FROM porte)', (err2, res2) => {
    res.status(200).json(res2.rows[0]);
  });
});

app.get('/door/open', (req, res) => {
  console.log("Opening door");
  //FIXME send open query to pi
  query_res = 200
  if (query_res == 200) {
    client.query('INSERT INTO porte VALUES (DEFAULT, (SELECT NOW()), True)', (err2, res2) => {});
    res.status(200).json();
  }
  else {
    res.status(query_res).json();
  }
});

app.get('/door/close', (req, res) => {
  console.log("Closing door");
  //FIXME send closing query to pi
  query_res = 200
  if (query_res == 200) {
    client.query('INSERT INTO porte VALUES (DEFAULT, (SELECT NOW()), False)', (err2, res2) => {});
    res.status(200).json();
  }
  else {
    res.status(query_res).json();
  }
});

app.listen(8080, () => {
  console.log('Server online');
});
