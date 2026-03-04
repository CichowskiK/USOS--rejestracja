const express = require("express");
const router = express.Router();
const {register, unRegister, whereRegistered, getStudentGrupa} = require("../models/chodzi_na");
const {zajmijMiejsce, zwolnijMiejsce} = require("../models/grupy")

router.get('/sprawdz/:kursId', async (req, res) => {
    const studentId = req.session.studentId;
    const { kursId } = req.params;

    try {
        const grupa = await getStudentGrupa(studentId, kursId);
        res.json({ grupa }); // null jeśli nie zapisany
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd sprawdzania' });
    }
});


router.post('/', async (req, res) => {
    const studentId = req.session.studentId;
    const { grup_id, kurs_id } = req.body;

    try {
        const juzZapisany = await getStudentGrupa(studentId, kurs_id);
        
        if (juzZapisany) {
            return res.status(400).json({ error: 'Jesteś już zapisany do grupy z tego kursu' });
        }

        const zapisany = await zajmijMiejsce(grup_id);
        const wpis = await register(grup_id, studentId);
        res.json({ success: true, wpis });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd rejestracji' });
    }
});

router.delete('/:grupId', async (req, res) => {
    const studentId = req.session.studentId;
    const { grupId } = req.params;

    try {
        const wpis = await unRegister(grupId, studentId);
        const zapisany = await zwolnijMiejsce(grupId);
        if (!wpis) return res.status(404).json({ error: 'Nie jesteś zapisany do tej grupy' });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd wyrejestrowania' });
    }
});

module.exports = router;