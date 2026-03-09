const express = require("express");
const router = express.Router();
const { registerStudent } = require("../models/student");
const { registerAdmin } = require("../models/admin");

router.post('/student', async (req, res) => {
    const {name, surname, login, password} = req.body;

    if (!name || !surname || !login || !password) {
        return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    }

    if (name.length > 50) return res.status(400).json({ error: 'Imię jest za długie (max 50 znaków)' });
    if (surname.length > 50) return res.status(400).json({ error: 'Nazwisko jest za długie (max 50 znaków)' });
    if (login.length > 30) return res.status(400).json({ error: 'Login jest za długi (max 30 znaków)' });
    if (password.length > 72) return res.status(400).json({ error: 'Hasło jest za długie (max 72 znaki)' });
    if (password.length < 8) return res.status(400).json({ error: 'Hasło musi mieć min. 8 znaków' });

    try {
        const student = await registerStudent(name, surname, password, login);
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

    if (name.length > 50) return res.status(400).json({ error: 'Imię jest za długie (max 50 znaków)' });
    if (surname.length > 50) return res.status(400).json({ error: 'Nazwisko jest za długie (max 50 znaków)' });
    if (login.length > 30) return res.status(400).json({ error: 'Login jest za długi (max 30 znaków)' });
    if (password.length > 72) return res.status(400).json({ error: 'Hasło jest za długie (max 72 znaki)' });
    if (password.length < 8) return res.status(400).json({ error: 'Hasło musi mieć min. 8 znaków' });

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