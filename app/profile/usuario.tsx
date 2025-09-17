import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryProfile } from "../../tanStack/query/profile";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import Profile from "../../components/profile";

export default function Screen(){

    const [token, setToken] = useState<string | null>(null)

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

    const queryProfile = useQueryProfile(token as string)

    if(!token || queryProfile.isLoading){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <ActivityIndicator size="small"/> 
            </View>
        )
    }

    const user = queryProfile.data

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        router.replace('index')
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Perfil
                </Text>
                <Pressable 
                    onPress={logout}
                    style={styles.exit}>
                    <LogOut />
                </Pressable>
            </View>
            {user &&
                <Profile user={user}/>
            }
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exit: {
        width: 60,
        height: 60,
        borderRadius: 99,
        backgroundColor: '#dedede',
        justifyContent: 'center',
        alignItems: 'center'
    }
})