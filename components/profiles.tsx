import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { Camera, Heart, X } from "lucide-react-native";
import WorkProfile from "./workProfile";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useQueryFindUserById } from "../tanStack/query/findUserByIdQuery";
import { Post } from "../types/post";
import { useQueryGetPostUserById } from "../tanStack/query/post/findManyUserPostsById";
import { urlImage } from "../app/utils/image";
import axios from "axios";
import { urlServeBase } from "../app/utils/urlBaseBackend";
import ModalImageProfile from "./modalImageProfile";

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
            <View style={styles.header}>
                <Text style={styles.slug}>{user.slug}</Text>
            </View>
            <View style={styles.info}>
                <View style={styles.avatar}>
                    {user.avatar != undefined &&
                        <Image source={{ uri: `${urlImage}/${user.avatar}` }} style={styles.avatar}/>
                    }
                    {user.avatar == undefined &&
                        <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center' }}>
                            <Camera />
                        </View>
                    }
                </View>
                <View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.description}>
                    {user.description}
                </Text>
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
            <View style={styles.work}>
                <WorkProfile label="Posts" data={user.photos}/>
                <WorkProfile label="Matchs" data={user.matched}/>
                <WorkProfile label="Interações" data={user.interactions}/>
            </View>
            <View>
                {posts &&
                    <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => modal(item.path)}>
                            <Image
                                source={{ uri: `${urlImage}/${item.path}` }}
                                style={styles.image}
                            />
                        </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                }
            </View>
            {modalImage &&
                <ModalImageProfile photo={photo} showModal={modalImage} closeModal={closeModal}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 30
    },
    slug: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    email: {
        color: '#666'
    },
    description: {
        fontSize: 14,
        marginTop: 20,
        color: '#666'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 99,
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
        marginTop: 30
    },
    btn: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        gap: 10
    },
    textBtn: {
        color: '#fff'
    },
    btnApprove: {
        backgroundColor: '#27F57D',
        opacity: 0.9
    },
    textBtnApprove: {
        color: '#000'
    }
})