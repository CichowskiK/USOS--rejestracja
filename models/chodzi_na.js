const pool = require("../config/db");

const whereRegistered = async (student_id) => {
    const result = await pool.query(
        "SELECT * FROM chodzi_na WHERE student_id=$1",
        [student_id]
    );
    return result;
}

const getStudentGrupa = async (studentId, kursId) => {
    const result = await pool.query(
        `SELECT chodzi_na.grup_id FROM chodzi_na
         JOIN grupy ON grupy.grup_id = chodzi_na.grup_id
         WHERE chodzi_na.student_id = $1 AND grupy.kurs_id = $2`,
        [studentId, kursId]
    );
    return result.rows[0] || null;
};

const register = async (grup_id, student_id) => {
    const result = await pool.query(
        "INSERT INTO chodzi_na (grup_id, student_id) VALUES ($1, $2) RETURNING *",
        [grup_id, student_id]
    );
    return result.rows[0];
};

const unRegister = async (grup_id, student_id) => {
    const result = await pool.query(
        "DELETE FROM chodzi_na WHERE grup_id=$1 AND student_id=$2 RETURNING *", 
        [grup_id, student_id]
    );
    return result.rows[0];
};

module.exports = { whereRegistered, register, unRegister, getStudentGrupa };