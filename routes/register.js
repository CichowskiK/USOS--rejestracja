const express = require("express");
const router = express.Router();
const { registerStudent } = require("../models/student");
const { registerAdmin } = require("../models/admin");

router.post('/student', async (req, res) => {
    const {name, surname, login, password} = req.body;

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

router.post('/admin', async (req, res) => {
    const {name, surname, login, password} = req.body;

    if(!name || !surname || !login || !password) {
        return res.status(400).json({ error: "Wypełnij wszystkie pola"});
    }

    try {
        const admin = await registerAdmin(name, surname, password, login);
        req.session.adminId = admin.admin_id;
        res.json({ success : true});
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Login jest już zajęty' });
    }

});

module.exports = router;