const express = require("express");
const router = express.Router();
const { loginStudent } = require("../models/student");

router.post('/', async (req, res) => {  
    const { login, haslo } = req.body;

    if (!login || !haslo) {
        return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    }
    
    const student = await loginStudent(login, haslo);
    
    if (!student) {
        return res.status(401).json({ error: 'Błędne dane' });
    }

    req.session.studentId = student.student_id; 
    res.json({ success: true });
});

router.get('/', async (req, res) => {
    res.json({ studentId: req.session.studentId });
})

module.exports = router;