import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Post } from "../types/post";
import { Layout } from "./profile";
import { urlImage } from "../utils/image";

type Props = {
    post: Post,
    layoutPost: Layout
}

const content = Dimensions.get('window').width
const square = content / 3

export default function IntemPost({
    post, layoutPost
}: Props){
    return(
        <View style={[layoutPost === Layout.GRID ? styles.grid : styles.queue, layoutPost === Layout.QUEUE ? styles.margin : styles.none]}>
            {post.title != null && layoutPost === Layout.QUEUE&&
                <View>
                    <Text style={styles.title }>{post.title}</Text>
                    {post.description != null &&
                        <Text style={styles.description}>
                            {post.description}
                        </Text>
                    }
                </View>
            }
            <Image source={{ uri: `${urlImage}/${post.path}` }} style={styles.image} resizeMode="cover"/>
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
        height: 500,
        padding: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    margin: {
        marginBottom: 30
    },
    none: {
        marginBottom: 0
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
    }
})