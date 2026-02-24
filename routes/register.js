const express = require("express");
const router = express.Router();
const { registerStudent } = require("../models/student");

router.post('/', async (req, res) => {
    const { imie, nazwisko, login, haslo } = req.body;

    if (!imie || !nazwisko || !login || !haslo) {
        return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    }

    if (!imie || !nazwisko || !login || !haslo) {
        return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    }

    try {
        const student = await registerStudent(imie, nazwisko, haslo, login);
        req.session.studentId = student.student_id;
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        // np. login już zajęty
        res.status(400).json({ error: 'Login jest już zajęty' });
    }
});

module.exports = router;