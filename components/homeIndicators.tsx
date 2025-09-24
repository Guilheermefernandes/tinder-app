import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Indicartors(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sugestões</Text>
            <Pressable 
                style={styles.btn}
                onPress={() => router.push('preferences')}
                >
                <Text style={styles.textBtn}>Editar preferências</Text>
                <ChevronRight />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },
    btn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textBtn: {
    }
})