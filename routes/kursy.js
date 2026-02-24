const express = require("express");
const router = express.Router();
const { getAllKursy, createKurs } = require("../models/kursy");

router.get('/', async (req, res) => {
  try {
    const students = await getAllKursy();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});


router.post('/', async (req, res) => {
  const { nazwa_kursu, ects } = req.body;

  if(ects < 0) {
    return res.status(400).json({ error: 'Nieprawidłowe dane' });
  }

  try {
    const newKurs = await createKurs(nazwa_kursu, ects);
    res.json(newKurs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd zapisu' });
  }
});

module.exports = router;