import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useQueryProfile } from "../../../../tanStack/query/profile";
import { useQueryGetHobbiesUser } from "../../../../tanStack/query/hobbies/getHobbiesUserQuery";
import { query } from "../../../../utils/query";
import Profile from "../../../../components/profile";

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
    const queryHobbies = useQueryGetHobbiesUser(token as string)

    if(!token || queryProfile.isLoading || queryHobbies.isLoading){
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <ActivityIndicator size="small"/> 
            </View>
        )
    }

    const user = queryProfile.data
    const hobbies = queryHobbies.data

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        query.removeQueries({
            queryKey: ['profile']
        })
        router.replace('login')
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {user?.slug}
                </Text>
                <Pressable 
                    onPress={logout}
                    style={styles.exit}>
                    <LogOut />
                </Pressable>
            </View>
            {user &&
                <Profile hobbies={hobbies} user={user} token={token}/>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#666'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 15
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