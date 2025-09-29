import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useQueryGetPostUserById } from "../tanStack/query/post/findManyUserPostsById";
import { User } from "../types/user";
import { urlImage } from "../utils/image";

type Props = {
    user: User
}

export default function PostsFeed({user}: Props){

    const [token, setToken] = useState('')

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
    
    const queryUserGetPosts = useQueryGetPostUserById(token, user.id)

    const posts = queryUserGetPosts.data

    return (
        <View>
            {posts != undefined &&
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Pressable style={{marginBottom: 20}} onPress={() => router.push({
                            pathname: '/(tabs)/(telas)/profile/[postId]',
                            params: { postId: item.id }
                        })}>
                            <Image
                                source={{ uri: `${urlImage}/${item.path}` }}
                                style={styles.image}
                            />
                        </Pressable>
                    )}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 'auto',
        height: 400
    }
})