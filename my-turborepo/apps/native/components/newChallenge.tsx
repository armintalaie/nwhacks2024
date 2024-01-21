import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import Button from './Button';
import Input from './Input';
import Form from './Form';


export default function NewChallenge() {
    const [challengeName, setChallengeName] = useState('');
    const [deadline, setDeadline] = useState('');
    const [buyIn, setBuyIn] = useState('');

    const handleSubmit = () => {
        console.log("Challenge Name: ", challengeName);
        console.log("Deadline: ", deadline);
        console.log("Buy-in: ", buyIn);
        alert("Challenge created!");
    };

    return (
        <View style={styles.container}>
            <Form
                title="New Challenge"
                inputs={[
                    <Input
                        title="Challenge Name"
                        value={challengeName}
                        onChangeText={setChallengeName}
                        placeholder="Enter challenge name"
                        validator={(value) => value ? null : 'This field is required'}
                    />,
                    <Input
                        title="Deadline"
                        value={deadline}
                        onChangeText={setDeadline}
                        placeholder="Enter deadline"
                        type="date"
                        validator={(value) => value ? null : 'This field is required'}
                    />,
                    <Input
                        title="Buy-in Amount"
                        value={buyIn}
                        onChangeText={setBuyIn}
                        placeholder="Enter buy-in amount"
                        type="numeric"
                        validator={(value) => value ? null : 'This field is required'}
                    />,
                ]}
                onSubmit={() => {
                    console.log("Pressed!");
                    alert("Pressed!");
                }}
            />
            <StatusBar style="auto" />
        </View>
    );
}


    const styles = StyleSheet.create({
        container: {
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