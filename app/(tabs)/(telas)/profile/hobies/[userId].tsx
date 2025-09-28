import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHobbies } from "../../../../../tanStack/query/hobbies/getHobbiesQuery";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "lucide-react-native";
import HobbieBtn from "../../../../../components/hobbieBtn";

export default function Screen(){
    
    const [token, setToken] = useState('')

    const auth = async () => {
        const tokenAsync = await AsyncStorage.getItem('token')
        if(tokenAsync != null){
            setToken(tokenAsync)
        }else{
            router.replace('/login')
        }
    }

    useEffect(() => {
        auth()
    }, [])

    const queryHobbies = useHobbies(token)

    if(token.length === 0 || queryHobbies.isLoading){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator/>
            </View>
        )
    }

    const data = queryHobbies.data

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Hobbies do usuario</Text>

            {data != undefined &&
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <HobbieBtn auth={token} hobbie={item}/>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }
})