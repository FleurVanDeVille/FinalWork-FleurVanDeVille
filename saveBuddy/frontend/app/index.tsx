import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SaveBuddy</Text>

      <Text style={styles.subtitle}>
        Eerste hulp begint bij jou.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12384C",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 12,
  },

  buttonText: {
    color: "#12384C",
    fontSize: 18,
    fontWeight: "600",
  },
});