import { ActivityIndicator, Button, Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { useMutationCreatePost } from "../../tanStack/mutation/post/create";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Camera } from "lucide-react-native";
import { query } from "../../utils/query";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = z.object({
    title: z.string().optional(),
    description: z.string().optional()
})

export default function Screen(){

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()
    const [photo, setPhoto] = useState('')
    const [assets, setAssets] = useState<ImagePicker.ImagePickerAsset | null>(null)
    const [token, setToken] = useState('')
    const mutationPost = useMutationCreatePost()
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(Form)
    })

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

            // implements
            data.append('title', 'titulo de teste')
            data.append('description', 'descrição de teste')

            mutationPost.mutate({auth: token, file: data}, {
                onSuccess: (result) => {
                    query.invalidateQueries({
                        queryKey: ['posts']
                    })
                    router.push({
                        pathname: `(tabs)/(telas)/profile/usuario`
                    })
                }
            })

        }

    }

    const onSubmit = (raw: z.infer<typeof Form>) => {

        if(assets === null) return;

        const data = new FormData()

            data.append('file', {
                name: assets.fileName,
                type: assets.mimeType,
                uri: Platform.OS === 'ios' ? assets.uri.replace('file://', '') : assets.uri
            } as any)
            data.append('title', raw.title as string)
            data.append('description', raw.description as string)

            mutationPost.mutate({auth: token, file: data}, {
                onSuccess: (result) => {
                    query.invalidateQueries({
                        queryKey: ['posts']
                    })
                    router.push({
                        pathname: `(tabs)/(telas)/profile/usuario`
                    })
                }
            })

    }

    if(mutationPost.isPending){
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
                <ActivityIndicator />
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                <Text style={styles.title}>Criar postagem</Text>
                <View style={styles.camera}>
                    <Camera />
                </View>
            </View>
                <Pressable style={styles.btn} onPress={pickerImage}>
                    <Text>Selecionar imagem</Text>
                </Pressable>
                <View style={{gap: 10, marginVertical: 20}}>
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o título"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                        name="title"
                    />
                    <Controller
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Digite o título"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                multiline={true}
                                numberOfLines={5}
                            />
                        )}
                        name="description"
                    />
                </View>
                <View style={styles.imageArea}>
                    {photo.length > 0 &&
                        <Image source={{ uri: photo }} style={{ width: 'auto', height: '100%' }} resizeMode="cover"/>
                    }
                </View>
            </View>
            <Pressable style={[styles.btn, styles.approve]} onPress={handleSubmit(onSubmit)}>
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
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
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
        width: 'auto',
        height: 60,
        backgroundColor: '#ccc',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageArea: {
        width: 'auto',
        height: '50%',
        borderRadius: 20,
        backgroundColor: '#ccc',
        overflow: 'hidden'
    },
    approve: {
        backgroundColor: '#000',

    },
    textBtn: {
        color: '#fff'
    },
    input: {
        height: 60,
        backgroundColor: '#dedede',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    textArea: {
        height: 95
    }
})