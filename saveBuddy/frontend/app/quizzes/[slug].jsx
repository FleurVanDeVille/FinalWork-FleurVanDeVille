import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import ExerciseRenderer from "../../components/exercises/ExerciseRenderer";

import quiz1 from "../../data/quizzes/quiz-one.json";
import quiz2 from "../../data/quizzes/quiz-two.json";
import quiz3 from "../../data/quizzes/quiz-three.json";

const quizzesMap = {
	quiz1,
	quiz2,
	quiz3,
};

export default function QuizPage() {
	const { slug } = useLocalSearchParams();

	const quiz = quizzesMap[slug];

	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [orderAnswer, setOrderAnswer] = useState([]);
	const [connectAnswers, setConnectAnswers] = useState({});
	const [textAnswer, setTextAnswer] = useState("");
	const [dropdownAnswers, setDropdownAnswers] = useState({});
	const [swipeCorrect, setSwipeCorrect] = useState(null);

	const [checked, setChecked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	if (!quiz) {
		return (
			<View style={styles.notFound}>
				<Text>Quiz niet gevonden</Text>
			</View>
		);
	}

	const exercise = quiz.exercises[currentExerciseIndex];
	const progress = ((currentExerciseIndex + 1) / quiz.exercises.length) * 100;

	function resetAnswers() {
		setSelectedAnswer(null);
		setOrderAnswer([]);
		setConnectAnswers({});
		setTextAnswer("");
		setDropdownAnswers({});
		setSwipeCorrect(null);
		setChecked(false);
		setIsCorrect(false);
	}

	function handleCheck() {
		if (!checked) {
			let correct = false;

			if (exercise.type === "meerkeuzevragen") {
				if (!selectedAnswer) return;
				correct = selectedAnswer === exercise.correctAnswer;
			}

			if (exercise.type === "volgorde-oefening") {
				if (orderAnswer.length === 0) return;
				correct =
					JSON.stringify(orderAnswer) === JSON.stringify(exercise.correctOrder);
			}

			if (exercise.type === "swipe-oefening") {
				if (swipeCorrect === null) return;
				correct = swipeCorrect;
			}

			setIsCorrect(correct);
			setChecked(true);
			return;
		}

		if (!isCorrect) {
			setChecked(false);
			setSelectedAnswer(null);
			return;
		}

		const isLastExercise = currentExerciseIndex === quiz.exercises.length - 1;

		if (isLastExercise) {
			router.replace("/(tabs)");
		} else {
			setCurrentExerciseIndex(currentExerciseIndex + 1);
			resetAnswers();
		}
	}

	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={styles.container}
			resizeMode="cover"
		>
			<View style={styles.content}>
				<View>
					<View style={styles.topBar}>
						<TouchableOpacity onPress={() => router.back()}>
							<Text style={styles.close}>×</Text>
						</TouchableOpacity>

						<View style={styles.progressBackground}>
							<View
								style={[
									styles.progressFill,
									{ width: `${progress}%` },
								]}
							/>
						</View>
					</View>

					<ExerciseRenderer
						exercise={exercise}
						selectedAnswer={selectedAnswer}
						setSelectedAnswer={setSelectedAnswer}
						orderAnswer={orderAnswer}
						setOrderAnswer={setOrderAnswer}
						connectAnswers={connectAnswers}
						setConnectAnswers={setConnectAnswers}
						textAnswer={textAnswer}
						setTextAnswer={setTextAnswer}
						dropdownAnswers={dropdownAnswers}
						setDropdownAnswers={setDropdownAnswers}
						swipeCorrect={swipeCorrect}
						setSwipeCorrect={setSwipeCorrect}
					/>

					{checked && (
						<View
							style={[
								styles.feedbackBox,
								isCorrect ? styles.correctBox : styles.wrongBox,
							]}
						>
							<Text style={styles.feedbackText}>
								{isCorrect
									? exercise.feedback?.correct || "Juist!"
									: exercise.feedback?.wrong || "Niet juist."}
							</Text>
						</View>
					)}
				</View>

				<TouchableOpacity style={styles.button} onPress={handleCheck}>
					<Text style={styles.buttonText}>
						{checked ? "Volgende" : "Controleer"}
					</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	content: {
		flex: 1,
		paddingHorizontal: 22,
		paddingTop: 60,
		paddingBottom: 40,
		justifyContent: "space-between",
	},

	topBar: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
	},

	close: {
		fontSize: 42,
		color: "#12384C",
		marginRight: 18,
	},

	progressBackground: {
		flex: 1,
		height: 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 999,
		overflow: "hidden",
	},

	progressFill: {
		height: "100%",
		backgroundColor: "#12384C",
		borderRadius: 999,
	},

	feedbackBox: {
		padding: 16,
		borderRadius: 12,
		marginTop: 20,
	},

	correctBox: {
		backgroundColor: "#8FC3A3",
	},

	wrongBox: {
		backgroundColor: "#e73636",
	},

	feedbackText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "800",
	},

	button: {
		backgroundColor: "#F9E47D",
		height: 52,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "900",
	},

	notFound: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});