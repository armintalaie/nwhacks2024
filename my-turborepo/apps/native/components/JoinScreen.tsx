// Import statements
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Button from "./Button";
import {
  faBell,
  faCalendarCheck,
  faCheck,
  faPiggyBank,
  faSyncAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import Goal from "./Goal";

export default function ({ route, navigation }) {
  const [inputValue, setInputValue] = useState("");
  const [goalsData, setGoalsData] = useState([]); // Initial goals data

  const { challengeName, deadline, buyIn, goalId } = route.params || {};

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleAddGoal = () => {
    setGoalsData([...goalsData, { goalName: inputValue }]);
    setInputValue(""); // Clear the input field
    navigation.navigate("Challenge");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <FontAwesomeIcon icon={faTimes} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            /* refresh action */
          }}
        >
          <FontAwesomeIcon icon={faSyncAlt} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Invite Link */}
      <View style={styles.copyLink}></View>

      {/* Challenge Widget */}
      <View style={styles.challengeWidget}>
        <Text style={styles.goalTitle}>{challengeName}</Text>
        <View style={styles.challengeInfo}>
          <FontAwesomeIcon
            icon={faPiggyBank}
            style={styles.iconStyle}
            size={24}
          />
          <Text>${buyIn} buy-in</Text>
        </View>
        <View style={styles.challengeInfo}>
          <FontAwesomeIcon icon={faBell} style={styles.iconStyle} size={24} />
          <Text>Daily</Text>
        </View>
        <View style={styles.challengeInfo}>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            style={styles.iconStyle}
            size={24}
          />
          <Text>Until {deadline}</Text>
        </View>
      </View>

      {/* Display Goals */}
      {goalsData.map((goal, index) => (
        <Goal key={index} goalName={goal.goalName} />
      ))}

      {/* Goal Input Column */}
      <View style={styles.goalInputColumn}>
        <Input
          onChangeText={handleInputChange}
          value={inputValue}
          placeholder="Enter your goal"
          title="Create a goal"
        />
        <Button title={"Submit"} onPress={() => handleAddGoal()} />
      </View>
    </SafeAreaView>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  // Add your styles here
  container: {
    backgroundColor: "#6042f5",
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  challengeWidget: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  challengeInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  goalInputColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingBottom: 8,
    flexWrap: "wrap",
  },
  iconStyle: {
    marginRight: 8,
  },
  copyLink: {
    width: "100%",
  },
});
