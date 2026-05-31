import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuizCard({ quiz }) {
	const QuizIcon = quiz.Icon;

	return (
		<TouchableOpacity
			activeOpacity={0.85}
			style={styles.wrapper}
			onPress={() => router.push(`/quiz/${quiz.slug}`)}
		>
			<View style={styles.card}>
				<View style={styles.iconCircle}>
					{QuizIcon && <QuizIcon width={22} height={22} fill="#12384C" />}
				</View>

				<Text style={styles.title} numberOfLines={2}>
					{quiz.title}
				</Text>

				{quiz.image && (
					<Image
						source={quiz.image}
						style={styles.mascot}
						resizeMode="contain"
					/>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: 180,
		marginRight: 18,
	},

	card: {
		height: 230,
		backgroundColor: "#F8CD00",
		borderRadius: 14,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 6,
		overflow: "hidden",
	},

	iconCircle: {
		width: 34,
		height: 34,
		borderRadius: 999,
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 25,
	},

	title: {
		color: "#FFFFFF",
		fontSize: 17,
		fontWeight: "900",
		lineHeight: 25,
	},

	mascot: {
		position: "absolute",
		right: 5,
		bottom: 5,
		width: 110,
		height: 110,
	},
});
