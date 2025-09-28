import { router, useLocalSearchParams } from "expo-router";
import { CornerDownRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateComponent from "../../../../../components/updateComponent";
import FormAlter from "../../../../../components/formAlter";

export default function Screen(){

    const { userId } = useLocalSearchParams()

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Editar dados</Text>
            <View style={styles.form}>
                <View style={{gap: 10}}>
                    <UpdateComponent 
                        label="Adicionar Hobies" 
                        path="hobies"
                        userId={userId as string}
                    />
                    <UpdateComponent 
                        label="Alterar senha" 
                        path="password"
                        userId={userId as string}
                    />
                </View>
                <View style={{marginTop: 20}}>
                    <FormAlter/>
                </View>
            </View>
            <View style={styles.areaBtn}>
                <Pressable style={styles.btn}>
                    <Text>Editar dados</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        gap: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20   
    },
    form: {
        flex: 1,
    },
    areaBtn: {
        height: 60,
    },
    btn: {
        width: '100%',
        height: '100%',
        backgroundColor: '#dedede',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnHobies: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dedede',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    textBtnHobies: {
        fontSize: 16,
        fontWeight: '500'
    }
})