import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import API_URL from "../../api";
import LessonCard from "../../components/LessonCard";
import QuizCard from "../../components/QuizCard";
import { lessen } from "../../data/lessons";
import { quizzes } from "../../data/quizzes";

export default function Home() {
	const [firstName, setFirstName] = useState("");
	const [lessonProgress, setLessonProgress] = useState({});

	useFocusEffect(
		useCallback(() => {
			const loadUser = async () => {
				try {
					const token = await AsyncStorage.getItem("token");

					if (!token) return;

					const response = await fetch(`${API_URL}/user/me`, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					const data = await response.json();

					if (response.ok) {
						setFirstName(data.user.firstName);
						setLessonProgress(data.user.lessonProgress || {});

						await AsyncStorage.setItem("user", JSON.stringify(data.user));
					}
				} catch (error) {
					console.log(error);
				}
			};

			loadUser();
		}, []),
	);

	const [showAll, setShowAll] = useState(false);

	const lessonsWithProgress = lessen.map((lesson) => {
		const progressData = lessonProgress[lesson.slug];

		return {
			...lesson,
			progress: Math.round(progressData?.progress ?? 0),
			locked: progressData?.locked ?? lesson.id !== 1,
			completed: progressData?.completed ?? false,
			currentExerciseId: progressData?.currentExerciseId ?? 1,
		};
	});

	const visibleLessons = showAll
		? lessonsWithProgress
		: lessonsWithProgress.slice(0, 6);

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
							<Text style={styles.welcome}>Welkom terug,</Text>
							<Text style={styles.name}>{firstName}!</Text>
						</View>

						<Image
							source={require("../../assets/images/mascotte.png")}
							style={styles.mascot}
						/>
					</View>
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

				<Text style={styles.title}>Quizzen</Text>
				<Text style={styles.subtitle}>Herhaal lessen die je al maakte.</Text>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.quizScroll}
				>
					{quizzes.map((quiz) => (
						<QuizCard key={quiz.id} quiz={quiz} />
					))}
				</ScrollView>
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
	},

	headerWrapper: {
		marginHorizontal: -22,
		paddingHorizontal: 22,
		marginTop: -70,
		paddingTop: 70,
		height: 245,
		position: "relative",
		marginBottom: 25,
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

	welcome: {
		color: "#12384C",
		fontSize: 20,
	},

	name: {
		color: "#12384C",
		fontSize: 28,
		fontWeight: "900",
	},

	lessonWrapper: {
		width: "48%",
		marginBottom: -30,
	},

	rightColumn: {
		marginTop: 55,
	},

	mascot: {
		width: 170,
		height: 170,
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
		marginBottom: 15,
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
		marginBottom: 65,
	},

	subtitle: {
		fontSize: 15,
		marginBottom: 18,
	},

	quizScroll: {
		marginBottom: 125,
		marginRight: -22,
	},
});
