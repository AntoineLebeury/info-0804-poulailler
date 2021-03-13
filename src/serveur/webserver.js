const express = require('express');
const fs = require('fs');
const app = express();
const { Client } = require('pg')

app.use(express.json());

// the ip of the raspberry pi
rasp_ip = "127.0.0.1";

// Connection à la base de données
const client = new Client({
  user: 'info0804server',
  host: 'localhost',
  database: 'INFO-0804',
  password: 'password',
});
client.connect();

// get at [adress]/data
// Send all the sensor data stred in the database
app.get('/data', (req, res) => {
  client.query('SELECT * FROM mesures', (err2, res2) => {
    res.status(200).json(res2.rows);
  });
});

// get at [adress]/data/[id]
// Send the sensor data with the id precised in the url
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  client.query('SELECT * FROM mesures WHERE mesure_id =' + id, (err2, res2) => {
    res.status(200).json(res2.rows[0]);
  });
});

// post at [adresse]/data
// Receive sensor data formated as a json and add them to the database
app.post('/data', (req, res) => {
  client.query('INSERT INTO mesures VALUES (DEFAULT, (SELECT TO_TIMESTAMP(\'' + req.body.timestamp + '\', \'YYYY-MM-DD HH24:MI:SS\')),' + req.body.temperature + ',' + req.body.pression + ',' + req.body.humidite + ')', (err2, res2) => {
    console.log(err2, res2);
  });
  res.status(200).json();
});

// get at [adresse]/door
// Send the last known state of the door and the time of the last operation
app.get('/door', (req, res) => {
  client.query('SELECT timestamp, ouverte FROM porte WHERE timestamp = (SELECT MAX(timestamp) FROM porte)', (err2, res2) => {
    res.status(200).json(res2.rows[0]);
  });
});

// get at [adresse]/door/open
// Send the request to open the door and forward the response to the sender
app.get('/door/open', (req, res) => {
  console.log("Opening door");
  // the http request to open the door
  query_res = 200 // dummy http response code
  // if the operation was succesful, log it in the database, if not, forward the response code to the app
  if (query_res == 200) {
    client.query('INSERT INTO porte VALUES (DEFAULT, (SELECT NOW()), True)', (err2, res2) => {});
    client.query('SELECT timestamp, ouverte FROM porte WHERE timestamp = (SELECT MAX(timestamp) FROM porte)', (err2, res2) => {
      res.status(200).json(res2.rows[0]);
    });
  }
  else {
    res.status(query_res).json();
  }
});

// get at [adresse]/door/close
// Same as above, but close the door instead
app.get('/door/close', (req, res) => {
  console.log("Closing door");
  // The http request to close the door
  query_res = 200 // dummy http response code
  // same as above, only log the operation if it was succesfull
  if (query_res == 200) {
    client.query('INSERT INTO porte VALUES (DEFAULT, (SELECT NOW()), False)', (err2, res2) => {});
    client.query('SELECT timestamp, ouverte FROM porte WHERE timestamp = (SELECT MAX(timestamp) FROM porte)', (err2, res2) => {
      res.status(200).json(res2.rows[0]);
    });
  }
  else {
    res.status(query_res).json();
  }
});

// get at [adresse]/camera
// Request the IP of the camera and send it
app.get('/camera', (req, res) => {
  // http request to get the port of the camera
  port = "8081";
  res.status(200).json('{"ip":' + rasp_ip + ', "port":' + port + "}");
});

// start the server and listen on port 8080
app.listen(8080, () => {
  console.log('Server online');
});
