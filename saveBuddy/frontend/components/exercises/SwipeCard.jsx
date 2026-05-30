import { useRef } from "react";
import {
    Animated,
    Image,
    PanResponder,
    StyleSheet,
    Text,
    View,
} from "react-native";

const images = {
	"img-placeholder.png": require("../../assets/images/img-placeholder.png"),
};

export default function SwipeCard({ scenario, onSwipe = () => {} }) {
	const position = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,

			onPanResponderMove: Animated.event(
				[null, { dx: position.x, dy: position.y }],
				{ useNativeDriver: false },
			),

			onPanResponderRelease: (_, gesture) => {
				if (gesture.dx > 120) {
					Animated.timing(position, {
						toValue: { x: 500, y: 0 },
						duration: 200,
						useNativeDriver: false,
					}).start(() => {
						onSwipe("right");
						position.setValue({ x: 0, y: 0 });
					});
				} else if (gesture.dx < -120) {
					Animated.timing(position, {
						toValue: { x: -500, y: 0 },
						duration: 200,
						useNativeDriver: false,
					}).start(() => {
						onSwipe("left");
						position.setValue({ x: 0, y: 0 });
					});
				} else {
					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						useNativeDriver: false,
					}).start();
				}
			},
		}),
	).current;

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={[styles.card, position.getLayout()]}
		>
			<Image source={images[scenario.image]} style={styles.image} />

			<View style={styles.content}>
				<Text style={styles.situation}>{scenario.situation}</Text>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 24,
		overflow: "hidden",
		marginHorizontal: 20,
	},

	image: {
		width: "100%",
		height: 260,
	},

	content: {
		padding: 20,
	},

	situation: {
		color: "#12384C",
		fontSize: 18,
		fontWeight: "700",
		lineHeight: 26,
		textAlign: "center",
	},
});
