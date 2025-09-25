import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Camera from "../components/camera";

export default function Screen(){
    return(
        <SafeAreaView style={styles.container} edges={[]}>
            <Camera />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})