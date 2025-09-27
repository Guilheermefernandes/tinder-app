import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { Post } from "../types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import { urlServeBase } from "../utils/urlBaseBackend";
import { User } from "../types/user";
import { urlImage } from "../utils/image";
import { useQueryGetPostUserById } from "../tanStack/query/post/findManyUserPostsById";

type Props = {
    user: User
}

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3;

export default function Posts({user}: Props){

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

    return(
        <View>
            {posts != undefined &&
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push({
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
            width: imageSize,
            height: imageSize,
            borderWidth: 0.5,
            borderColor: '#e0e0e0',
        },
})