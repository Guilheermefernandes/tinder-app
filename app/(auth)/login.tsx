import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../ui/input";
import { useState } from "react";
import { Link, router } from "expo-router";
import RegisterOrLogin from "../../components/registerOrLogin";
import { Controller, useForm } from "react-hook-form";
import z, { email, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hash, Lock, Mail } from "lucide-react-native";
import { useMutationLogin } from "../../tanStack/mutation/auth/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormLogin = z.object({
    email: email('Digite um email válido!'),
    password: string()
})

export default function Screen(){

    const { control, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(FormLogin)
    })
    const mutationLogin = useMutationLogin()

    const auth = async (token: string) => {
        await AsyncStorage.setItem('token', token)
        router.replace('home')

    }

    const onSubmit = (data: z.infer<typeof FormLogin>) => {
       mutationLogin.mutate(data, {
        onSuccess: (result) => {
            if(result.token){
                auth(result.token)
            }
        }
       })
    }

    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Image source={require('../../assets/match-logo.o.png')}/>
            </View>

            <View style={{ gap: 10 }}>
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <Mail color="#fff" size={18}/>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>

                    )}
                    name="email"
                />
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <Lock color="#fff" size={18}/>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="senha"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                            />
                        </View>

                    )}
                    name="password"
                />
            </View>

            <Pressable 
                style={styles.btn}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.textBtn}>
                    Entrar
                </Text>
            </Pressable>

            <RegisterOrLogin title="Ainda não possui conta?" link="Criar conta" router="/register"/>
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
        width: 310,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F52780',
        borderRadius: 15
    },
    textBtn: {
        color: '#fff'
    },
    input: {
        backgroundColor: '#dedede',
        height: 60,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        width: 260
    },
    iconInput: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        alignItems: 'center',
        backgroundColor: '#F52780'
    },
    areaInput: {
        flexDirection: 'row'
    },
    picker:{
        width: 260,
        height: 60,
        borderRadius: 40,
        backgroundColor: '#dedede'
    }
})