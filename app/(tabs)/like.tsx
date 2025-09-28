import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryFindQueue } from "../../tanStack/query/interactions/findQueue";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Screen(){

    const [token, setToken] = useState<string | null>(null)



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

    const queryQueue = useQueryFindQueue(token as string)

    const data = queryQueue.data

    console.log(data)

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Curtidas recebidas</Text>
            {data != undefined && 
                data.map(i => (
                    <Text key={i.id}>{i.from_user_id}</Text>
                ))
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }
})