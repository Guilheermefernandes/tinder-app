import { Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { CircleX, ThumbsUp } from "lucide-react-native";
import { router } from "expo-router";

type Props = {
    user: User
}

export default function Card({ user }: Props){
    return(
        <Pressable style={styles.container} onPress={() => router.push({
            pathname: '(tabs)/(telas)/profiles/[id]',
            params: { id: encodeURIComponent(user.id) }
        })}>
            <View style={styles.image}>

            </View>
            <View style={styles.info}>
                <View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.describe}>{user.description}</Text>
                </View>
                <View style={styles.btnArea}>
                    <Pressable style={[styles.btn, styles.reject]}>
                        <CircleX />
                    </Pressable>
                    <Pressable style={[styles.btn, styles.approve]}>
                        <ThumbsUp />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#dedede',
        marginRight: 30,
        overflow: 'hidden'
    },
    image: {
        width: 'auto',
        height: 300,
        backgroundColor: "#ccc"
    },
    info: {
        padding: 15,
        flex: 1
    },
    name: {
        fontSize: 22,

    },
    describe: {
        color: '#666',
        marginTop: 15,
        fontSize: 12
    },
    btnArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'flex-end'
    },
    btn: {
        width: 60,
        height: 60,
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center'
    },
    approve: {
        backgroundColor: '#36FF65',
        opacity: 0.5
    },
    reject: {
        backgroundColor: '#FF3636',
        opacity: 0.5
    }
})