import { StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";

type Props = {
    user: User
}

export default function Profile({user}: Props){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}></View>
                <Text style={styles.title}>{user.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    avatar: {
        width: 80,
        height: 80,
        backgroundColor: '#dedede',
        borderRadius: 99
    },
    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})