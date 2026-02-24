const pool = require("../config/db");

const getAllProwadzacy = async () => {
    const result = await pool.query("SELECT * FROM prowadzacy");
    return result.rows;
};

const createProwadzacy = async (imie, nazwisko) => {
    const result = await pool.query(
        "INSERT INTO prowadzacy (imie, nazwisko) VALUES ($1, $2) RETURNING *",
        [imie, nazwisko]
    );
    return result.rows[0];
};

const deleteProwadzacy = async (id) => {
    const result= await pool.query(
        "DELETE FROM prowadzacy WHERE prowadzacy_id=($1) RETURNING *",
        [id]
    )
    return result.rows[0];
}

module.exports = { getAllProwadzacy, createProwadzacy, deleteProwadzacy };