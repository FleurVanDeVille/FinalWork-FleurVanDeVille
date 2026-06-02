import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ConnectExercise({
	exercise,
	connectAnswers,
	setConnectAnswers,
}) {
	const sources = exercise.pairs.map((pair) => pair.source);
	const targets = exercise.pairs.map((pair) => pair.target);

	function handleConnect(source, target) {
		setConnectAnswers({
			...connectAnswers,
			[source]: target,
		});
	}

	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>
			{sources.map((source) => (
				<View key={source} style={styles.row}>
					<View style={styles.sourceCard}>
						<Text style={styles.sourceText}>{source}</Text>
					</View>

					<View style={styles.options}>
						{targets.map((target) => (
							<TouchableOpacity
								key={target}
								onPress={() => handleConnect(source, target)}
								style={[
									styles.targetCard,
									connectAnswers[source] === target && styles.selectedTarget,
								]}
							>
								<Text
									style={[
										styles.targetText,
										connectAnswers[source] === target &&
											styles.selectedTargetText,
									]}
								>
									{target}
								</Text>
							</TouchableOpacity>
						))}
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

	row: {
		marginBottom: 20,
	},

	sourceCard: {
		backgroundColor: "#12384C",
		borderRadius: 10,
		padding: 14,
		marginBottom: 8,
	},

	sourceText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "800",
	},

	options: {
		gap: 8,
	},

	targetCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 12,
		borderWidth: 1,
		borderColor: "#D5D5D5",
	},

	selectedTarget: {
		backgroundColor: "#8FC3A3",
		borderColor: "#8FC3A3",
	},

	targetText: {
		color: "#12384C",
		fontSize: 14,
		fontWeight: "700",
	},

	selectedTargetText: {
		color: "#FFFFFF",
	},
});
