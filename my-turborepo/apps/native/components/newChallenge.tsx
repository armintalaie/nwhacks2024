import React, { useState } from "react";
import { View, Text, TextInput, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import Button from "./Button";
import Input from "./Input";
import Form from "./Form";
import { NavigationProp } from "@react-navigation/native";

interface NewChallengeProps {
  navigation: NavigationProp<any>;
  onClose: () => void;
}

export default function NewChallenge({
  navigation,
  onClose,
}: NewChallengeProps) {
  const [challengeName, setChallengeName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [buyIn, setBuyIn] = useState("");

  const handleSubmit = async () => {
    console.log("Challenge Name: ", challengeName);
    console.log("Deadline: ", deadline);
    console.log("Buy-in: ", buyIn);
    const createChallenge = true;
    alert("Challenge created!");
    onClose();
    navigation.navigate("JoinScreen", {
      challengeName,
      deadline,
      buyIn,
      createChallenge,
    });
    /*
        try {
            console.log("Submitted");
            navigation.navigate('Challenge');
            const response = await fetch('backendUrl/goals', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                challengeName,
                deadline,
                buyIn,
              }),
            });
            
            if (response.ok) {
              const jsonResponse = await response.json();
              const goalId = jsonResponse.goalId;
              navigation.navigate("JoinScreen", {
                challengeName,
                deadline,
                buyIn,
                createChallenge,
              });
            } else {
              // TODO: Handle HTTP Errors 
              console.error('Server error:', response.status);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
          */
  };

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Form
          title="New Challenge"
          inputs={[
            <Input
              title="Challenge Name"
              value={challengeName}
              onChangeText={setChallengeName}
              placeholder="Enter challenge name"
              validator={(value) => (value ? null : "This field is required")}
            />,
            <Input
              title="Deadline"
              value={deadline}
              onChangeText={setDeadline}
              placeholder="Enter deadline"
              type="date"
              validator={(value) => (value ? null : "This field is required")}
            />,
            <Input
              title="Buy-in Amount"
              value={buyIn}
              onChangeText={setBuyIn}
              placeholder="Enter buy-in amount"
              type="numeric"
              validator={(value) => (value ? null : "This field is required")}
            />,
          ]}
          onSubmit={handleSubmit}
        />
        <StatusBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    width: "100%",
  },
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
