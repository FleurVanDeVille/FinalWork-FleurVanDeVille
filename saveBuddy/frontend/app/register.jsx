import { router } from "expo-router";
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function Register() {
	return (
		<ImageBackground
			source={require("../assets/images/background.png")}
			style={styles.container}
			resizeMode="cover"
		>
			<Image
				source={require("../assets/images/mascotte-head.png")}
				style={styles.mascotTop}
				resizeMode="contain"
			/>

			<Image
				source={require("../assets/images/mascotte-head.png")}
				style={styles.mascotBottom}
				resizeMode="contain"
			/>

			<View style={styles.text}>
				<Text style={styles.title}>Registreer</Text>
				<Text style={styles.subtitle}>
					Vul hier je gegevens in om te registreren.
				</Text>

				<Text style={styles.label}>Voornaam</Text>
				<TextInput
					style={styles.input}
					placeholder="Type hier je voornaam."
					placeholderTextColor="#777"
					keyboardType="email-address"
				/>

				<Text style={styles.label}>Naam</Text>
				<TextInput
					style={styles.input}
					placeholder="Type hier je achternaam."
					placeholderTextColor="#777"
					secureTextEntry
				/>

				<Text style={styles.label}>E-mail</Text>
				<TextInput
					style={styles.input}
					placeholder="Type hier je e-mail."
					placeholderTextColor="#777"
					keyboardType="email-address"
				/>

				<Text style={styles.label}>Wachtwoord</Text>
				<TextInput
					style={styles.input}
					placeholder="Type hier je wachtwoord."
					placeholderTextColor="#777"
					secureTextEntry
				/>

				<TouchableOpacity onPress={() => router.push("/login")}>
					<Text style={styles.registerLink}>Of login hier.</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => router.replace("/(tabs)")}>
				<Text style={styles.buttonText}>Registreer</Text>
			</TouchableOpacity>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 180,
		paddingBottom: 34,
		paddingHorizontal: 38,
	},

	mascotTop: {
		position: "absolute",
		top: 95,
		left: -70,
		width: 180,
		height: 180,
		transform: [{ rotate: "15deg" }],
	},

	mascotBottom: {
		position: "absolute",
		bottom: 75,
		right: -70,
		width: 180,
		height: 180,
		transform: [{ rotate: "-15deg" }],
	},

	text: {
		marginTop: 20,
	},

	title: {
		color: "#12384C",
		fontSize: 30,
		fontWeight: "bold",
		paddingBottom: 10,
		textAlign: "center",
	},

	subtitle: {
		color: "#12384C",
		fontSize: 16,
		textAlign: "center",
		marginBottom: 35,
	},

	label: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "700",
		marginBottom: 8,
	},

	input: {
		backgroundColor: "#FFFFFF",
		height: 44,
		borderRadius: 6,
		paddingHorizontal: 14,
		marginBottom: 24,
	},

	registerLink: {
		color: "#12384C",
		fontSize: 14,
		textAlign: "center",
		textDecorationLine: "underline",
		marginTop: 12,
	},

	button: {
		width: "100%",
		backgroundColor: "#12384C",
		paddingVertical: 15,
		borderRadius: 12,
		alignItems: "center",
	},

	buttonText: {
		color: "#F2F2F2",
		fontSize: 18,
		fontWeight: "700",
	},
});
