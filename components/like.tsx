import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { urlImage } from "../app/utils/image";

type Props = {
    user: User
}

export default function Like({ user }: Props){
    return (
        <View style={styles.container}>
            <View style={styles.imageArea}>
                <Image source={{ uri: `${urlImage}/${user.avatar}` }} resizeMode="cover" style={styles.image}/>
            </View>
            <View>
                <Text>
                    {user.name}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        height: 80,
        backgroundColor: '#dedede',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        padding: 10
    },
    imageArea: {
        width: 60,
        height: 60,
        borderRadius: 99,
        backgroundColor: '#ccc',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 99,
    }
})