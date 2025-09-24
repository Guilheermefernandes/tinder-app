import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhotoRender from "../../../../components/photoRender";

export default function Screen(){

    const { tag } = useLocalSearchParams()

    const photo = tag as string

    return(
        <SafeAreaView style={styles.container}>
            <PhotoRender photo={photo}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})