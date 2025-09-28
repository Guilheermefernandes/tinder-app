import { StyleSheet, Text, View } from "react-native";
import { Hobbies } from "../types/hobies";

type Props = {
    hobbie: Hobbies
}

export default function Hobbie({hobbie}: Props){
    return (
        <View style={styles.container}>
            <Text>{hobbie.hobbie}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        paddingHorizontal: 5, 
        borderStyle: "dashed",
        backgroundColor: '#27F546',
        opacity: 0.5,
        borderRadius: 5,
    }
})