import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { CircleX, ThumbsUp } from "lucide-react-native";
import { router } from "expo-router";
import { urlImage } from "../app/utils/image";
import { LinearGradient } from 'expo-linear-gradient';

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
                <Image source={{ uri: `${urlImage}/${user.avatar}` }} style={styles.imageContent} resizeMode="cover"/>
                <LinearGradient
                    colors={['transparent', '#000']}
                    locations={[0.6, 1]}
                    style={styles.absoluteFill}
                />
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
        height: '60%',
        backgroundColor: "#ccc"
    },
    imageContent: {
        width: '100%',
        height: '100%'  
    },
    absoluteFill:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    info: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flex: 1,
        backgroundColor: '#000'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 22,
        color: "#fff"
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
        alignItems: 'center'
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