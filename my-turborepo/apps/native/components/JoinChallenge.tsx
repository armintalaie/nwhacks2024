import { TextInput, StyleSheet, View } from "react-native";
import Form from "./Form";
import Input from "./Input";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";

interface NewChallengeProps {
  navigation: NavigationProp<any>;
  onClose: () => void;
}

export default function JoinChallenge({
  navigation,
  onClose,
}: NewChallengeProps) {
  const [inviteLink, setInviteLink] = useState("");

  const handleSubmit = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
    navigation.navigate("JoinScreen");
    onClose();
  };
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Form
          title="Join a challenge"
          inputs={[
            <Input
              title="Challenge Name"
              value={inviteLink}
              onChangeText={setInviteLink}
              placeholder="Enter invite link"
              validator={(value) => (value ? null : "This field is required")}
            />,
          ]}
          onSubmit={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    width: "100%",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  container: {
    // borderWidth: 1,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start", // or 'center' depending on the layout
    paddingTop: 0, // Add some top padding
    paddingHorizontal: 8,
    width: "100%", // Add horizontal padding
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
