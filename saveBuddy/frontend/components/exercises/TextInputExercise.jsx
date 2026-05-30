import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TextInputExercise({
	exercise,
	textAnswer,
	setTextAnswer,
}) {
	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			{exercise.placeholder && (
				<Text style={styles.placeholder}>{exercise.placeholder}</Text>
			)}

			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					placeholder="Typ hier je antwoord..."
					placeholderTextColor="#8A8A8A"
					value={textAnswer}
					onChangeText={setTextAnswer}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	question: {
		color: "#12384C",
		fontSize: 20,
		fontWeight: "900",
		lineHeight: 26,
		marginBottom: 12,
	},

	placeholder: {
		color: "#12384C",
		fontSize: 18,
		fontWeight: "600",
		lineHeight: 22,
		marginBottom: 16,
	},

	inputWrapper: {
		backgroundColor: "#FFFFFF",
		borderRadius: 18,
		borderWidth: 2,
		borderColor: "#DDE7EC",
		paddingHorizontal: 18,
		paddingVertical: 14,
		minHeight: 50,
	},

	input: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 22,
		minHeight: 35,
	},
});
