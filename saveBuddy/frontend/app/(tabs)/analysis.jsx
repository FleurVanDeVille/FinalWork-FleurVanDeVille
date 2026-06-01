import { useState } from "react";
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

export default function Analyse() {
	const activity = [
		{ day: "Ma", value: 13 },
		{ day: "Di", value: 8 },
		{ day: "Wo", value: 24 },
		{ day: "Do", value: 13 },
		{ day: "Vr", value: 4 },
		{ day: "Za", value: 19 },
		{ day: "Zo", value: 13 },
	];

	const categories = [
		{ title: "Vier stappen in eerste hulp", progress: 100 },
		{ title: "Reanimeren", progress: 65 },
		{ title: "Verslikking", progress: 80 },
		{ title: "Huidwonde", progress: 40 },
	];

	const [showAll, setShowAll] = useState(false);

	const visibleLessons = showAll ? lessen : lessen.slice(0, 1);

	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={styles.container}
			resizeMode="cover"
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.headerWrapper}>
					<Image
						source={require("../../assets/images/bg-header.png")}
						style={styles.headerBg}
					/>

					<View style={styles.header}>
						<View>
							<Text style={styles.title}>Analyse</Text>

							<TouchableOpacity style={styles.filterButton}>
								<Text style={styles.filterText}>Deze week</Text>
							</TouchableOpacity>
						</View>

						<Image
							source={require("../../assets/images/mascotte.png")}
							style={styles.mascot}
						/>
					</View>
				</View>

				<View style={styles.topCards}>
					<View style={styles.completedCard}>
						<Text style={styles.completedNumber}>6</Text>
						<Text style={styles.completedText}>Lessen voltooid</Text>
					</View>

					<View style={styles.lessonGrid}>
						{visibleLessons.map((lesson, index) => (
							<View
								key={lesson.id}
								style={[
									styles.lessonWrapper,
									index % 2 !== 0 && styles.rightColumn,
								]}
							>
								<LessonCard lesson={lesson} />
							</View>
						))}
					</View>
				</View>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>
						Activiteit <Text style={styles.smallText}>(min)</Text>
					</Text>

					<View style={styles.chart}>
						<View style={styles.yAxis}>
							{[25, 20, 15, 10, 5, 0].map((number) => (
								<Text key={number} style={styles.axisText}>
									{number}
								</Text>
							))}
						</View>

						<View style={styles.bars}>
							{activity.map((item) => (
								<View key={item.day} style={styles.barItem}>
									<View style={[styles.bar, { height: item.value * 5 }]} />
									<Text style={styles.dayText}>{item.day}</Text>
								</View>
							))}
						</View>
					</View>
				</View>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Categorieën</Text>

					{categories.map((category) => (
						<View key={category.title} style={styles.categoryItem}>
							<View style={styles.categoryHeader}>
								<Text style={styles.categoryText}>{category.title}</Text>
								<Text style={styles.categoryText}>{category.progress}%</Text>
							</View>

							<View style={styles.categoryBackground}>
								<View
									style={[
										styles.categoryFill,
										{ width: `${category.progress}%` },
									]}
								/>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 70,
		paddingBottom: 100,
	},

	headerWrapper: {
		marginHorizontal: -22,
		paddingHorizontal: 22,
		marginTop: -70,
		paddingTop: 70,
		height: 245,
		position: "relative",
		marginBottom: 45,
	},

	headerBg: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		width: "screenWidth",
		height: 255,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	title: {
		color: "#12384C",
		fontSize: 36,
		fontWeight: "900",
		marginBottom: 10,
	},

	filterButton: {
		backgroundColor: "#F93832",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 6,
		alignSelf: "flex-start",
	},

	filterText: {
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "700",
	},

	mascot: {
		width: 165,
		height: 165,
		resizeMode: "contain",
	},

	topCards: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},

	completedCard: {
		width: "48%",
		height: 150,
		backgroundColor: "#F8CD00",
		borderRadius: 12,
		padding: 16,
		justifyContent: "flex-end",
	},

	completedNumber: {
		color: "#12384C",
		fontSize: 46,
		fontWeight: "900",
		marginBottom: 18,
	},

	completedText: {
		color: "#12384C",
		fontSize: 15,
		fontWeight: "700",
	},

	lessonGrid: {
		width: "48%",
		height: 150,
	},

	iconCircle: {
		width: 34,
		height: 34,
		borderRadius: 999,
		backgroundColor: "#12384C",
		justifyContent: "center",
		alignItems: "center",
	},

	iconText: {
		color: "#FFFFFF",
		fontSize: 16,
	},

	duration: {
		color: "#12384C",
		fontSize: 12,
		marginBottom: 4,
	},

	lessonTitle: {
		color: "#12384C",
		fontSize: 18,
		fontWeight: "900",
	},

	progressText: {
		color: "#12384C",
		fontSize: 11,
		textAlign: "right",
		marginTop: 4,
	},

	progressBackground: {
		height: 4,
		backgroundColor: "#EAF2F8",
		borderRadius: 999,
		overflow: "hidden",
	},

	progressFill: {
		height: "100%",
		backgroundColor: "#12384C",
	},

	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 14,
		padding: 14,
		marginBottom: 20,
	},

	cardTitle: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "900",
		marginBottom: 14,
	},

	smallText: {
		color: "#000000",
		fontSize: 13,
		fontWeight: "400",
	},

	chart: {
		flexDirection: "row",
		height: 150,
	},

	yAxis: {
		width: 28,
		justifyContent: "space-between",
		paddingBottom: 20,
	},

	axisText: {
		color: "#000000",
		fontSize: 12,
	},

	bars: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},

	barItem: {
		alignItems: "center",
		justifyContent: "flex-end",
	},

	bar: {
		width: 26,
		backgroundColor: "#12384C",
		borderRadius: 999,
	},

	dayText: {
		marginTop: 8,
		fontSize: 12,
		color: "#000000",
	},

	categoryItem: {
		marginBottom: 12,
	},

	categoryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
	},

	categoryText: {
		color: "#12384C",
		fontSize: 13,
	},

	categoryBackground: {
		height: 10,
		backgroundColor: "#E5E5E5",
		borderRadius: 999,
		overflow: "hidden",
	},

	categoryFill: {
		height: "100%",
		backgroundColor: "#A7CCF2",
		borderRadius: 999,
	},
});
