const express = require("express");
const router = express.Router();
const { getAllAdmin, deleteAdmin } = require("../models/admin");

router.get('/', async (req, res) => {
    try {
        const admins = await getAllAdmin();
        res.json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Błąd pobierania danych" });
    }
});

router.delete('/', async (req, res) => {
    const {id} = req.body;

    if(!id) {
        return res.status(400).json({ error: "Nieprawidłowe dane" });
    }

    try {
        const deletedAdmin = await deleteAdmin(id);
        res.json(deletedAdmin);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Błąd usuwania" });
    }
});

module.exports = router;