import { Button, Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { Camera, CameraIcon, UserRound } from "lucide-react-native";
import WorkProfile from "./workProfile";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryGetPostUserById } from "../tanStack/query/post/findManyUserPostsById";
import { urlServeBase } from "../utils/urlBaseBackend";
import Posts from "./posts";

type Props = {
    user: User
}

const url = `${urlServeBase}/public/uploads`

export default function Profile({user}: Props){

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [avatar, setAvatar] = useState<string>('')

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
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.profileWork}>
                <WorkProfile label="Photos" data={user.photos}/>            
                <WorkProfile label="matchs" data={user.matched}/>    
                <WorkProfile label="Interações" data={user.interactions}/>    
            </View>
            <Pressable style={styles.btnEdit}>
                <Text style={styles.textBtn}>Editar dados</Text>
            </Pressable>
            <View style={styles.postsArea}>
                <Posts user={user}/>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
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
        marginTop: 30
    }
})