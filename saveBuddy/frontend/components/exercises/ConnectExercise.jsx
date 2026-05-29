import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ConnectExercise({
    exercise,
    connectAnswers,
    connectOptions,
}) {
    return (
        <View>
            <Text style={styles.question}>{exercise.question}</Text>

            {exercise.answers.map((answer, index) => (
                <TouchableOpacity
                    key={answer}
                    onPress={() => setConnectAnswers({...connectAnswers, [answer]: !connectAnswers[answer]})}
                    style={[
                        styles.answer,
                        connectAnswers[answer] && styles.selectedAnswer,
                    ]}
                >
                    <Text
                        style={[
                            styles.answerText,
                            connectAnswers[answer] && styles.selectedAnswerText,
                        ]}
                    >
                        {String.fromCharCode(65 + index)}. {answer}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    question: {
        color: "#12384C",
        fontSize: 20,
        fontWeight: "900",
        lineHeight: 26,
        marginBottom: 24,
    },

    answer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#D5D5D5",
    },

    selectedAnswer: {
        backgroundColor: "#12384C",
        borderColor: "#12384C",
    },

    answerText: {
        color: "#12384C",
        fontSize: 16,
        fontWeight: "700",
    },

  selectedAnswerText: {
    color: "#FFFFFF",
  }
});
