const express = require("express");
const router = express.Router();
const { loginStudent } = require("../models/student");
const { loginAdmin } = require("../models/admin");

router.post('/', async (req, res) => {  
    const { login, haslo } = req.body;

    if (!login || !haslo) {
        return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
    }
    
    let user = await loginStudent(login, haslo);
    
    if (user) {
        req.session.studentId = user.student_id; 
        req.session.role = "student"
        return res.json({ success: true });
    }

    user = await loginAdmin(login, haslo);

    if (user) {
        req.session.adminId = user.admin_id;
        req.session.role = "admin"
        return res.json({ success: true });
    }

    return res.status(401).json({ error: 'Błędne dane' });
});

module.exports = router;