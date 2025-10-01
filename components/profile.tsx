import { Button, FlatList, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { Camera, CameraIcon, GalleryVertical, Grid3x3, UserRound } from "lucide-react-native";
import WorkProfile from "./workProfile";
import * as ImagePicker from 'expo-image-picker';
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryGetPostUserById } from "../tanStack/query/post/findManyUserPostsById";
import { urlServeBase } from "../utils/urlBaseBackend";
import Posts from "./posts";
import { router } from "expo-router";
import { Hobbies } from "../types/hobies";
import Hobbie from "./hobbie";
import FeedProfile from "./feedProfile";
import PostsFeed from "./postsFeed";
import HeaderProfile from "./headerProfile";
import IntemPost from "./itemPost";

export enum Layout {
    GRID = 'GRID',
    QUEUE = 'QUEUE'
}

type Props = {
    hobbies: Hobbies[] | undefined
    user: User,
    token: string
}

export default function Profile({hobbies, user, token}: Props){

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [avatar, setAvatar] = useState<string>('')
    const [content, setContent] = useState<ReactNode>(<Posts user={user}/>)
    const [layoutPost, setLayoutPost] = useState<Layout>(Layout.GRID)
    const [colums, setColums] = useState(3)

    if(status?.status !== 'granted'){
        <View>
            <Button title="Permitir acesso" onPress={requestPermission}/>
        </View>
    }

    const pickerImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
            exif: true
        })

        if(result.assets){
            uploadImage(result.assets[0])
        }
        
    }

    const uploadImage = async (assets: ImagePicker.ImagePickerAsset) => {

        const data = new FormData()

        data.append('file', {
            name: assets.fileName,
            type: assets.mimeType,
            uri: Platform.OS === 'ios' ? assets.uri.replace('file://', '') : assets.uri
        } as any)

        const token = await AsyncStorage.getItem('token')

        
        const request = await axios.post(`${urlServeBase}/user/avatar`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })

        if(request.data){
            setAvatar(assets.uri)
        }
        
    }

    useEffect(() => {
        if(layoutPost === Layout.QUEUE){
            setColums(1)
        }else{
            setColums(3)
        }
    }, [layoutPost])

    const queryUserGetPosts = useQueryGetPostUserById(token, user.id)

    const posts = queryUserGetPosts.data

    return(
        <View style={styles.container}>
            <FlatList
                key={colums}
                ListHeaderComponent={
                    <HeaderProfile hobbies={hobbies} user={user} onChange={t => setLayoutPost(t)}/>
                }
                data={posts}
                numColumns={colums}
                renderItem={({item}) => (
                    <IntemPost post={item} layoutPost={layoutPost} user={user}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 10
    },
    avatar: {
        width: 80,
        height: 80,
        backgroundColor: '#dedede',
        borderRadius: 99,
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    headerData: {
        flexDirection: 'column'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 14,
        color: '#666666'
    },
    profileWork: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnEdit: {
        marginTop: 20,
        width: 'auto',
        padding: 10, 
        backgroundColor: '#dedede',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textBtn: {
        textAlign: 'center'
    },
    postsArea: {
        marginTop: 0
    },
    areaNavigate: {
        flexDirection: 'row',
        paddingVertical: 15
    }
})