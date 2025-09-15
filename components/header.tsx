import { router } from "expo-router";
import { Bell, UserRound } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Header(){
    return(
        <View style={styles.container}>
            <Pressable style={styles.profile} onPress={() => router.push('/profile/usuario')}>
                <UserRound />  
            </Pressable>
            <TextInput 
                style={styles.input}
                placeholder="Digite o nome aqui"
            />
            <Pressable style={styles.notification} onPress={() => router.push('/notification/warn')}>
                <Bell color="#000"/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    profile: {
        height: 60,
        width: 60,
        borderRadius: 99,
        backgroundColor: '#E8E7E6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#E8E7E6',
        height: 60,
        borderRadius: 99,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1
    },
    notification: {
        height: 60,
        width: 60,
        backgroundColor: '#E8E7E6',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center'
    }
})