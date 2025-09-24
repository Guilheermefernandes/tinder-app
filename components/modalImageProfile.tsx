import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { urlServeBase } from "../app/utils/urlBaseBackend";

type Props = {
    photo: string
    showModal: boolean
    closeModal: () => void
}

export default function ModalImageProfile({ photo, showModal, closeModal }: Props){

    return(
        <Animated.View style={[styles.container, { display: showModal ? 'flex' : 'none' }]}>
            <Pressable onPress={() => closeModal()} style={styles.btn}>
                <Text style={{ color: '#fff' }}>
                    fechar
                </Text>
            </Pressable>
            <Image source={{ uri: `${urlServeBase}/public/uploads/${photo}` }} style={{ width: 'auto', height: '100%' }} resizeMode="cover"/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 'auto',
        position: 'absolute',
        top: 150,
        bottom: -150, 
        left: 30,
        right: 30,
        backgroundColor: '#dedede',
        borderRadius: 30,
        overflow: 'hidden',
    },
    btn: {
        backgroundColor: '#000',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})