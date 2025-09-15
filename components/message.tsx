import { StyleSheet, Text, View } from "react-native";

export default function Message(){
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>

            </View>
            <View>
                <Text style={styles.name}>
                    Maria Fernandes
                </Text>
                <Text style={styles.previus}>
                    Oii
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        borderRadius: 15,
        width: 'auto',
        backgroundColor: '#DEDEDE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        gap: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 99,
        backgroundColor: '#A6A6A6',
    },
    name: {
        fontWeight: 600
    },
    previus: {
        color: '#666666'
    }
})