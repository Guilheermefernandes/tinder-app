import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { Camera, Heart, Info, Scroll, X } from "lucide-react-native";
import WorkProfile from "./workProfile";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useQueryFindUserById } from "../tanStack/query/findUserByIdQuery";
import { Post } from "../types/post";
import { useQueryGetPostUserById } from "../tanStack/query/post/findManyUserPostsById";
import { urlImage } from "../utils/image";
import axios from "axios";
import { urlServeBase } from "../utils/urlBaseBackend";
import ModalImageProfile from "./modalImageProfile";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    user: User
}

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3;

export default function Profiles({ user }: Props){

    const [token, setToken] = useState('')
    const [posts, setPosts] = useState<Post[] | null>(null)
    const [modalImage, setModalImage] = useState<boolean>(false)
    const [photo, setPhoto] = useState<string>('')

    const auth = async () => {
        const tokenAsync = await AsyncStorage.getItem('token')
        if(tokenAsync != null){
            setToken(tokenAsync)
        }else{
            router.replace('login')
        }
    }

    const modal = (image: string) => {
        setPhoto(image)
        setModalImage(true)
    }
    const closeModal = () => {

        setModalImage(false)

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
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <View>
                            <Image source={{ uri: `${urlImage}/${user.avatar}` }} style={styles.avatar} resizeMode="cover"/>
                            <LinearGradient 
                                colors={['transparent', '#000']}
                                locations={[0.5, 1]}
                                style={styles.gradient}
                            />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text numberOfLines={2} style={styles.description}>{user.description}</Text>
                            <View style={styles.work}>
                                <WorkProfile color="#fff" label="Posts" data={user.photos}/>
                                <WorkProfile color="#fff" label="Matchs" data={user.matched}/>
                                <WorkProfile color="#fff" label="Interações" data={user.interactions}/>
                            </View>
                            <View style={styles.areaBtn}>
                                <Pressable style={styles.btn}>
                                    <X color="#fff" size={15}/>
                                    <Text style={styles.textBtn}>Cancelar</Text>
                                </Pressable>
                                <Pressable style={[styles.btn, styles.btnApprove]}>
                                    <Heart color="#000" size={15}/>
                                    <Text style={[styles.textBtn, styles.textBtnApprove]}>Gostei</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
            />
            }
            {modalImage &&
                <ModalImageProfile photo={photo} showModal={modalImage} closeModal={closeModal}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        
    },
    slug: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666'
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
    },
    info: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: '#000',
        paddingHorizontal: 10
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    email: {
        color: '#666'
    },
    description: {
        fontSize: 14,
        marginTop: 10,
        color: '#666'
    },
    avatar: {
        width: 'auto',
        height: 400,
        backgroundColor: '#ccc'
    },
    work: {
        marginVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    image: {
        width: imageSize,
        height: imageSize,
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
    },
    areaBtn: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10
    },
    btn: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#FF3636',
        opacity: 0.5,
        alignItems: 'center',
        gap: 10
    },
    textBtn: {
        color: '#fff'
    },
    btnApprove: {
        backgroundColor: '#27F57D',
        opacity: 0.5
    },
    textBtnApprove: {
        color: '#000'
    }
})