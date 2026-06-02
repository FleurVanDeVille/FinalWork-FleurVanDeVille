import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

const badges = [
	{
		id: 1,
		title: "Eerste helper",
		text: "Voltooi je eerste les",
		earned: true,
		icon: require("../../assets/images/badge1.png"),
	},
	{
		id: 2,
		title: "Reanimatieheld",
		text: "Voltooi de reanimatie les",
		earned: true,
		icon: require("../../assets/images/badge1.png"),
	},
	{
		id: 3,
		title: "Quizmaster",
		text: "Behaal 100% op een quiz",
		earned: true,
		icon: require("../../assets/images/badge1.png"),
	},
	{
		id: 4,
		title: "Leergierige held",
		text: "Voltooi 5 lessen",
		earned: false,
		icon: require("../../assets/images/badge1.png"),
	},
	{
		id: 5,
		title: "Snelle hulp",
		text: "Voltooi een les in minder dan 10 minuten",
		earned: false,
		icon: require("../../assets/images/badge1.png"),
	},
	{
		id: 6,
		title: "Doorzetter",
		text: "Voltooi alle lessen",
		earned: false,
		icon: require("../../assets/images/badge1.png"),
	},
];

export default function Badges() {
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
					{badges.map((badge) => (
						<View
							key={badge.id}
							style={[
								styles.badgeCard,
								!badge.earned && styles.lockedBadgeCard,
							]}
						>
							<View style={styles.statusCircle}>
								{badge.earned ? (
									<Text style={styles.statusText}>✓</Text>
								) : (
									<Image
										source={require("../../assets/images/lock.png")}
										style={styles.statusIcon}
									/>
								)}
							</View>

							<View
								style={[
									styles.badgeIconCircle,
									!badge.earned && styles.lockedCircle,
								]}
							>
								<Image source={badge.icon} style={styles.badgeIcon} />
							</View>

							<Text style={styles.badgeTitle}>{badge.title}</Text>
							<Text style={styles.badgeText}>{badge.text}</Text>
						</View>
					))}
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
		backgroundColor: "#8FC3A3",
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
