import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryFindUniquePost } from "../../../../tanStack/query/post/findUniquePost";
import { urlImage } from "../../../../utils/image";
import { useMutationDeletePost } from "../../../../tanStack/mutation/post/deletePost";
import { query } from "../../../../utils/query";

export default function Screen(){

    const [token, setToken] = useState('')
    const { postId } = useLocalSearchParams()
    const mutationDeletePost = useMutationDeletePost()

    const auth = async () => {
        const tokenAsync = await AsyncStorage.getItem('token')
        if(tokenAsync != null){
            setToken(tokenAsync)
        }else{
            router.replace('/login')
        }
    }

    useEffect(() => {
        auth()
    }, [])

    const queryPost = useQueryFindUniquePost(token, postId as string)

    if(token.length === 0 || queryPost.isLoading){
        return (
           <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <ActivityIndicator size="small"/>
           </View>
        )
    }

    const data = queryPost.data

    const deletePost = () => {
        mutationDeletePost.mutate({ auth: token, param: postId as string }, {
            onSuccess: () => {
                query.invalidateQueries({
                    queryKey: ['posts']
                })
                router.back()
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalhes do Post</Text>
            <View style={styles.content}>
                {data != undefined && 
                    <Image 
                        source={{ uri: `${urlImage}/${data?.path}` }}
                        style={{ width: '100%', height: '60%', borderRadius: 10 }}
                    />
                }
                <View>
                    <Pressable style={styles.button} onPress={() => deletePost()}>
                        <Text style={styles.textBtn}>Deletar imagem</Text>
                    </Pressable>
                </View>
            </View>
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
        marginBottom: 30
    },
    content: {
        flex: 1,
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#000',
        height: 60,
        justifyContent: 'center',
        borderRadius: 10
    },
    textBtn: {
        color: '#fff',
        textAlign: 'center',
    }
})