import { Dimensions, Image, StyleSheet, View } from "react-native";
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
        height: 400,
        padding: 15,
        borderRadius: 20,
        overflow: 'hidden'
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
    }
})