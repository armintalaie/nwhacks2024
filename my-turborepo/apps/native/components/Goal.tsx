import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Goal({ goalName }) {
  const goal = goalName;
  return (
    <View style={styles.goal}>
      {/*
            <View style={styles.circleFrame}>
        <Image source={require("../assets/logo.png")} style={styles.avatar} />
      </View>
      <View style={styles.divider} />
        */}

      <View style={styles.friendWidget}>
        <Text style={styles.header}>Goal:</Text>
        <Text style={styles.goalTitle}>{goal}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.circleCheckFrame}>
        <FontAwesomeIcon icon={faCheck} size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
  },
  circleFrame: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circleCheckFrame: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  divider: {
    height: "100%",
    backgroundColor: "black",
    width: 0.5,
  },
  header: {
    fontSize: 14,
    color: "grey",
    fontWeight: "400",
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 8,
    flexWrap: "wrap",
  },
  friendWidget: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    maxWidth: "70%",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
