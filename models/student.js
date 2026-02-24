const pool = require("../config/db");
const bcrypt = require('bcrypt');

const getAllStudents = async () => {
    const result = await pool.query("SELECT * FROM student");
    return result.rows;
};

async function loginStudent(login, haslo) {
    const result = await pool.query(
        'SELECT * FROM student WHERE login = $1',
        [login]
    );

    const student = result.rows[0];

    if (!student) return null; // nie ma takiego loginu

    const zgodne = await bcrypt.compare(haslo, student.haslo);

    if (!zgodne) return null;

    return student;
}

const registerStudent = async (imie, nazwisko, haslo, login) => {


    const saltRounds = 10;
    const hash = await bcrypt.hash(haslo, saltRounds);



    const result = await pool.query(
        "INSERT INTO student (imie, nazwisko, haslo, login) VALUES ($1, $2, $3, $4) RETURNING *",
        [imie, nazwisko, hash, login]
    );
    return result.rows[0];
};

const createStudent = async (imie, nazwisko) => {

    const result = await pool.query(
        "INSERT INTO student (imie, nazwisko) VALUES ($1, $2) RETURNING *",
        [imie, nazwisko]
    );
    return result.rows[0];
};



const deleteStudent = async (id) => {
    const result= await pool.query(
        "DELETE FROM student WHERE student_id=($1) RETURNING *",
        [id]
    )
    return result.rows[0];
}

module.exports = { getAllStudents, createStudent, deleteStudent, loginStudent, registerStudent};