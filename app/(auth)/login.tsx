import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../ui/input";
import { useState } from "react";
import { Link, router } from "expo-router";
import RegisterOrLogin from "../../components/registerOrLogin";

export default function Screen(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendLogin = () => {
        if(email.length > 0 && password.length > 0){

            

            router.replace('home')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Input 
                placeholder="Digite seu email" 
                value={email} 
                onChange={t => setEmail(t)}
            />
            <Input placeholder="Digite sua senha" 
                value={password} 
                onChange={t => setPassword(t)} 
                password={true}
            />

            <Pressable 
                style={styles.btn}
                onPress={sendLogin}
            >
                <Text style={styles.textBtn}>
                    Entrar
                </Text>
            </Pressable>

            <RegisterOrLogin title="Ainda não possui conta?" router="/register"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    btn: {
        height: 60,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F52780',
        borderRadius: 15
    },
    textBtn: {
        color: '#fff'
    }
})