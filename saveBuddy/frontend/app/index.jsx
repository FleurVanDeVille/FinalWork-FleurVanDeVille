import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";

export default function StartScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={require("../assets/images/logo-saveBuddy.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/login")}
			>
				<Text style={styles.buttonText}>Start</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#12384C",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 180,
		paddingBottom: 34,
		paddingHorizontal: 38,
	},

	logoContainer: {
		alignItems: "center",
	},

	logo: {
		width: 360,
		height: 280,
		marginTop: 90,
	},

	button: {
		width: "100%",
		backgroundColor: "#F5F5F5",
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: "center",
	},

	buttonText: {
		color: "#12384C",
		fontSize: 18,
		fontWeight: "700",
	},
});
