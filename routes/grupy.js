const express = require("express");
const router = express.Router();
const {getKursGrupy, createGrup, deleteGrup, getAllGrupy, getStudentGrupy } = require("../models/grupy");

router.get('/moje', async (req, res) => {
    const studentId = req.session.studentId;
    try {
        const grupy = await getStudentGrupy(studentId);
        res.json(grupy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd pobierania danych' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const grupy = await getKursGrupy(id);
        res.json(grupy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd pobierania danych' });
    }
});

router.get('/', async (req, res) => {
    try {
        const grupy = await getAllGrupy();
        res.json(grupy);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd pobierania danych' });
    }
})

router.post('/', async (req, res) => {
    const {kurs, miejsca, prowadzacy, poczatek, koniec, dzien} = req.body;

    try {
        const newGrup = await createGrup(kurs, miejsca, prowadzacy, poczatek, koniec, dzien);
        res.json(newGrup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd zapisu' });
    }
})

router.delete('/', async (req, res) => {
    const {id} = req.body;

    try {
        const deletedGrup = await deleteGrup(id);
        res.json(deletedGrup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Błąd usuwania'})
    }
})

module.exports = router;
