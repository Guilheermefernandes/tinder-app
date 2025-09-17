import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useQueryHome } from "../../tanStack/query/home";
import { Post } from "../../types/posts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Screen(){

    const auth = useContext(AuthContext)
    const [token, setToken] = useState<string>('')

    const queryHome = useQueryHome()


    const posts: Post[] = queryHome.data

    const test = async () => {
        const token = await AsyncStorage.getItem('token')
        if(token != null){
            setToken(token)
        }
    }

    useEffect(() => {
        test()
    }, [])

    return (
        <SafeAreaView style={{padding: 10}}>
            <Header />
            <ScrollView>
                <View>
                    {posts &&
                        posts.map(p => (
                            <Text key={p.id}>{p.title}</Text>
                        ))
                    }
                </View>
                <View>
                    {auth?.user === null &&
                        <Text>Não a nada aqui</Text>
                    }
                    {token.length > 0 &&
                        <Text>{token}</Text>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}