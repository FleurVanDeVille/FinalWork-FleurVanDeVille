const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
    console.log("Register endpoint aangeroepen");
    console.log(req.body);

    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Vul alle velden in." });
        }

        const db = await connectDB();
        const users = db.collection("users");

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "Email is al in gebruik." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await users.insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            completedLessons: [],
            badges: [],
            createdAt: new Date(),
        });

        res.status(201).json({
            message: "Account aangemaakt.",
            userId: result.insertedId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email en wachtwoord zijn verplicht." });
        }

        const db = await connectDB();
        const users = db.collection("users");

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Ongeldige login." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Ongeldige login." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login succesvol.",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                completedLessons: user.completedLessons || [],
                badges: user.badges || [],
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;