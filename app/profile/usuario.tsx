import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryProfile } from "../../tanStack/query/profile";
import { router } from "expo-router";

export default function Screen(){

    const [token, setToken] = useState<string>('')
    const queryProfile = useQueryProfile(token)

    const user = queryProfile.data

    useEffect(() => {
        const auth = async () => {
            const token = await AsyncStorage.getItem('token')
            if(token != null){
                setToken(token)
            }else{
                router.replace('/login')
            }
        }
        auth()
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Perfil
                </Text>
                <View>
                    
                </View>
            </View>
            <View>
                <Text>Nome: {user}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
        height: 80,
    },
})