import { Image, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function DropdownExercise({
	exercise,
	dropdownAnswers,
	setDropdownAnswers,
}) {
	const images = {
		"img-placeholder.png": require("../../assets/images/img-placeholder.png"),
		"img-placeholder.png": require("../../assets/images/img-placeholder.png"),
		"img-placeholder.png": require("../../assets/images/img-placeholder.png"),
	};
	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			{exercise.scenarios.map((scenario) => (
				<View key={scenario.id} style={styles.scenario}>
					<Image
						source={images[scenario.image]}
						style={styles.image}
						resizeMode="cover"
					/>

					<Text style={styles.situation}>{scenario.situation}</Text>

					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						data={exercise.dropdownOptions.map((option) => ({
							label: option,
							value: option,
						}))}
						labelField="label"
						valueField="value"
						placeholder="Kies een antwoord"
						value={dropdownAnswers[String(scenario.id)]}
						onChange={(item) => {
							setDropdownAnswers({
								...dropdownAnswers,
								[String(scenario.id)]: item.value,
							});
						}}
					/>
				</View>
			))}
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

	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},

	scenario: {
		marginBottom: 20,
	},

	situation: {
		fontSize: 16,
		color: "#12384C",
		marginBottom: 10,
		lineHeight: 22,
	},

	dropdown: {
		height: 50,
		borderColor: "#12384C",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		backgroundColor: "#FFFFFF",
	},

	placeholderStyle: {
		color: "#8A8A8A",
		fontSize: 14,
	},

	selectedTextStyle: {
		color: "#12384C",
		fontSize: 14,
		fontWeight: "700",
	},
});
