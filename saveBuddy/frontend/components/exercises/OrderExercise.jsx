import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function OrderExercise({
	exercise,
	orderAnswer,
	setOrderAnswer,
}) {
	const [items, setItems] = useState(exercise.options);

	useEffect(() => {
		setOrderAnswer(items);
	}, []);

	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			<DraggableFlatList
				data={items}
				keyExtractor={(item) => item}
				onDragEnd={({ data }) => {
					setItems(data);
					setOrderAnswer(data);
				}}
				renderItem={({ item, drag, isActive, getIndex }) => (
					<TouchableOpacity
						onLongPress={drag}
						disabled={isActive}
						style={[
							styles.answer,
							isActive && styles.activeAnswer,
						]}
					>
						<Text style={styles.answerText}>
							{getIndex() + 1}. {item}
						</Text>

						<Text style={styles.dragIcon}>☰</Text>
					</TouchableOpacity>
				)}
			/>
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

	activeAnswer: {
		backgroundColor: "#EAF6EF",
		borderColor: "#8FC3A3",
	},

	answerText: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "700",
		flex: 1,
	},

	dragIcon: {
		color: "#12384C",
		fontSize: 22,
		fontWeight: "900",
		marginLeft: 12,
	},
});