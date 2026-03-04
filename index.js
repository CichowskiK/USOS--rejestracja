const express = require("express");
const { readFile } = require("fs").promises;
const session = require('express-session');
const { requireLogin, requireLoginAdmin, requireLoginStudent } = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));   //?????


// sesja

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// public (pliki statyczne)
app.use(express.static("public"));


// trasy
const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);
const registerRoutes = require("./routes/register");
app.use("/api/register", registerRoutes);
const logoutRoutes = require("./routes/logout");
app.use("/api/logout", logoutRoutes);


app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

// views

app.get("/", async (req, res) => {
  res.send(
    await readFile('./views/login.html', 'utf-8')
  );
});


// wszystko poniżej musisz być zalogowany
app.use(requireLogin);

app.get('/api/whoami', (req, res) => {
    res.json({ 
      role: req.session.role,
      userId: req.session.studentId || req.session.adminId
    });
});

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);
const studentRoutes = require("./routes/student");
app.use("/api/student", studentRoutes);
const kursyRoutes = require("./routes/kursy");
app.use("/api/kursy", kursyRoutes);
const grupyRoutes = require("./routes/grupy");
app.use("/api/grupy", grupyRoutes);
const porwadzacyRoutes = require("./routes/prowadzacy");
app.use("/api/prowadzacy", porwadzacyRoutes);
const chodzi_naRoutes = require("./routes/chodzi_na");
app.use("/api/chodzi_na", chodzi_naRoutes); 


app.get("/home", async (req, res) => {
  res.send( 
    await readFile('./views/home.html', 'utf-8')
  );
});

app.get("/panel/admin", requireLoginAdmin, async (req, res) => {
  res.send(
    await readFile('./views/panelAdmin.html', 'utf-8')
  );
})

app.get("/student", async (req, res) => {
  res.send(
    await readFile('./views/student.html', 'utf-8')
  );
});

app.get("/student/admin", requireLoginAdmin, async (req, res) => {
  res.send(
    await readFile('./views/studentAdmin.html', 'utf-8')
  );
});

app.get("/kursy/admin", requireLoginAdmin, async (req, res) => {
  res.send(
    await readFile('./views/kursyAdmin.html', 'utf-8')
  );
});

app.get("/kursy", async (req, res) => {
  res.send(
    await readFile('./views/kursy.html', 'utf-8')
  );
});

app.get("/grupy/admin", requireLoginAdmin, async (req, res) => {
  res.send(
    await readFile('./views/grupyAdmin.html', 'utf-8')
  );
});

app.get("/grupy/:id", async (req, res) => {
  res.send(
    await readFile('./views/grupy.html', 'utf-8')
  );
});

app.get("/prowadzacy", async (req, res) => {
  res.send(
    await readFile('./views/prowadzacy.html', 'utf-8')
  );
});

app.get("/prowadzacy/admin", requireLoginAdmin, async (req, res) => {
  res.send(
    await readFile('./views/prowadzacyAdmin.html', 'utf-8')
  );
});
