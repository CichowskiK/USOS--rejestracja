const pool = require("../config/db");

const getAllKursy = async () => {
    const result = await pool.query("SELECT * FROM kursy");
    return result.rows;
};

const createKurs = async (nazwa_kursu, ects) => {
    const result = await pool.query(
        "INSERT INTO kursy (nazwa_kursu, ects) VALUES ($1, $2) RETURNING *",
        [nazwa_kursu, ects]
    );
    return result.rows[0];
};

module.exports = { getAllKursy, createKurs };