const pool = require("../config/db");

const getKursGrupy = async (id) => {
    const result = await pool.query(
        "SELECT * FROM prowadzacy RIGHT OUTER JOIN grupy ON prowadzacy.prowadzacy_id = grupy.prowadzacy_id WHERE kurs_id = ($1)",
        [id]
    );
    return result.rows;
}

const getStudentGrupy = async (studentId) => {
    const result = await pool.query(
        `SELECT * FROM kursy NATURAL JOIN grupy LEFT OUTER JOIN prowadzacy ON prowadzacy.prowadzacy_id = grupy.prowadzacy_id WHERE grup_id IN (SELECT grup_id FROM chodzi_na WHERE student_id = $1)`,
        [studentId]
    );
    return result.rows;
}
const getAllGrupy = async () =>{
    const result = await pool.query(
        "SELECT * FROM prowadzacy RIGHT OUTER JOIN grupy ON prowadzacy.prowadzacy_id = grupy.prowadzacy_id"
    );
    return result.rows;
}

const createGrup = async (kurs_id, wolne_miejsca =15, 
    prowadzacy_id = null, zajecia_od = null, zajecia_do= null, dzien = null) => {
    const result = await pool.query(
        `INSERT INTO grupy (kurs_id, wolne_miejsca, prowadzacy_id, zajecia_od, zajecia_do, dzien_tygodnia)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [kurs_id, wolne_miejsca, prowadzacy_id, zajecia_od, zajecia_do, dzien]
    );
    return result.rows[0];
};

const deleteGrup = async (id) => {
    const result = await pool.query(
        "DELETE FROM grupy WHERE grup_id= ($1) RETURNING *",
        [id]
    );
    return result.rows[0];
};

const zajmijMiejsce = async (id) => {
    const result = await pool.query(
        "UPDATE grupy SET wolne_miejsca = wolne_miejsca-1 where grup_id= $1 RETURNING * ",
        [id]
    );
    return result.rows[0];
}

const zwolnijMiejsce = async (id) => {
    const result = await pool.query(
        "UPDATE grupy SET wolne_miejsca = wolne_miejsca+1 where grup_id= $1 RETURNING * ",
        [id]
    );
    return result.rows[0];
}

module.exports = { getKursGrupy, createGrup, deleteGrup, getAllGrupy, getStudentGrupy, zajmijMiejsce, zwolnijMiejsce };