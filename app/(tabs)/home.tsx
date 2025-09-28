import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useQueryHome } from "../../tanStack/query/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/card";
import Indicartors from "../../components/homeIndicators";
import { useQueryFindManyNotInteractionAndNotMatched } from "../../tanStack/query/findManyNotInteractionAndNotMatched";
import { router } from "expo-router";

export default function Screen(){

    const [token, setToken] = useState<string | null>(null)

    const queryHome = useQueryHome()


    const auth = async () => {
        const token = await AsyncStorage.getItem('token')
        if(token != null){
            setToken(token)
        }else{
            router.replace('login')
        }
    }

    useEffect(() => {
        auth()
    }, [])

    const queryInteraction = useQueryFindManyNotInteractionAndNotMatched(token as string)

    const users = queryInteraction.data

    return (
        <SafeAreaView style={{padding: 10, flex: 1}}>
            <Header />
            <Indicartors />
            <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
                {users &&
                    users.map(u => (
                        <Card key={u.id} auth={token as string} user={u}/>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scroll: { 
        flex: 1,
        marginTop: 30,
    }
})