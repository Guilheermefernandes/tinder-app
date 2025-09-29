import { Button, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { Camera, CameraIcon, GalleryVertical, Grid3x3, UserRound } from "lucide-react-native";
import WorkProfile from "./workProfile";
import * as ImagePicker from 'expo-image-picker';
import { ReactNode, useState } from "react";
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
import { Layout } from "./profile";

type Props = {
    hobbies: Hobbies[] | undefined
    user: User
    onChange: (t: Layout) => void
}

const url = `${urlServeBase}/public/uploads`

export default function HeaderProfile({hobbies, user, onChange}: Props){

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [avatar, setAvatar] = useState<string>('')
    const [content, setContent] = useState<ReactNode>(<Posts user={user}/>)

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

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.avatar} onPress={pickerImage}>
                    {user.avatar != undefined &&
                        <Image source={{ uri: `${url}/${user.avatar}` }} style={{ width: 80, height: 80 }}/>
                    }
                    {user.avatar == undefined &&
                        <Camera />
                    }
                    {avatar.length > 0 && 
                        <Image source={{ uri: avatar }} style={{ width: 80, height: 80 }} />
                    }
                </Pressable>
                <View style={styles.headerData}>
                    <Text style={styles.title}>{user.name}</Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        {hobbies != undefined &&
                            hobbies.map(h => (
                                <Hobbie key={h.id} hobbie={h}/>
                            ))
                        }
                    </View>
                </View>
            </View>
            <View style={styles.profileWork}>
                <WorkProfile label="Photos" data={user.photos}/>            
                <WorkProfile label="matchs" data={user.matched}/>    
                <WorkProfile label="Interações" data={user.interactions}/>    
            </View>
            <Pressable style={styles.btnEdit} onPress={() => router.push({
                pathname: '/(tabs)/(telas)/profile/update/[userId]',
                params: {userId: user.id}
            })}>
                <Text style={styles.textBtn}>Editar dados</Text>
            </Pressable>
            <View style={styles.areaNavigate}>
                <Pressable style={{flex: 1, alignItems: 'center'}} 
                    onPress={() => onChange(Layout.GRID)}
                >
                    <Grid3x3 />
                </Pressable>
                <Pressable style={{flex: 1, alignItems: 'center'}}
                    onPress={() =>onChange(Layout.QUEUE) }    
                >
                    <GalleryVertical />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 15
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