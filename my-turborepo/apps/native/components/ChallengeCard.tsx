

import { StyleSheet, View, Text, Image } from "react-native";
import Button from "./Button";

export interface ChallengeCardProps {
    user: {
        id: string;
        Name: string;
        Image: string;
        challenge: {
            Goal: string;
        };
    };
    
}

export default function ChallengeCard({ user }: ChallengeCardProps) {

    // const status = 


    return (
        <View style={styles.container}>
            <View style={styles.main}>
            <Image
                style={styles.image}
                source={{
                    uri: user.Image,
                }}

            />

<View style={styles.group}>
            <Text style={styles.header}>{user.Name}</Text>
            </View>
            {Object.entries(user.challenge).map(([key, value]) => (
             <View style={styles.group}>
            <Text style={styles.header}>{key}</Text>
            <Text style={styles.content}>{value}</Text>
            </View>
            ))}
            </View>

<View style={styles.actions}>
  <Button title="Done" onPress={() => alert("Challenge created!")} />
  <Button title="Verify" onPress={() => alert("Challenge created!")} />
  <Button title="Ping" onPress={() => alert("Challenge created!")} />
  </View>


        
        </View>
    );

};


const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        backgroundColor: '#f5f5f5', // White color
        shadowColor: '#000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 1,
            shadowRadius: 50,
        elevation: 5, // for Android

    },
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width: '100%',
        // justifyContent: "center",
    },
    header: {
        fontWeight: "bold",

        fontSize: 20,
    },
    content: {
        fontSize: 17,
    },
    actions: {
        flexDirection: "row",
        backgroundColor: "#000000", // White color
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 10,
        overflow: "hidden",
        width: "85%", // Use a percentage to make the card responsive
      },
    group: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 10,
        display: "flex",
        flexDirection: "column",
    },
    main: {
        paddingTop: 0,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: '100%',
        alignItems: 'center',
       
        },
});