const express = require("express");
const router = express.Router();
const { getAllStudents, createStudent, deleteStudent } = require("../models/student");

router.get('/', async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
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
    const newStudent = await createStudent(imie, nazwisko);
    res.json(newStudent);
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
    const deletedStudent = await deleteStudent(id);
    res.json(deletedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd usuwania'})
  }
})

module.exports = router;