import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profiles from "../../../../components/profiles";
import { useQueryFindUserById } from "../../../../tanStack/query/findUserByIdQuery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useQueryGetPostUserById } from "../../../../tanStack/query/post/findManyUserPostsById";

export default function Screen(){

    const [token, setToken] = useState('')
    
    const { id } = useLocalSearchParams()

    const indentifier = id as string

    const auth = async () => {
        const tokenAsync = await AsyncStorage.getItem('token')
        if(tokenAsync != null){
            setToken(tokenAsync)
        }else{
            router.replace('login')
        }
    }

    useEffect(() => {
        auth()
    }, [])

    const queryUser = useQueryFindUserById(indentifier, token)

    if(!token || queryUser.isLoading){
        return(
            <SafeAreaView style={{ flex: 1, width: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }

    const user = queryUser.data

    return(
        <SafeAreaView style={styles.container}>
            {user &&
                <Profiles user={user}/>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    }
})