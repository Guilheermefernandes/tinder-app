import { StyleSheet, Text, View } from "react-native";

type Props = {
    label: string,
    data: number,
    color?: string
}

export default function WorkProfile({ label, data, color}: Props){
    return(
        <View style={styles.container}>
            <Text style={{ color: color ? color : '#000' }}>{data}</Text>
            <Text style={{ color: color ? color : '#000' }}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})