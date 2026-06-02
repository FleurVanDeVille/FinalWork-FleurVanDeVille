import { useRef, useState } from "react";
import {
	Animated,
	Image,
	PanResponder,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const images = {
	"schaafwonde.png": require("../../assets/images/schaafwonde.png"),
	"snijwonde.png": require("../../assets/images/snijwonde.png"),
	"steekwonde.png": require("../../assets/images/steekwonde.png"),
};

function DraggableOption({ option, onDrop }) {
	const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,

			onPanResponderGrant: () => {
				position.setOffset({
					x: position.x.__getValue(),
					y: position.y.__getValue(),
				});
				position.setValue({ x: 0, y: 0 });
			},

			onPanResponderMove: Animated.event(
				[null, { dx: position.x, dy: position.y }],
				{ useNativeDriver: false },
			),

			onPanResponderRelease: (_, gesture) => {
				position.flattenOffset();
				onDrop(option, gesture.moveX, gesture.moveY, position);
			},
		}),
	).current;

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[
				styles.item,
				{
					transform: [{ translateX: position.x }, { translateY: position.y }],
				},
			]}
		>
			<Text style={styles.itemText}>{option.label}</Text>
		</Animated.View>
	);
}

export default function DragDropWoundExercise({
	exercise,
	setInteractiveCorrect,
}) {
	const [placements, setPlacements] = useState({});
	const [feedback, setFeedback] = useState(null);
	const zoneRefs = useRef({});

	function handleDrop(item, x, y, position) {
		let droppedZone = null;
		let checkedZones = 0;

		exercise.correctZones.forEach((zone) => {
			const ref = zoneRefs.current[zone.id];

			if (!ref) return;

			ref.measureInWindow((zoneX, zoneY, zoneWidth, zoneHeight) => {
				checkedZones++;

				const isInside =
					x >= zoneX &&
					x <= zoneX + zoneWidth &&
					y >= zoneY &&
					y <= zoneY + zoneHeight;

				if (isInside) {
					droppedZone = zone;
				}

				if (checkedZones === exercise.correctZones.length) {
					if (droppedZone) {
						setPlacements((prev) => ({
							...prev,
							[droppedZone.id]: item,
						}));

						setFeedback(null);
					} else {
						Animated.spring(position, {
							toValue: { x: 0, y: 0 },
							useNativeDriver: false,
						}).start();
					}
				}
			});
		});
	}

	function checkAnswer() {
		const allCorrect = exercise.correctZones.every((zone) => {
			const placedItem = placements[zone.id];
			return placedItem?.id === zone.correctItem;
		});

		if (allCorrect) {
			setFeedback({
				type: "correct",
				text: "Juist! Alles staat op de juiste plaats.",
			});

			setInteractiveCorrect?.(true);
		} else {
			setFeedback({
				type: "wrong",
				text: "Nog niet juist. Probeer opnieuw.",
			});

			setInteractiveCorrect?.(false);
		}
	}

	function resetExercise() {
		setPlacements({});
		setFeedback(null);
		setInteractiveCorrect?.(false);
	}

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.question}>{exercise.question}</Text>

			{feedback && (
				<View
					style={[
						styles.feedback,
						feedback.type === "correct"
							? styles.correctFeedback
							: styles.wrongFeedback,
					]}
				>
					<Text style={styles.feedbackText}>{feedback.text}</Text>
				</View>
			)}

			<View style={styles.zonesContainer}>
				{exercise.correctZones.map((zone) => (
					<View
						key={zone.id}
						ref={(ref) => {
							zoneRefs.current[zone.id] = ref;
						}}
						style={styles.zone}
					>
						<Image source={images[zone.image]} style={styles.zoneImage} />

						<Text style={styles.zoneTitle}>{zone.label}</Text>

						<View style={styles.dropArea}>
							<Text style={styles.dropText}>
								{placements[zone.id]?.label || "Sleep hier"}
							</Text>
						</View>
					</View>
				))}
			</View>

			<View style={styles.itemsContainer}>
				{exercise.draggableItems.map((item) => (
					<DraggableOption
						key={item.id}
						option={item}
						onDrop={handleDrop}
					/>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},

	question: {
		fontSize: 22,
		fontWeight: "700",
		color: "#12384C",
		marginBottom: 20,
	},

	feedback: {
		padding: 14,
		borderRadius: 14,
		marginBottom: 20,
	},

	correctFeedback: {
		backgroundColor: "#DDF5E8",
	},

	wrongFeedback: {
		backgroundColor: "#FFE1E1",
	},

	feedbackText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#12384C",
	},

	zonesContainer: {
		gap: 16,
		marginBottom: 24,
	},

	zone: {
		backgroundColor: "#FFFFFF",
		borderRadius: 18,
		padding: 16,
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#DDE8EE",
	},

	zoneImage: {
		width: 130,
		height: 100,
		resizeMode: "contain",
		marginBottom: 8,
	},

	zoneTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#12384C",
		marginBottom: 10,
	},

	dropArea: {
		width: "100%",
		minHeight: 48,
		borderRadius: 12,
		backgroundColor: "#F1F7FA",
		borderWidth: 1,
		borderStyle: "dashed",
		borderColor: "#8FC3A3",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
	},

	dropText: {
		fontSize: 15,
		fontWeight: "600",
		color: "#12384C",
		textAlign: "center",
	},

	itemsContainer: {
		gap: 12,
		marginBottom: 60,
	},

	item: {
		backgroundColor: "#FFD166",
		padding: 14,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
	},

	itemText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#12384C",
		textAlign: "center",
	},

	checkButton: {
		backgroundColor: "#4A90E2",
		padding: 16,
		borderRadius: 16,
		alignItems: "center",
		marginBottom: 10,
	},

	checkButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "700",
	},

	resetButton: {
		backgroundColor: "#EAF2F6",
		padding: 14,
		borderRadius: 16,
		alignItems: "center",
	},

	resetButtonText: {
		color: "#12384C",
		fontSize: 16,
		fontWeight: "700",
	},
});