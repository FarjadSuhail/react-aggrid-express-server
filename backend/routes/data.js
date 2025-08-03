const express = require("express");
const router = express.Router();
const db = require("../db/db");

const tableName = "BMW_Aptitude_Test_Test_Data_ElectricCarData";

router.get("/", async (req, res) => {
  const { search } = req.query;

  let query = `SELECT * FROM ${tableName} WHERE 1=1`;
  const params = [];

  if (search) {
    query += ` AND (Brand LIKE ? OR Model LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }

  try {
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error("Query Error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
