import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import LessonCard from "../../components/LessonCard";
import { lessen } from "../../data/lessons";
import { useState } from "react";

export default function Home() {
	const [showAll, setShowAll] = useState(false);

	const visibleLessons = showAll ? lessen : lessen.slice(0, 6);

	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={styles.container}
			resizeMode="cover"
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<View>
						<Text style={styles.welcome}>Welkom terug,</Text>
						<Text style={styles.name}>Anne-Marie!</Text>
					</View>

					<Image
						source={require("../../assets/images/mascotte-head.png")}
						style={styles.mascot}
					/>
				</View>

				<View style={styles.sectionHeader}>
					<Text style={styles.title}>Lessen</Text>

					<TouchableOpacity onPress={() => setShowAll(!showAll)}>
						<Text style={styles.link}>
							{showAll ? "Minder tonen" : "Alles bekijken"}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.lessonGrid}>
					{visibleLessons.map((lesson) => (
						<LessonCard key={lesson.id} lesson={lesson} />
					))}
				</View>

				<Text style={styles.title}>Quizzen</Text>
				<Text style={styles.subtitle}>Herhaal lessen die je al maakte.</Text>

				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<View style={styles.quizCard}>
						<Text style={styles.quizTitle}>Quiz 1</Text>
					</View>

					<View style={styles.quizCard}>
						<Text style={styles.quizTitle}>Quiz 2</Text>
					</View>

					<View style={styles.quizCard}>
						<Text style={styles.quizTitle}>Quiz 3</Text>
					</View>
				</ScrollView>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 22,
		paddingTop: 70,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 45,
	},

	welcome: {
		color: "#12384C",
		fontSize: 20,
	},

	name: {
		color: "#12384C",
		fontSize: 28,
		fontWeight: "900",
	},

	mascot: {
		width: 120,
		height: 120,
		resizeMode: "contain",
	},

	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	title: {
		color: "#12384C",
		fontSize: 34,
		fontWeight: "900",
		marginBottom: 18,
	},

	link: {
		color: "#000",
		fontSize: 14,
		textDecorationLine: "underline",
	},

	lessonGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 28,
	},

	subtitle: {
		fontSize: 15,
		marginBottom: 18,
	},

	quizCard: {
		width: 145,
		height: 180,
		backgroundColor: "#F8CD00",
		borderRadius: 14,
		marginRight: 14,
		padding: 14,
	},

	quizTitle: {
		color: "white",
		fontSize: 18,
		fontWeight: "900",
		marginTop: 50,
	},
});
