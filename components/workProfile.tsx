import { StyleSheet, Text, View } from "react-native";

type Props = {
    label: string,
    data: number
}

export default function WorkProfile({ label, data}: Props){
    return(
        <View style={styles.container}>
            <Text>{data}</Text>
            <Text>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})