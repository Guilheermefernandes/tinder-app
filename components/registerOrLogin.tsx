import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

type Props = {
    title: string,
    router: string
    link: string
}

export default function RegisterOrLogin({title, router, link}: Props){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {title} <Link style={styles.link} href={router}>{link}</Link>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    text: {
        color: '#666666'
    },
    link: {
        color: '#000000'
    }
})