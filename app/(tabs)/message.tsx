import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Message from "../../components/message";

export default function Screen(){
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Menssagens
            </Text>
            <ScrollView style={styles.scroll}>
                <Message />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        height: 80,
    },
    scroll: {
        flex: 1,
        width: 'auto',
    }
})