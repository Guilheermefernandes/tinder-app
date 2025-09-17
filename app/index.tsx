import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { Loader } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Screen(){


    useEffect(() => {
        const auth = async () => {
            const token = await AsyncStorage.getItem('token')
            if(token != null){
                router.replace('/home')
            }else{
                router.replace('/login')
            }
        }
        auth()
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color="F52780"/> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})