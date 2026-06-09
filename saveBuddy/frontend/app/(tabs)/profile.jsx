import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import API_URL from "../../api";
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function Profile() {
	const [pushEnabled, setPushEnabled] = useState(true);
	const [emailEnabled, setEmailEnabled] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const handleLogout = async () => {
		await AsyncStorage.removeItem("token");
		await AsyncStorage.removeItem("user");

		router.replace("/login");
	};

	useEffect(() => {
		const loadUser = async () => {
			const userString = await AsyncStorage.getItem("user");

			if (userString) {
				const user = JSON.parse(userString);

				setFirstName(user.firstName);
				setLastName(user.lastName);
				setEmail(user.email);
			}
		};

		loadUser();
	}, []);

	const handleSaveProfile = async () => {
		try {
			const token = await AsyncStorage.getItem("token");

			const response = await fetch(`${API_URL}/user/profile`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				await AsyncStorage.setItem("user", JSON.stringify(data.user));
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
			alert("Er is iets misgelopen.");
		}
	};

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
							<Text style={styles.title}>Profiel</Text>
							<Text style={styles.name}>
								{firstName} {lastName}
							</Text>

							<TouchableOpacity
								style={styles.saveButton}
								onPress={handleSaveProfile}
							>
								<Text style={styles.saveButtonText}>Wijzigingen opslaan</Text>
							</TouchableOpacity>
						</View>

						<Image
							source={require("../../assets/images/mascotte.png")}
							style={styles.mascot}
						/>
					</View>
				</View>

				<View style={styles.information}>
					<Text style={styles.informationTitle}>Account</Text>

					<Text style={styles.label}>Voornaam</Text>
					<TextInput
						style={styles.input}
						value={firstName}
						onChangeText={setFirstName}
					/>

					<Text style={styles.label}>Achternaam</Text>
					<TextInput
						style={styles.input}
						value={lastName}
						onChangeText={setLastName}
					/>

					<Text style={styles.label}>E-mail</Text>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
					/>

					<Text style={styles.label}>Wachtwoord</Text>
					<TextInput
						style={styles.input}
						value="*************"
						editable={false}
						secureTextEntry
					/>
				</View>

				<View style={styles.information}>
					<Text style={styles.informationTitle}>Meldingen</Text>

					<View style={styles.settingRow}>
						<Text style={styles.label}>Pushmeldingen</Text>
						<Switch
							value={pushEnabled}
							onValueChange={setPushEnabled}
							trackColor={{ false: "#D9D9D9", true: "#8FC3A3" }}
							thumbColor="#FFFFFF"
						/>
					</View>

					<View style={styles.settingRow}>
						<Text style={styles.label}>E-mailmeldingen</Text>
						<Switch
							value={emailEnabled}
							onValueChange={setEmailEnabled}
							trackColor={{ false: "#D9D9D9", true: "#8FC3A3" }}
							thumbColor="#FFFFFF"
						/>
					</View>
				</View>

				<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
					<Text style={styles.logoutText}>Uitloggen</Text>
				</TouchableOpacity>
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

	title: {
		color: "#12384C",
		fontSize: 36,
		fontWeight: "900",
	},

	name: {
		color: "#12384C",
		fontSize: 20,
		marginTop: 4,
		marginBottom: 10,
	},

	saveButton: {
		backgroundColor: "#F8CD00",
		borderRadius: 999,
		paddingVertical: 7,
		paddingHorizontal: 22,
		alignSelf: "flex-start",
	},

	saveButtonText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "800",
	},

	mascot: {
		width: 170,
		height: 170,
		resizeMode: "contain",
	},

	information: {
		backgroundColor: "#FFFFFF",
		borderRadius: 14,
		padding: 16,
		marginBottom: 20,
	},

	informationTitle: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "900",
		marginBottom: 18,
	},

	label: {
		color: "#000000",
		fontSize: 14,
		marginBottom: 8,
	},

	input: {
		backgroundColor: "#E9E9E9",
		borderRadius: 6,
		height: 34,
		paddingHorizontal: 12,
		marginBottom: 14,
		color: "#333333",
	},

	settingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},

	logoutButton: {
		height: 45,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: "#9EC9F3",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 20,
		marginTop: 4,
	},

	logoutText: {
		color: "#9EC9F3",
		fontSize: 18,
		fontWeight: "900",
	},
});
