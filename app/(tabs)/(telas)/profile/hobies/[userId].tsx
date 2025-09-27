import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen(){
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Hobies do usuario</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }
})