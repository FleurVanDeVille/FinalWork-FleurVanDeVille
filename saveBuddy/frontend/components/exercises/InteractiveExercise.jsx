import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const images = {
	"cpr.png": require("../../assets/images/cpr.png"),
};

export default function InteractiveExercise({
	exercise,
	setInteractiveCorrect,
}) {
	const duration = exercise.settings?.duration ?? 20;
	const minBPM = exercise.settings?.targetBPM?.min ?? 90;
	const maxBPM = exercise.settings?.targetBPM?.max ?? 130;

	const [timeLeft, setTimeLeft] = useState(duration);
	const [started, setStarted] = useState(false);
	const [finished, setFinished] = useState(false);

	const [tapTimes, setTapTimes] = useState([]);
	const [goodHits, setGoodHits] = useState(0);

	const [feedback, setFeedback] = useState("Tik op de borstkas om te starten.");
	const [feedbackType, setFeedbackType] = useState("neutral");

	useEffect(() => {
		if (!started || finished) return;

		const interval = setInterval(() => {
			setTimeLeft((prev) => Math.max(prev - 1, 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [started, finished]);

	useEffect(() => {
		if (started && timeLeft === 0 && !finished) {
			endExercise();
		}
	}, [timeLeft, started, finished]);

	function handleTap() {
		if (finished) return;

		const now = Date.now();

		if (!started) {
			setStarted(true);
		}

		setTapTimes((prev) => {
			const updated = [...prev, now];

			if (updated.length >= 2) {
				const interval =
					updated[updated.length - 1] - updated[updated.length - 2];

				const bpm = Math.round(60000 / interval);

				if (interval > 1500) {
					setFeedback(exercise.feedback.stopped);
					setFeedbackType("wrong");
				} else if (bpm < minBPM) {
					setFeedback(exercise.feedback.tooSlow);
					setFeedbackType("slow");
				} else if (bpm > maxBPM) {
					setFeedback(exercise.feedback.tooFast);
					setFeedbackType("fast");
				} else {
					setFeedback(exercise.feedback.perfect);
					setFeedbackType("perfect");

					setGoodHits((prev) => prev + 1);
				}
			}

			return updated;
		});
	}

	function endExercise() {
		setFinished(true);

		const totalChecks = Math.max(tapTimes.length - 1, 1);
		const accuracy = goodHits / totalChecks;
		const correct = accuracy >= 0.7;

		setInteractiveCorrect(correct);

		if (correct) {
			setFeedback(exercise.feedback.perfect);
			setFeedbackType("perfect");
		} else {
			setFeedback(exercise.feedback.inconsistent);
			setFeedbackType("wrong");
		}
	}

	const progress = ((duration - timeLeft) / duration) * 100;

	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			<View style={styles.timerBox}>
				<Text style={styles.timerText}>
					00:{String(timeLeft).padStart(2, "0")}
				</Text>
			</View>

			<View style={styles.imageCard}>
				<Image
					source={images[exercise.image]}
					style={styles.image}
					resizeMode="contain"
				/>

				<TouchableOpacity
					activeOpacity={0.75}
					style={[
						styles.tapCircle,
						feedbackType === "perfect" && styles.perfectCircle,
						feedbackType === "slow" && styles.slowCircle,
						feedbackType === "fast" && styles.fastCircle,
						feedbackType === "wrong" && styles.wrongCircle,
					]}
					onPress={handleTap}
				>
					<Text style={styles.tapText}>Klik hier</Text>
				</TouchableOpacity>
			</View>

			<View
				style={[
					styles.feedbackBox,
					feedbackType === "perfect" && styles.feedbackPerfect,
					feedbackType === "slow" && styles.feedbackSlow,
					feedbackType === "fast" && styles.feedbackFast,
					feedbackType === "wrong" && styles.feedbackWrong,
				]}
			>
				<Text style={styles.feedbackText}>{feedback}</Text>
			</View>

			<View style={styles.progressBox}>
				<View style={[styles.progressFill, { width: `${progress}%` }]} />
			</View>

			<Text style={styles.compressions}>Compressies: {tapTimes.length}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	question: {
		fontSize: 20,
		fontWeight: "900",
		color: "#12384C",
		lineHeight: 25,
		marginBottom: 12,
	},

	timerBox: {
		backgroundColor: "#FFFFFF",
		alignSelf: "flex-start",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginBottom: 10,
	},

	timerText: {
		color: "#12384C",
		fontSize: 18,
		fontWeight: "900",
	},

	imageCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 14,
		height: 340,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		marginBottom: 16,
	},

	image: {
		width: "100%",
		height: "125%",
	},

	tapCircle: {
		position: "absolute",
		top: "48%",
		width: 95,
		height: 95,
		borderRadius: 60,
		backgroundColor: "#f8cf0089",
		borderWidth: 2,
		borderColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
	},

	perfectCircle: {
		backgroundColor: "#8FC3A3",
	},

	slowCircle: {
		backgroundColor: "#A7CAEF",
	},

	fastCircle: {
		backgroundColor: "#f8cf00",
	},

	wrongCircle: {
		backgroundColor: "#F03C30",
	},

	tapText: {
		color: "#12384C",
		fontSize: 17,
		fontWeight: "800",
	},

	feedbackBox: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		padding: 14,
		marginBottom: 14,
	},

	feedbackPerfect: {
		backgroundColor: "#E8F7EA",
	},

	feedbackSlow: {
		backgroundColor: "#EAF3FF",
	},

	feedbackFast: {
		backgroundColor: "#FFF6D9",
	},

	feedbackWrong: {
		backgroundColor: "#FFE4E4",
	},

	feedbackText: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "900",
		lineHeight: 21,
	},

	progressBox: {
		height: 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 999,
		overflow: "hidden",
		marginBottom: 8,
	},

	progressFill: {
		height: "100%",
		backgroundColor: "#12384C",
	},

	compressions: {
		color: "#12384C",
		fontWeight: "800",
	},
});
