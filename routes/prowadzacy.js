const express = require("express");
const router = express.Router();
const { getAllProwadzacy, createProwadzacy, deleteProwadzacy } = require("../models/prowadzacy");

router.get('/', async (req, res) => {
  try {
    const prowadzacy = await getAllProwadzacy();
    res.json(prowadzacy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});


router.post('/', async (req, res) => {
  const { imie, nazwisko } = req.body;

  if(!imie || !nazwisko) {
    return res.status(400).json({ error: 'Nieprawidłowe dane' });
  }

  try {
    const newProwadzacy = await createProwadzacy(imie, nazwisko);
    res.json(newProwadzacy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd zapisu' });
  }
});

router.delete('/', async (req, res) => {
  const {id} = req.body;

  if(!id) {
    return res.status(400).json({ error: 'Nieprawidłowe dane' });
  }

  try {
    const deletedProwadzacy = await deleteProwadzacy(id);
    res.json(deletedProwadzacy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd usuwania'})
  }
})

module.exports = router;