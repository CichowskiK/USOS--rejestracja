const pool = require("../config/db");
const bcrypt = require('bcrypt');

const loginAdmin = async (login, password) => {
    const result = await pool.query(
        'SELECT * FROM admin WHERE login = $1',
        [login]
    );

    const admin = result.rows[0];

    if (!admin) return null;

    const correct = await bcrypt.compare(password, admin.password);

    if (!correct) return null;

    return admin;
};

const registerAdmin = async (name, surname, password, login) => {

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
        "INSERT INTO admin (name, surname, password, login) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, surname, hash, login]
    );
    return result.rows[0];
};

const getAllAdmin = async () => {
    const result = await pool.query(
        "SELECT * FROM admin"
    );

    return result.rows;
}

const deleteAdmin = async (id) => {
    const count = await pool.query(
        "SELECT COUNT(*) FROM admin"
    );

    if (parseInt(count.rows[0].count) <= 1) return null;

    const result = await pool.query(
        "DELETE FROM admin WHERE admin_id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
}

module.exports = {loginAdmin, registerAdmin, getAllAdmin, deleteAdmin};
