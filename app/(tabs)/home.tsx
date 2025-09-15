import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function Screen(){

    const auth = useContext(AuthContext)

    const [res, setRes] = useState<string | null>(null)

    const test = async () => {
        const request = await axios.get('https://de33ee63e798.ngrok-free.app/user')
        if(request.data){
            setRes(request.data)
        }
    }

    useEffect(() => {
        test()
    }, [])

    return (
        <SafeAreaView style={{padding: 10}}>
            <Header />
            <View>
                {res != null &&
                    <Text>{res}</Text>
                }
            </View>
            <View>
                {auth?.user === null &&
                    <Text>Não a nada aqui</Text>
                }
            </View>
        </SafeAreaView>
    )
}