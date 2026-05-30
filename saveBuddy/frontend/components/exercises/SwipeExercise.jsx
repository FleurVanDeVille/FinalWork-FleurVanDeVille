import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import SwipeCard from "./SwipeCard";

export default function SwipeExercise({ exercise, setSwipeCorrect }) {
	const [scenarios, setScenarios] = useState(exercise.scenarios);

	const currentScenario = scenarios[0];

	const [showWrong, setShowWrong] = useState(false);

	function handleSwipe(direction) {
		if (!currentScenario) return;

		const isCorrectSwipe = direction === currentScenario.correctSwipe;

		if (!isCorrectSwipe) {
			setSwipeCorrect(false);

			setShowWrong(true);

			setTimeout(() => {
				setShowWrong(false);
			}, 2000);

			return;
		}

		const remainingScenarios = scenarios.slice(1);

		if (remainingScenarios.length === 0) {
			setSwipeCorrect(true);
		}

		setScenarios(remainingScenarios);
	}

	if (!currentScenario) {
		return <Text style={styles.question}>Je oefening is klaar!</Text>;
	}

	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			<SwipeCard
				key={currentScenario.id}
				scenario={currentScenario}
				onSwipe={handleSwipe}
			/>

			{showWrong && <Text style={styles.wrongText}>Fout</Text>}

			<View style={styles.optionsRow}>
				<Text style={styles.options}>{exercise.swipeLabels.left}</Text>
				<Text style={styles.options}>{exercise.swipeLabels.right}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	question: {
		fontSize: 20,
		fontWeight: "900",
		color: "#12384C",
		marginBottom: 20,
	},

	options: {
		fontSize: 18,
		fontWeight: "700",
		color: "#12384C",
		marginTop: 20,
	},

	optionsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},

	wrongText: {
		color: "#E53935",
		fontSize: 20,
		fontWeight: "900",
		textAlign: "center",
		marginTop: 20,
	},
});
