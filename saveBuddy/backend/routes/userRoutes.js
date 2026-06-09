const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

const connectDB = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const lessonOrder = [
	"vierStappen",
	"reanimeren",
	"verslikking",
	"huidwonde",
	"brandwonde",
	"bloeding",
	"letsels",
	"vergiftiging",
	"verdrinking",
];

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const db = await connectDB();
        const users = db.collection("users");

        const user = await users.findOne({
            _id: new ObjectId(req.user.userId),
        });

        if (!user) {
            return res.status(404).json({
                message: "Gebruiker niet gevonden.",
            });
        }

        res.json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                completedLessons: user.completedLessons || [],
                badges: user.badges || [],
                lessonProgress: user.lessonProgress || {},
                activityMinutes: user.activityMinutes || {},
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
        });
    }
});

router.put("/progress/:slug", authMiddleware, async (req, res) => {
    try {
        const { slug } = req.params;
        const { progress, currentExerciseId, completed } = req.body;

        const db = await connectDB();
        const users = db.collection("users");

        const updateFields = {
            [`lessonProgress.${slug}.progress`]: progress,
            [`lessonProgress.${slug}.currentExerciseId`]: currentExerciseId,
            [`lessonProgress.${slug}.completed`]: completed,
        };

        if (completed) {
            const currentIndex = lessonOrder.indexOf(slug);
            const nextLesson = lessonOrder[currentIndex + 1];

            updateFields[`lessonProgress.${slug}.progress`] = 100;

            if (nextLesson) {
                updateFields[`lessonProgress.${nextLesson}.locked`] = false;
            }
        }

        await users.updateOne(
            {
                _id: new ObjectId(req.user.userId),
            },
            {
                $set: updateFields,
            }
        );

        res.json({
            message: "Progress opgeslagen.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error.",
        });
    }
});

router.put("/profile", authMiddleware, async (req, res) => {
	try {
		const { firstName, lastName, email } = req.body;

		if (!firstName || !lastName || !email) {
			return res.status(400).json({
				message: "Uw voornaam, achternaam en email zijn verplicht.",
			});
		}

		const db = await connectDB();
		const users = db.collection("users");

		await users.updateOne(
			{ _id: new ObjectId(req.user.userId) },
			{
				$set: {
					firstName,
					lastName,
					email,
				},
			}
		);

		const updatedUser = await users.findOne({
			_id: new ObjectId(req.user.userId),
		});

		res.json({
			message: "Profiel aangepast.",
			user: {
				id: updatedUser._id,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,
				email: updatedUser.email,
				completedLessons: updatedUser.completedLessons || [],
				badges: updatedUser.badges || [],
				lessonProgress: updatedUser.lessonProgress || {},
				activityMinutes: updatedUser.activityMinutes || {},
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Server error.",
		});
	}
});

module.exports = router;