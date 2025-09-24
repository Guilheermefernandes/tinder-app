import { ImageUp, X } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    photo: string
}

export default function PhotoRender({photo}: Props){
    return(
        <View style={styles.container}>
            <Image source={{uri: photo}} style={styles.img}/>
            <View style={styles.areaBtn}>
                <Pressable style={[styles.btn, styles.reject]}>
                    <X  style={styles.icon}/>
                    <Text style={styles.txtBtn}>Descartar</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.approve]}>
                    <ImageUp style={styles.icon}/>
                    <Text style={styles.txtBtn}>Publicar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40
    },
    img: {
        flex: 1,
        width: 'auto',
        borderRadius: 30,
        overflow: 'hidden'
    },
    areaBtn: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 99,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: 180,
        justifyContent: 'center'
    },
    approve: {
        backgroundColor: '#36FF65',
        borderColor: '#36FF65',
        opacity: 0.5
    },
    reject: {
        backgroundColor: '#FF3636',
        borderColor: '#FF3636',
        opacity: 0.5
    },
    txtBtn: {
        color: '#000'
    },
    icon: {
        marginRight: 10
    }
})