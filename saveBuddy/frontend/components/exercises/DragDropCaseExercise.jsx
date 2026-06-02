import { Image, StyleSheet, Text, View } from "react-native";

const images = {
	"koffer.png": require("../../assets/images/ehbo-koffer.png"),
};

export default function DragDropCaseExercise({ exercise }) {
	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			<View style={styles.caseContainer}>
                <Text style={styles.caseText}>Sleep de juiste materialen in de koffer:</Text>
				<Image
					source={images[exercise.image]}
					style={styles.caseImage}
					resizeMode="contain"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	question: {
		fontSize: 20,
		fontWeight: "900",
		color: "#12384C",
		marginBottom: 24,
	},

	caseContainer: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
	},

	caseImage: {
		width: 220,
		height: 180,
	},
});