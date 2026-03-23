require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Azure SQL Config
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// ✅ Root route (important for Azure health check)
app.get("/", (req, res) => {
  res.send("🚀 Auth App Running Successfully on Azure");
});

// ✅ Register API
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await sql.connect(dbConfig);

    await pool.request()
      .input("email", email)
      .input("password", hashedPassword)
      .query("INSERT INTO Users (email, password) VALUES (@email, @password)");

    res.send("✅ User Registered Successfully");

  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error: " + err.message);
  }
});

// ✅ Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input("email", email)
      .query("SELECT * FROM Users WHERE email=@email");

    if (result.recordset.length === 0) {
      return res.status(400).send("❌ User not found");
    }

    const user = result.recordset[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send("❌ Invalid password");
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({
      message: "✅ Login Successful",
      token: token
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error: " + err.message);
  }
});

// ✅ Protected Route Example
app.get("/dashboard", (req, res) => {
  res.send("🔒 This is a protected route (add JWT middleware later)");
});

// ✅ IMPORTANT: Azure PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});