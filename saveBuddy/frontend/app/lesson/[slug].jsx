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

import bloeding from "../../data/lessons/bleeding.json";
import brandwonde from "../../data/lessons/burns.json";
import verslikking from "../../data/lessons/choking.json";
import reanimeren from "../../data/lessons/cpr.json";
import verdrinking from "../../data/lessons/drowning.json";
import vierStappen from "../../data/lessons/four-steps-of-first-aid.json";
import letsels from "../../data/lessons/injuries.json";
import vergiftiging from "../../data/lessons/poisoning.json";
import huidwonde from "../../data/lessons/skin-wounds.json";

const lessonsMap = {
	vierStappen,
	bloeding,
	brandwonde,
	huidwonde,
	reanimeren,
	verslikking,
	letsels,
	vergiftiging,
	verdrinking,
};

const images = {
	"cpr.png": require("../../assets/images/img-placeholder.png"),
};

export default function LessonPage() {
	const { slug } = useLocalSearchParams();

	const lesson = lessonsMap[slug];

	const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const [orderAnswer, setOrderAnswer] = useState([]);

	const [connectAnswers, setConnectAnswers] = useState({});

	const [textAnswer, setTextAnswer] = useState("");

	const [dropdownAnswers, setDropdownAnswers] = useState({});

	const [swipeCorrect, setSwipeCorrect] = useState(null);

	const [checked, setChecked] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	const [dragDropCorrectItems, setDragDropCorrectItems] = useState([]);

	if (!lesson) {
		return (
			<View style={styles.notFound}>
				<Text>Les niet gevonden</Text>
			</View>
		);
	}

	const exercise = lesson.exercises[currentExerciseIndex];

	const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

	function handleNextExercise() {
		const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1;

		if (isLastExercise) {
			router.replace("/(tabs)");
			return;
		}

		setCurrentExerciseIndex(currentExerciseIndex + 1);

		setSelectedAnswer(null);
		setOrderAnswer([]);
		setConnectAnswers({});
		setTextAnswer("");
		setDropdownAnswers({});
		setSwipeCorrect(null);
		setDragDropCorrectItems([]);

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

			if (exercise.type === "dropdown-oefening") {
				if (Object.keys(dropdownAnswers).length !== exercise.scenarios.length)
					return;

				const correctDropdownAnswers = {};

				exercise.scenarios.forEach((scenario) => {
					correctDropdownAnswers[scenario.id] = scenario.correctAnswer;
				});

				correct =
					JSON.stringify(dropdownAnswers) ===
					JSON.stringify(correctDropdownAnswers);
			}

			if (exercise.type === "verbind-oefening") {
				const correctConnections = {};

				exercise.pairs.forEach((pair) => {
					correctConnections[pair.source] = pair.target;
				});

				correct =
					JSON.stringify(connectAnswers) === JSON.stringify(correctConnections);
			}

			if (exercise.type === "tekst-input") {
				correct = exercise.correctAnswers.some(
					(answer) =>
						textAnswer.trim().toLowerCase() ===
						String(answer).trim().toLowerCase(),
				);
			}

			if (exercise.type === "swipe-oefening") {
				if (swipeCorrect === null) return;

				correct = swipeCorrect;
			}

			if (exercise.type === "drag-drop-koffer") {
				const correctItems = exercise.items.filter((item) => item.correct);

				correct = dragDropCorrectItems.length === correctItems.length;
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

		const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1;

		if (isLastExercise) {
			router.replace("/(tabs)");
		} else {
			setCurrentExerciseIndex(currentExerciseIndex + 1);

			setSelectedAnswer(null);
			setOrderAnswer([]);

			setConnectAnswers({});

			setTextAnswer("");

			setDropdownAnswers({});

			setSwipeCorrect(null);
			
			setDragDropCorrectItems([]);

			setChecked(false);
			setIsCorrect(false);
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
									{
										width: `${progress}%`,
									},
								]}
							/>
						</View>
					</View>

					{exercise.image && images[exercise.image] && (
						<Image
							source={images[exercise.image]}
							style={styles.exerciseImage}
							resizeMode="contain"
						/>
					)}

					{exercise.type === "verbind-oefening" ||
					exercise.type === "dropdown-oefening" ? (
						<ScrollView
							style={styles.connectScroll}
							showsVerticalScrollIndicator={false}
						>
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
								dragDropCorrectItems={dragDropCorrectItems}
								setDragDropCorrectItems={setDragDropCorrectItems}
							/>
						</ScrollView>
					) : (
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
							dragDropCorrectItems={dragDropCorrectItems}
							setDragDropCorrectItems={setDragDropCorrectItems}
						/>
					)}
				</View>

				{checked && (
					<View
						style={[
							styles.feedbackBox,
							isCorrect ? styles.correctBox : styles.wrongBox,
						]}
					>
						<Text style={styles.feedbackText}>
							{isCorrect
								? exercise.globalFeedback?.perfect ||
									exercise.feedback?.correct ||
									"Super! Heel goed."
								: exercise.globalFeedback?.incomplete ||
									exercise.feedback?.wrong ||
									"Niet helemaal. Probeer opnieuw."}
						</Text>
					</View>
				)}

				<TouchableOpacity
					style={[
						styles.button,
						checked && isCorrect && styles.correctButton,
						checked && !isCorrect && styles.wrongButton,
						!checked &&
							!selectedAnswer &&
							exercise.type === "meerkeuzevragen" &&
							styles.disabledButton,
					]}
					onPress={handleCheck}
				>
					<Text style={styles.buttonText}>
						{checked ? (isCorrect ? "Volgende" : "Opnieuw") : "Controleer"}
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
		position: "relative",
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

	exerciseImage: {
		width: "100%",
		height: 200,
		marginBottom: 24,
	},

	feedbackBox: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		paddingHorizontal: 22,
		paddingTop: 18,
		paddingBottom: 96,
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
	},

	correctBox: {
		backgroundColor: "#8ACF91",
	},

	wrongBox: {
		backgroundColor: "#F24B4B",
	},

	feedbackText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "900",
		lineHeight: 20,
		marginBottom: 16,
	},

	button: {
		backgroundColor: "#F9E47D",
		height: 52,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},

	correctButton: {
		backgroundColor: "#175420",
	},

	wrongButton: {
		backgroundColor: "#B70D0D",
	},

	disabledButton: {
		opacity: 0.5,
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

	connectScroll: {
		maxHeight: 620,
	},
});
