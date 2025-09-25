import { Button, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { useMutationCreatePost } from "../../tanStack/mutation/post/create";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Camera } from "lucide-react-native";

export default function Screen(){

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [photo, setPhoto] = useState('')
    const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset | null>(null)
    const [token, setToken] = useState('')
    const mutationPost = useMutationCreatePost()

    if(status?.status !== 'granted'){
        <View>
            <Button title="Permitir acesso" onPress={requestPermission}/>
        </View>
    }

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

    const pickerImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
            exif: true
        })

        if(result.assets){
            setPhoto(result.assets[0].uri)
            setAssets(result.assets[0])
        }
        
    }

    const uploadImage = () => {

        if(assets != null){

            const data = new FormData()

            data.append('file', {
                name: assets.fileName,
                type: assets.mimeType,
                uri: Platform.OS === 'ios' ? assets.uri.replace('file://', '') : assets.uri
            } as any)

            mutationPost.mutate({auth: token, file: data}, {
                onSuccess: (result) => {
                    setPhoto('')
                }
            })

        }

    }


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Criar postagem</Text>
                <View style={styles.camera}>
                    <Camera />
                </View>
            </View>
            <Pressable style={styles.btn} onPress={pickerImage}>
                <Text>Selecionar imagem</Text>
            </Pressable>
            <View style={styles.imageArea}>
                {photo.length > 0 &&
                    <Image source={{ uri: photo }} style={{ width: 'auto', height: '100%' }} resizeMode="cover"/>
                }
            </View>
            <Pressable style={[styles.btn, styles.approve]} onPress={uploadImage}>
                <Text style={styles.textBtn}>
                    Publicar
                </Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    camera: {
        width: 60,
        height: 60,
        borderRadius: 99,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    btn: {
        marginVertical: 30,
        width: 'auto',
        height: 60,
        backgroundColor: '#ccc',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageArea: {
        width: 'auto',
        height: '60%',
        borderRadius: 20,
        backgroundColor: '#ccc',
        overflow: 'hidden'
    },
    approve: {
        backgroundColor: '#000',

    },
    textBtn: {
        color: '#fff'
    }
})