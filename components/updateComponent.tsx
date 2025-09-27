import { router } from "expo-router";
import { CornerDownRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
    userId: string
    path: string,
    label: string
}

export default function UpdateComponent({
    userId, path, label 
}: Props){
    return(
        <Pressable style={styles.btn} onPress={() => router.push({
            pathname: `(tabs)/(telas)/profile/${path}/[userId]`,
            params: {userId: userId}
        })}>
            <Text style={styles.textBtn}>
                {label}
            </Text>
            <CornerDownRight />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dedede',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    textBtn: {
        fontSize: 16,
        fontWeight: '500'
    }
})