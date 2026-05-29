import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";

export default function OrderExercise({
	exercise,
	orderAnswer,
	setOrderAnswer,
}) {
	const [items, setItems] = useState(exercise.options);

	useEffect(() => {
		setOrderAnswer(items);
	}, []);

	function moveItem(index, direction) {
		const newItems = [...items];
		const newIndex = index + direction;

		if (newIndex < 0 || newIndex >= newItems.length) return;

		const item = newItems[index];
		newItems[index] = newItems[newIndex];
		newItems[newIndex] = item;

		setItems(newItems);
		setOrderAnswer(newItems);
	}

	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			{items.map((item, index) => (
				<View key={item} style={styles.answer}>
					<Text style={styles.answerText}>
						{index + 1}. {item}
					</Text>

					<View style={styles.buttons}>
						<TouchableOpacity onPress={() => moveItem(index, -1)}>
							<Text style={styles.arrow}>↑</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => moveItem(index, 1)}>
							<Text style={styles.arrow}>↓</Text>
						</TouchableOpacity>
					</View>
				</View>
			))}
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	answerText: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "700",
		flex: 1,
	},

	buttons: {
		flexDirection: "row",
		gap: 14,
		marginLeft: 12,
	},

	arrow: {
		color: "#12384C",
		fontSize: 22,
		fontWeight: "900",
	},
});
