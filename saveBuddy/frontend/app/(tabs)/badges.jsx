import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { badges } from "../../data/badges.js";

export default function Badges() {
	const [lessonProgress, setLessonProgress] = useState({});
	const [unlockedBadges, setUnlockedBadges] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const loadBadges = async () => {
				const savedBadges = await AsyncStorage.getItem("unlockedBadges");
				setUnlockedBadges(savedBadges ? JSON.parse(savedBadges) : []);
			};

			loadBadges();
		}, []),
	);

	useEffect(() => {
		const loadProgress = async () => {
			const savedProgress = await AsyncStorage.getItem("lessonProgress");

			if (savedProgress) {
				setLessonProgress(JSON.parse(savedProgress));
			}
		};
		loadProgress();
	}, []);

	return (
		<ImageBackground
			source={require("../../assets/images/background.png")}
			style={styles.container}
			resizeMode="cover"
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.headerWrapper}>
					<Image
						source={require("../../assets/images/bg-header.png")}
						style={styles.headerBg}
					/>

					<View style={styles.header}>
						<View>
							<Text style={styles.title}>Badges</Text>
						</View>

						<Image
							source={require("../../assets/images/mascotte.png")}
							style={styles.mascot}
						/>
					</View>
				</View>

				<Text style={styles.sectionTitle}>Mijn badges</Text>

				<View style={styles.grid}>
					{badges.map((badge) => {
						const locked = !unlockedBadges.includes(badge.slug);

						return (
							<View
								key={badge.id}
								style={[styles.badgeCard, locked && styles.lockedBadgeCard]}
							>
								<View style={styles.statusCircle}>
									{!locked ? (
										<Text style={styles.statusText}>✓</Text>
									) : (
										<Image
											source={require("../../assets/images/lock.png")}
											style={styles.statusIcon}
										/>
									)}
								</View>

								<View style={styles.badgeIconCircle}>
									<Image source={badge.Image} style={styles.badgeIcon} />
								</View>

								<Text style={styles.badgeTitle}>{badge.title}</Text>
								<Text style={styles.badgeText}>{badge.description}</Text>
							</View>
						);
					})}
				</View>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },

	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 70,
		paddingBottom: 140,
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

	headerText: {
		flex: 1,
	},

	title: {
		color: "#12384C",
		fontSize: 36,
		fontWeight: "900",
	},

	subtitle: {
		color: "#12384C",
		fontSize: 18,
		lineHeight: 26,
	},

	mascot: {
		width: 170,
		height: 170,
		resizeMode: "contain",
	},

	statsCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 18,
		padding: 20,
		marginBottom: 28,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	statItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},

	statIcon: {
		fontSize: 38,
	},

	lockedIcon: {
		fontSize: 34,
		opacity: 0.35,
	},

	statNumber: {
		color: "#12384C",
		fontSize: 32,
		fontWeight: "900",
	},

	statLabel: {
		color: "#12384C",
		fontSize: 13,
	},

	divider: {
		width: 1,
		height: 55,
		backgroundColor: "#D9D9D9",
		marginHorizontal: 12,
	},

	sectionTitle: {
		color: "#12384C",
		fontSize: 26,
		fontWeight: "900",
		marginBottom: 16,
	},

	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},

	badgeCard: {
		width: "31%",
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		padding: 12,
		marginBottom: 18,
		alignItems: "center",
		minHeight: 180,
		position: "relative",
	},

	lockedBadgeCard: {
		opacity: 0.55,
	},

	statusCircle: {
		position: "absolute",
		top: 10,
		right: 10,
		width: 26,
		height: 26,
		borderRadius: 999,
		backgroundColor: "#F8CD00",
		justifyContent: "center",
		alignItems: "center",
	},

	statusText: {
		color: "#FFFFFF",
		fontWeight: "600",
		fontSize: 14,
	},

	badgeIconCircle: {
		width: 74,
		height: 74,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		marginBottom: 14,
	},

	badgeIcon: {
		width: 80,
		height: 80,
		resizeMode: "contain",
	},

	statusIcon: {
		width: 14,
		height: 16,
		resizeMode: "contain",
	},

	badgeTitle: {
		color: "#12384C",
		fontSize: 14,
		fontWeight: "900",
		textAlign: "center",
		marginBottom: 6,
	},

	badgeText: {
		color: "#12384C",
		fontSize: 12,
		textAlign: "center",
		lineHeight: 16,
	},
});
