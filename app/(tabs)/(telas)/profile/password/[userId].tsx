import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordForm from "../../../../../components/passwordForm";
import { useLocalSearchParams } from "expo-router";

export default function Screen(){

    const { userId } = useLocalSearchParams()

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Alterar senha</Text>

            <PasswordForm userId={userId as string}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})