import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View, TouchableOpacity } from "react-native";
import ChallengeCard from "./ChallengeCard";
import Tab from "./Tab";
import { PanResponder } from "react-native";

const users = [
  {
    id: "1",
    Name: "Jacob",
    Image:
      "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    challenge: {
      Goal: "Go to the gym",
    },
  },
  {
    id: "2",
    Name: "Emily",
    Image:
      "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    challenge: {
      Goal: "Read a book",
    },
  },
  {
    id: "3",
    Name: "Josh",
    Image:
      "https://images.unsplash.com/photo-1535351221729-a95caae13678?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    challenge: {
      Goal: "Go to the gym",
    },
  },
  
];

export default function Challenge() {
  const [userIndex, setUserIndex] = useState(0);
  const [nextUserIndex, setNextUserIndex] = useState(1);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setUserIndex(nextUserIndex);
      setNextUserIndex((nextUserIndex + 1) % users.length);
      flipAnim.setValue(0);
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50 || gestureState.dx < -50) {
        flipCard();
      }
    },
  });

  return (
    <Tab title="Current Challenge" styles={styles}>
      <View style={styles.main}>
        <Animated.View {...panResponder.panHandlers} style={{ width: "100%" }}>
          <Animated.View
            style={[
              styles.flipCard,
              styles.card,

              {
                transform: [
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            <ChallengeCard user={users[userIndex]} />
          </Animated.View>
          <Animated.View
            style={[
              styles.flipCard,
              styles.flipCardBack,
              styles.card,
              {
                transform: [
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["180deg", "360deg"],
                    }),
                  },
                ],
                opacity: flipAnim.interpolate({
                  inputRange: [0, 0.5, 0.5],
                  outputRange: [0, 0, 1],
                }),
              },
            ]}
          >
            <ChallengeCard user={users[nextUserIndex]} />
          </Animated.View>
        </Animated.View>
        <View style={styles.actions}>
          <View style={styles.circular}></View>
        </View>
      </View>
    </Tab>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
  },

  circular: {
    borderRadius: 50,
    minWidth: 50,
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "black",
  },
  actions: {
    flexDirection: "row",
    // backgroundColor: "#000000", // White color

    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    overflow: "hidden",
    width: "85%", // Use a percentage to make the card responsive
    borderRadius: 30,
    borderWidth: 2, // Add border width
    borderColor: "#171717", // Add border color
    backgroundColor: "#f0f0f0", // White color
    padding: 2,
  },
  flipCard: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  flipCardBack: {
    position: "absolute",
    backfaceVisibility: "hidden",
    top: 0,
  },

  card: {
    overflow: "hidden",
    width: "85%", // Use a percentage to make the card responsive
    height: 600, // Increase the height
    maxHeight: "80%", // But don't exceed maximum height of 90%
    backgroundColor: "#f0f0f0", // White color
    marginBottom: 20,
    alignSelf: "center", // Center the card
    elevation: 5, // Add elevation for Android
    shadowColor: "#fff", // Add shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5.84,
    borderRadius: 30,
    borderWidth: 2, // Add border width
    borderColor: "#171717", // Add border color
  },

  main: {
    paddingTop: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#6042f5",
  },
});
