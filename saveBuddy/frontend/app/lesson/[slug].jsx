import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import bloeding from "../../data/lessons/bleeding.json";
import verslikking from "../../data/lessons/choking.json";
import reanimeren from "../../data/lessons/cpr.json";
import huidwonde from "../../data/lessons/skin-wounds.json";
import brandwonde from "../../data/lessons/burns.json";
import letsels from "../../data/lessons/injuries.json";
import vierStappen from "../../data/lessons/four-steps-of-first-aid.json";
import vergiftiging from "../../data/lessons/poisoning.json";
import verdrinking from "../../data/lessons/drowning.json";

const lessonsMap = {
	vierStappen,
	bloeding,
	brandwonde,
	huidwonde,
	reanimeren,
	verslikking,
    letsels,
	vergiftiging,
	verdrinking,
};

export default function LessonPage() {
	const { slug } = useLocalSearchParams();

	const lesson = lessonsMap[slug];

	if (!lesson) {
		return <Text>Les niet gevonden</Text>;
	}

	return (
		<View style={{ flex: 1, padding: 20 }}>
			<Text
				style={{
					fontSize: 32,
					fontWeight: "bold",
				}}
			>
				{lesson.title}
			</Text>

			<Text
				style={{
					marginTop: 10,
					fontSize: 18,
				}}
			>
				{lesson.description}
			</Text>

			{/* oefeningen */}
			{lesson.exercises.map((exercise) => (
				<View
					key={exercise.id}
					style={{
						marginTop: 30,
						backgroundColor: "white",
						padding: 20,
						borderRadius: 20,
					}}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: "600",
						}}
					>
						{exercise.question}
					</Text>
				</View>
			))}
		</View>
	);
}
