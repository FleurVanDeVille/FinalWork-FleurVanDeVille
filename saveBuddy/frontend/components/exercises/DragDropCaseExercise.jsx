import { memo, useRef, useState } from "react";
import {
	Animated,
	Image,
	PanResponder,
	StyleSheet,
	Text,
	View,
} from "react-native";

const images = {
	"koffer.png": require("../../assets/images/ehbo-koffer.webp"),
	"pijnstillers.png": require("../../assets/images/pijnstillers.webp"),
	"pincet.png": require("../../assets/images/pincet.webp"),
	"schaar.png": require("../../assets/images/schaar.webp"),
	"pleisters.png": require("../../assets/images/pleisters.webp"),
	"water.png": require("../../assets/images/water.webp"),
	"wondgaas.png": require("../../assets/images/wondgaas.webp"),
	"watten.png": require("../../assets/images/watten.webp"),
	"thermometer.png": require("../../assets/images/thermometer.webp"),
};

const DraggableItem = memo(function DraggableItem({ item, onDrop }) {
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
				onDrop(item, gesture.moveX, gesture.moveY, position);
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
			<Image source={images[item.image]} style={styles.itemImage} />
			<Text style={styles.itemText}>{item.text}</Text>
		</Animated.View>
	);
});

export default function DragDropCaseExercise({
	exercise,
	correctItems,
	setCorrectItems,
}) {
	const caseRef = useRef(null);

	const [feedback, setFeedback] = useState(null);

	function handleDrop(item, x, y, position) {
		caseRef.current.measureInWindow((caseX, caseY, caseWidth, caseHeight) => {
			const droppedInCase =
				x >= caseX &&
				x <= caseX + caseWidth &&
				y >= caseY &&
				y <= caseY + caseHeight;

			if (!droppedInCase) {
				Animated.spring(position, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: false,
				}).start();
				return;
			}

			if (item.correct) {
				setCorrectItems((prev) => {
					if (prev.includes(item.id)) return prev;
					return [...prev, item.id];
				});

				setFeedback({
					type: "correct",
					text: item.feedback?.correct || "Juist!",
				});
			} else {
				setFeedback({
					type: "wrong",
					text: item.feedback?.wrong || "Fout.",
				});

				Animated.spring(position, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: false,
				}).start();
			}
		});
	}

	return (
		<View>
			<Text style={styles.question}>{exercise.question}</Text>

			{feedback && (
				<View
					style={[
						styles.feedbackBox,
						feedback.type === "correct" ? styles.correctBox : styles.wrongBox,
					]}
				>
					<Text style={styles.feedbackText}>{feedback.text}</Text>
				</View>
			)}

			<View ref={caseRef} style={styles.caseContainer}>
				<Text style={styles.caseText}>
					Sleep de juiste materialen in de koffer:
				</Text>

				<Image
					source={images[exercise.image]}
					style={styles.caseImage}
					resizeMode="contain"
				/>
			</View>

			<View style={styles.itemsContainer}>
				{exercise.items
					.filter((item) => !correctItems.includes(item.id))
					.map((item) => (
						<DraggableItem key={item.id} item={item} onDrop={handleDrop} />
					))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	question: {
		fontSize: 20,
		fontWeight: "900",
		color: "#12384C",
		marginBottom: 24,
	},

	caseContainer: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
	},

	caseText: {
		fontSize: 15,
		fontWeight: "800",
		color: "#12384C",
		marginBottom: 10,
	},

	caseImage: {
		width: 220,
		height: 180,
	},

	itemsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: 30,
	},

	item: {
		width: "23%",
		alignItems: "center",
		marginBottom: 20,
		zIndex: 10,
	},

	itemImage: {
		width: 55,
		height: 55,
	},

	itemText: {
		marginTop: 4,
		fontSize: 12,
		fontWeight: "700",
		color: "#12384C",
		textAlign: "center",
	},

	feedbackBox: {
		padding: 10,
		borderRadius: 12,
		alignSelf: "center",
		marginBottom: 15,
	},

	correctBox: {
		backgroundColor: "#8FC3A3",
	},

	wrongBox: {
		backgroundColor: "#F24B4B",
	},

	feedbackText: {
		color: "#FFFFFF",
		fontWeight: "900",
	},
});
