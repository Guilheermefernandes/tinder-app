import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { Post } from "../types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import { urlServeBase } from "../app/utils/urlBaseBackend";
import { User } from "../types/user";
import { urlImage } from "../app/utils/image";

type Props = {
    user: User
}

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3;

export default function Posts({user}: Props){

    const [token, setToken] = useState('')
    const [posts, setPosts] = useState<Post[] | null>(null)

    const auth = async () => {
        const tokenAsync = await AsyncStorage.getItem('token')
        if(tokenAsync != null){
            setToken(tokenAsync)
        }else{
            router.replace('login')
        }
    }

    const getPosts = async () => {
        if(token.length > 0){
            const request = await axios.get(`${urlServeBase}/post/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            if(request.data){
                setPosts(request.data)
            }
        }
    }

    useEffect(() => {
        auth()
    }, [])
    
    useEffect(() => {
        getPosts()
    }, [token])

    return(
        <View>
            {posts &&
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <Pressable>
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