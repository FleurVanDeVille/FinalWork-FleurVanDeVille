import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MultipleChoiceExercise({
	exercise,
	selectedAnswer,
	setSelectedAnswer,
}) {
	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			{exercise.answers.map((answer, index) => {
				const label = typeof answer === "string" ? answer : answer.label;
				const image = typeof answer === "object" ? answer.image : null;

				return (
					<TouchableOpacity
						key={`${exercise.id}-${index}`}
						onPress={() => setSelectedAnswer(answer)}
						style={[
							styles.answer,
							selectedAnswer === answer && styles.selectedAnswer,
						]}
					>
						<Text
							style={[
								styles.answerText,
								selectedAnswer === answer && styles.selectedAnswerText,
							]}
						>
							{String.fromCharCode(65 + index)}. {label}
						</Text>

						{image && (
							<Image
								source={image}
								style={styles.answerImage}
								resizeMode="contain"
							/>
						)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	question: {
		color: "#12384C",
		fontSize: 20,
		fontWeight: "900",
		lineHeight: 26,
		marginBottom: 24,
	},

	answer: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#D5D5D5",
	},

	selectedAnswer: {
		backgroundColor: "#12384C",
		borderColor: "#12384C",
	},

	answerText: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "700",
	},

	selectedAnswerText: {
		color: "#FFFFFF",
	},
});
