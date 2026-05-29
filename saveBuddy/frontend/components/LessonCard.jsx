import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

export default function LessonCard({ lesson }) {
	const LessonImage = lesson.Image;

	const cardStyle = [
		styles.card,
		lesson.id === 1 ? styles.darkCard : styles.lightCard,
		lesson.locked && styles.lockedCard,
	];

	const textStyle = lesson.id === 1 ? styles.whiteText : styles.darkText;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.wrapper}
			onPress={() => {
				if (!lesson.locked) {
					router.push(`/lesson/${lesson.slug}`);
				}
			}}
		>
			<View style={cardStyle}>
				<View>
					<View style={styles.iconCircle}>
						{LessonImage && (
							<LessonImage width={22} height={22} fill="#12384C" />
						)}
					</View>
				</View>

				{lesson.locked && 
				<View>
					<Image source={require("../assets/images/lock.png")} style={styles.lockImage} />
					<Text style={styles.lock}>Gesloten</Text>
				</View>}

				<View>
					<Text style={[styles.duration, textStyle]}>{lesson.duration}</Text>

					<Text style={[styles.title, textStyle]} numberOfLines={2}>
						{lesson.locked ? "Gesloten les" : lesson.title}
					</Text>

					<Text style={[styles.progressText, textStyle]}>
						{lesson.progress}%
					</Text>

					<View style={styles.progressBackground}>
						<View
							style={[
								styles.progressFill,
								lesson.id === 1 ? styles.darkProgress : styles.lightProgress,
								{
									width: `${lesson.progress}%`,
								},
							]}
						/>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "48%",
		marginBottom: 22,
	},

	card: {
		height: 150,
		borderRadius: 14,
		padding: 10,
		justifyContent: "space-between",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.12,
		shadowRadius: 8,
		elevation: 5,
	},

	darkCard: {
		backgroundColor: "#12384C",
	},

	lightCard: {
		backgroundColor: "#A7CCF2",
	},

	lockedCard: {
		backgroundColor: "#1F2527",
		opacity: 0.9,
	},

	iconCircle: {
		width: 34,
		height: 34,
		borderRadius: 999,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
	},

	duration: {
		fontSize: 12,
		marginBottom: 4,
	},

	title: {
		fontSize: 17,
		fontWeight: "900",
		lineHeight: 21,
	},

	progressText: {
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

	darkProgress: {
		backgroundColor: "#9EC9F3",
	},

	lightProgress: {
		backgroundColor: "#12384C",
	},

	whiteText: {
		color: "#FFFFFF",
	},

	darkText: {
		color: "#12384C",
	},

	lock: {
		position: "absolute",
		alignSelf: "center",
		fontSize: 18,
		top: 32,
		color: "#FFFFFF",
	},
	
	lockImage: {
		position: "absolute",
		alignSelf: "center",
		width: 26,
		height: 26,
	},
});
