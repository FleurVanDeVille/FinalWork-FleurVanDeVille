import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function LessonCard({ lesson }) {
	const LessonImage = lesson.Image;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				if (!lesson.locked) {
					router.push(`/lesson/${lesson.slug}`);
				}
			}}
		>
			<View
				style={{
					height: 340,
					backgroundColor: "#12384C",
					borderRadius: 36,
					padding: 28,
					marginBottom: 20,
					opacity: lesson.locked ? 0.5 : 1,
					justifyContent: "space-between",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.15,
					shadowRadius: 12,
					elevation: 6,
				}}
			>
				{/* TOP */}
				<View>
					{LessonImage && (
						<View
							style={{
								width: 62,
								height: 62,
								borderRadius: 999,
								backgroundColor: "white",
								justifyContent: "center",
								alignItems: "center",
								marginBottom: 40,
							}}
						>
							<LessonImage width={38} height={38} fill="#12384C" />
						</View>
					)}

					<Text
						style={{
							color: "white",
							fontSize: 22,
							fontWeight: "300",
							marginBottom: 20,
						}}
					>
						{lesson.duration}
					</Text>

					<Text
						style={{
							color: "white",
							fontSize: 32,
							fontWeight: "bold",
							lineHeight: 40,
						}}
					>
						{lesson.title}
					</Text>
				</View>

				{/* BOTTOM */}
				<View>
					<Text
						style={{
							color: "white",
							alignSelf: "flex-end",
							fontSize: 24,
							marginBottom: 10,
						}}
					>
						{lesson.progress}%
					</Text>

					<View
						style={{
							height: 14,
							backgroundColor: "#9EC9F3",
							borderRadius: 999,
							overflow: "hidden",
						}}
					>
						<View
							style={{
								width: `${lesson.progress}%`,
								height: "100%",
								backgroundColor: "white",
								borderRadius: 999,
							}}
						/>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}