import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { Loader } from "lucide-react-native";

export default function Screen(){

    const  auth = useAuth()

    useEffect(() => {
        if(!auth?.loading){
            if(!auth?.auth || !auth.user){
                router.replace('/login')
            }
        }
    }, [auth?.loading])



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