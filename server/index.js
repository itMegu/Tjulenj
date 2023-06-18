const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./baza');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Endpoint for employee check-in
app.post('/api/checkin', async (req, res) => {
  const { employeeId, checkInTime } = req.body;

  try {
    await pool.query('INSERT INTO sledenjacasa (usluzbenciid, casprihod) VALUES ($1, $2)', [
      employeeId,
      checkInTime,
    ]);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error during check-in:', error);
    res.sendStatus(500);
  }
});

// Endpoint for employee check-out
app.post('/api/checkout', async (req, res) => {
  const { employeeId, checkOutTime } = req.body;

  try {
    await pool.query(
      'UPDATE sledenjacasa SET casodhoda = $1 WHERE usluzbenciid = $2 AND casodhoda IS NULL',
      [checkOutTime, employeeId]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error('Error during check-out:', error);
    res.sendStatus(500);
  }
});

// Preverjanje pravilnosti uporabniškega imena in gesla
app.post('/api/admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT COUNT(*) FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows[0].count > 0) {
      res.status(200).json(result.rows);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error('Napaka pri poizvedbi:', err);
    res.sendStatus(500);
  }
});


// Vnese čas prihoda
app.post('/api/casPrihod', async (req, res) => {
  try {
    const { usluzbenciid } = req.body;
    const now = new Date();
    const result = await pool.query(
      'INSERT INTO sledenjacasa (usluzbenciid, casprihod) VALUES ($1, $2) RETURNING id',
      [usluzbenciid, now]
    );
    const { id } = result.rows[0];
    res.status(201).json({
      message: 'Čas je bil zabeležen',
      id,
      usluzbenciid,
      casprihod: now,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Doda čas odhoda
app.post('/api/casOdhoda', async (req, res) => {
  try {
    const { usluzbenciid } = req.body;
    const now = new Date();
    const result = await pool.query(
      'UPDATE sledenjacasa SET casodhoda = $1 WHERE usluzbenciid = $2 AND casodhoda IS NULL RETURNING id',
      [now, usluzbenciid]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'Za zaposlenega ni bilo mogoče najti aktivne prijave' });
    }

    const { id } = result.rows[0];

    res.status(201).json({
      message: 'Čas odhoda zabeležen',
      id,
      usluzbenciid,
      casodhoda: now,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Doda novo osebo
app.post("/ustvaritev", async (req, res) => {
  try {
    const { ime, priimek, funkcija } = req.body;
    const novPodatek = await pool.query(
      "INSERT INTO usluzbenci (ime, priimek, funkcija) VALUES($1, $2, $3) RETURNING *",
      [ime, priimek, funkcija]
    );
    res.json(novPodatek.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Dobi vse osebe (GET)
app.get("/ustvaritev", async (req, res) => {
  try {
    const vsiPodatki = await pool.query("SELECT * FROM usluzbenci");
    res.json(vsiPodatki.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Dobi osebo (GET)
app.get("/ustvaritev/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const podatki = await pool.query("SELECT * FROM usluzbenci WHERE id = $1", [id]);
    res.json(podatki.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Posodobi opis osebe (UPDATE preko ID)
app.put("/ustvaritev/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ime, priimek, funkcija } = req.body;
    const posodobiPodatke = await pool.query(
      "UPDATE usluzbenci SET ime = $1, priimek = $2, funkcija = $3 WHERE id = $4",
      [ime, priimek, funkcija, id]
    );
    res.json({ message: 'Podatki so bili posodobljeni' });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Izbriše osebo
app.delete("/ustvaritev/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const odstraniPodatke = await pool.query("DELETE FROM usluzbenci WHERE id = $1", [id]);
    res.json({ message: 'Podatki so bili izbrisani' });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Port in izpis, če je strežnik zagnan
app.listen(5000, () => {
  console.log("Server zagnan na portu 5000");
});