import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ChallengeCard from "./ChallengeCard";
import Tab from "./Tab";
import { PanResponder } from "react-native";
import { Challenge, DayLog, User } from "../util/types";
import { MOCK } from "../util/mock";

export default function ChallengeTab() {
  const [users, setUsers] = useState<any[] | null>(null);
  const [userIndex, setUserIndex] = useState(0);
  const [nextUserIndex, setNextUserIndex] = useState(1);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  async function getUsers() {
    const getppl = makeUserChallenge(MOCK.users)
     setUsers(getppl)
  }

  function getChallenge() {
    return setChallenge(MOCK.challenge);
  }

  function getDayLogs() {
    setDayLogs(MOCK.days);
  }

  async function setup() {
    await getDayLogs();
    await getChallenge();

  }

  useEffect(() => {
    setup();
  }
  , []);

  useEffect(() => {
     getUsers();

  }, [dayLogs]);


  function makeUserChallenge(cusers) {
    const todayLog = dayLogs[dayLogs.length - 1];
    const augmentedUsers = cusers.map((user) => {
      return {
        ...user,
        ...todayLog.users[user.id],
        goal: "Run 5km",
      };
    });

    return augmentedUsers;
  }


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

  

  if (!challenge || !users || !dayLogs) {
    return null;
  }

  function calculateProgress() {
    if (dayLogs.length === 0) {
      return 0;
    }

    if (!challenge) {
      return 0;
    }
    const startDate = dayLogs[0].day;
    const today = dayLogs[dayLogs.length - 1].day;
    const totalDays = Math.floor(
      (challenge.deadline.getTime() - startDate.getTime() ) / (1000 * 3600 * 24) + 1
    );
    const done = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1
    );
    return ((done / totalDays) * 100).toFixed(2);
    }

  return (
    <Tab title={challenge.name} styles={styles}>
  
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
            {/* <ChallengeCard user={users[nextUserIndex]} /> */}
          </Animated.View>
        </Animated.View>
        <View style={styles.actions}>
<View style={[styles.circular, { width: `${calculateProgress()}%` as any }]}></View></View>
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
