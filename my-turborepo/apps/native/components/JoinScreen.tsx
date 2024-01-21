import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Button from "./Button"

export default function() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.friendWidget}>

            </View>
            <View style={styles.friendWidget}>

            </View>
            <View style={styles.button}><Button  title={"Submit "} onPress={() => {}}/></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6042f5',
        height: '100%',
    },
    friendWidget: {
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 20,
       // width: '100%',
        height: '40%',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    button: {
        marginHorizontal: 8,
        paddingHorizontal: 8,
        paddingTop: 10,
    }
})