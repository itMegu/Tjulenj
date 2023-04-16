//admin page
const express = require("express"); 
const app = express();
const cors = require("cors");
const pool = require("./baza");
const bodyParser = require('body-parser');

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//vnese cas prihoda
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
      res.status(500).json({ message: 'An error occurred' });
    }
  });

//doda cas odhoda
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
      res.status(500).json({ message: 'An error occurred' });
    }
  });
//doda novo osebo
app.post("/ustvaritev", async (req, res) => {
    try {
        const { ime } = req.body;
        const { priimek } = req.body;
        const { funkcija } = req.body;
        const novPodatek = await pool.query("INSERT INTO usluzbenci (ime, priimek, funkcija) VALUES($1, $2, $3) RETURNING *", [ime, priimek, funkcija]);
        res.json(novPodatek.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});
//doda nov cas


//dobi vse osebe (get)
app.get("/ustvaritev", async(req, res) =>{
    try {
        const vsiPodatki = await pool.query("SELECT * FROM usluzbenci")
        res.json(vsiPodatki.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});

//dobi osebo (get)
app.get("/ustvaritev/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const podatki = await pool.query("SELECT * FROM usluzbenci WHERE id = $1" , [id]);
        res.json(podatki.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'An error occurred' });
    }
}); 

//posodobi opis osebe (update preko id)
app.put("/ustvaritev/:id" , async(req, res) =>{
    try {
        const { id } = req.params;
        const { ime } = req.body;
        const { priimek } = req.body;
        const { funkcija } = req.body;
        const posodobiPodatke = await pool.query("UPDATE usluzbenci SET ime = $1, priimek = $2, funkcija = $3 WHERE id = $4" , [ime, priimek, funkcija, id]); 
        res.json("Podatki so bili posodobljeni");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});

//izbris osebe
app.delete("/ustvaritev/:id" , async(req, res) =>{
    try {
        const { id } = req.params; 
        const odstraniPodatke = await pool.query("DELETE FROM usluzbenci WHERE id = $1" , [id]);
        res.json("Podatki so bili izbrisani");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});

//port in pa se lepo pove ce je zagnan
app.listen(5000, () => {
    console.log("Server zagnan na portu 5000");
});