// app.js
const express = require("express");
const app = express();

// ❌ 1. Hardcoded secret (Security Issue)
const API_KEY = "12345-SECRET-KEY";

// ❌ 2. No input validation (XSS risk)
app.get("/search", (req, res) => {
    const query = req.query.q;
    res.send(`<h1>Results for: ${query}</h1>`);
});

// ❌ 3. Command Injection vulnerability
const { exec } = require("child_process");

app.get("/run", (req, res) => {
    const cmd = req.query.cmd;
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            return res.send("Error");
        }
        res.send(stdout);
    });
});

// ❌ 4. Using outdated/vulnerable dependency (example)
const lodash = require("lodash"); // assume vulnerable version

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
