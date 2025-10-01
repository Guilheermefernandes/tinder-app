import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Post } from "../types/post";
import { Layout } from "./profile";
import { urlImage } from "../utils/image";
import { User } from "../types/user";
import { MessageCircle, ThumbsUp, Underline } from "lucide-react-native";
import { useMutationCreateLike } from "../tanStack/mutation/like/createLike.mutation";
import { query } from "../utils/query";
import { useQueryFindManyLike } from "../tanStack/query/like/findManyLike.query";

type Props = {
    post: Post;
    layoutPost: Layout;
    user: User;
    token: string
}

const content = Dimensions.get('window').width
const square = content / 3

export default function IntemPost({
    post, layoutPost, user, token
}: Props){

    const date = new Date(post.createdAt)
    const createdAt = date.toLocaleString('pt-BR', {   timeZone: 'America/Sao_Paulo'})
    const mutationLike = useMutationCreateLike()
    const queryLikes = useQueryFindManyLike(post.id)

    // implement
    const like = () => {
        mutationLike.mutate({postId: post.id, auth: token}, {
            onSuccess: (result) => {
                if(result.status === 200){
                    query.invalidateQueries({
                        queryKey: ['likes', post.id]
                    })
                }
            }
        })
    }

    const likes = queryLikes.data

    return(
        <View style={[layoutPost === Layout.GRID ? styles.grid : styles.queue, layoutPost === Layout.QUEUE ? styles.margin : styles.none]}>
            {layoutPost === Layout.QUEUE&&
                <View>
                    <View style={styles.headerPost}>
                        <View style={styles.metaData}>
                            <Image
                                source={{uri: `${urlImage}/${user.avatar}`}} style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.name}>
                                    {user.name}
                                </Text>
                                <Text style={styles.slug}>
                                    {user.slug}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.datePost}>
                                {createdAt}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title }>{post.title}</Text>
                        <View>
                            {post.description != null &&
                                <Text style={styles.description}>
                                    {post.description}
                                </Text>
                            }
                        </View>
                    </View>
                </View>
            }
            <Image source={{ uri: `${urlImage}/${post.path}` }} style={layoutPost === Layout.GRID ? styles.image : styles.imageQueue} resizeMode="cover"/>
            {layoutPost === Layout.QUEUE && 
                <View style={styles.interactions}>
                    <Pressable style={[styles.btn]} onPress={like}>
                        <ThumbsUp color={likes?.like != undefined && likes.like > 0 ? '#2795F5' : '#000'}/>
                        <Text>
                            {likes != undefined &&
                                likes.like
                            }
                            {likes == undefined &&
                                0
                            }
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.btn]}>
                        <MessageCircle />
                        <Text>203</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    grid: {
        width: square,
        height: square,
    },
    queue: {
        width: '100%',
        padding: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    imageQueue: {
        width: '100%',
        height: 400,
        borderRadius: 10
    },
    margin: {
        marginBottom: 30
    },
    none: {
        marginBottom: 0
    },
    headerPost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    metaData: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 500
    },
    slug: {
        fontSize: 14,
        color: '#666'
    },
    datePost: {
        fontSize: 12,
        color: '#666'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 99
    },
    title: {
        fontWeight: 700,
        fontSize: 24,
        marginVertical: 10
    },
    description: {
        fontWeight: 300,
        marginTop: 10,
        marginBottom: 20,
        color: '#666'
    },
    interactions: {
        flexDirection: 'row',
        gap: 2
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#dedede',
        borderRadius: 10,
        marginTop: 4
    }
})