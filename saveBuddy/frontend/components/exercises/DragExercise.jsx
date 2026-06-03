import { useRef, useState } from "react";
import {
	Animated,
	Image,
	PanResponder,
	StyleSheet,
	Text,
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

export default function DragExercise({ exercise, setInteractiveCorrect }) {
	const [placements, setPlacements] = useState({});
	const [feedback, setFeedback] = useState(null);
	const [usedItems, setUsedItems] = useState([]);
	const dropAreaRefs = useRef({});

	function handleDrop(item, x, y, position) {
		let droppedZone = null;
		let checkedZones = 0;

		exercise.correctZones.forEach((zone) => {
			const ref = dropAreaRefs.current[zone.id];

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

				if (droppedZone) {
					setPlacements((prev) => {
						const updatedPlacements = {
							...prev,
							[droppedZone.id]: item,
						};

						const allCorrect = exercise.correctZones.every((zone) => {
							const placedItem = updatedPlacements[zone.id];
							return placedItem?.id === zone.correctItem;
						});

						setTimeout(() => {
							setInteractiveCorrect?.(allCorrect);
						}, 0);

						return updatedPlacements;
					});

					setUsedItems((prev) => [...prev, item.id]);

					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						useNativeDriver: false,
					}).start();
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
		setUsedItems([]);
		setFeedback(null);
		setInteractiveCorrect?.(false);
	}

	return (
		<View style={styles.container}>
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

			<View style={styles.exerciseRow}>
				<View style={styles.zonesColumn}>
					{exercise.correctZones.map((zone) => (
						<View
							key={zone.id}
							ref={(ref) => {
								dropAreaRefs.current[zone.id] = ref;
							}}
							style={styles.zone}
						>
							<Text style={styles.zoneTitle}>{zone.label}</Text>

							{zone.image && images[zone.image] && (
								<Image source={images[zone.image]} style={styles.zoneImage} />
							)}

							<View
								ref={(ref) => {
									dropAreaRefs.current[zone.id] = ref;
								}}
								style={styles.dropArea}
							>
								<Text style={styles.dropText}>
									{placements[zone.id]?.label || "Laat hier los"}
								</Text>
							</View>
						</View>
					))}
				</View>

				<View style={styles.itemsColumn}>
					{exercise.draggableItems
						.filter((item) => !usedItems.includes(item.id))
						.map((item) => (
							<DraggableOption
								key={item.id}
								option={item}
								onDrop={handleDrop}
							/>
						))}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},

	question: {
		fontSize: 20,
		fontWeight: "800",
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
		fontSize: 15,
		fontWeight: "700",
		color: "#12384C",
	},

	exerciseRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 30,
		marginBottom: 22,
	},

	zonesColumn: {
		width: 125,
		gap: 20,
	},

	itemsColumn: {
		flex: 1,
		gap: 95,
		paddingTop: 42,
	},

	zone: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#D7D7D7",
	},

	zoneTitle: {
		backgroundColor: "#12384C",
		color: "#FFFFFF",
		fontSize: 14,
		fontWeight: "700",
		textAlign: "center",
		paddingVertical: 8,
	},

	zoneImage: {
		width: "100%",
		height: 90,
		resizeMode: "cover",
	},

	dropArea: {
		margin: 6,
		minHeight: 56,
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: "dashed",
		borderColor: "#777",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 6,
		backgroundColor: "#FFFFFF",
	},

	dropText: {
		fontSize: 11,
		color: "#12384C",
		textAlign: "center",
	},

	item: {
		backgroundColor: "#A8CDF2",
		minHeight: 100,
		width: 200,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 14,
		borderWidth: 1,
		borderColor: "#7DB3EA",
	},

	itemText: {
		fontSize: 13,
		fontWeight: "500",
		color: "#12384C",
		textAlign: "center",
	},
});
