import { Image, StyleSheet, Text, View } from "react-native";

const images = {
	"koffer.png": require("../../assets/images/ehbo-koffer.png"),
	"pijnstillers.png": require("../../assets/images/pijnstillers.png"),
	"pincet.png": require("../../assets/images/pincet.png"),
	"schaar.png": require("../../assets/images/schaar.png"),
	"pleisters.png": require("../../assets/images/pleisters.png"),
	"water.png": require("../../assets/images/water.png"),
	"wondgaas.png": require("../../assets/images/wondgaas.png"),
	"watten.png": require("../../assets/images/watten.png"),
	"thermometer.png": require("../../assets/images/thermometer.png"),
};

export default function DragDropCaseExercise({ exercise }) {
	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			<View style={styles.caseContainer}>
				<Text style={styles.caseText}>
					Sleep de juiste materialen in de koffer:
				</Text>
				<Image
					source={images[exercise.image]}
					style={styles.caseImage}
					resizeMode="contain"
				/>
			</View>

			<View style={styles.itemsContainer}>
				{exercise.items.map((item) => (
					<View key={item.id} style={styles.item}>
						<Image source={images[item.image]} style={styles.itemImage} />

						<Text style={styles.itemText}>{item.text}</Text>
					</View>
				))}
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

	itemsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: 30,
	},

	item: {
		width: "23%",
		alignItems: "center",
		marginBottom: 20,
	},

	itemImage: {
		width: 55,
		height: 55,
	},

	itemText: {
		marginTop: 4,
		fontSize: 12,
		fontWeight: "700",
		color: "#12384C",
		textAlign: "center",
	},
});
