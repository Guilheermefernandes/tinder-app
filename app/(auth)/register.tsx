import { Button, Pressable, StyleSheet, Text, TextInput, TextInputBase, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../ui/input";
import { useRef, useState } from "react";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, ShieldUser, User, VenusAndMars } from "lucide-react-native";
import {Picker} from '@react-native-picker/picker';
import RegisterOrLogin from "../../components/registerOrLogin";
import { useMutationRegister } from "../../tanStack/mutation/auth/register";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormRegister = z.object({
    name: z.string('Digite seu nome').min(2, 'Ao menos 2 letras'),
    email: z.email('Digite seu email'),
    password: z.string('Digite sua senha'),
    slug: z.string('Digite um usuário único'),
    sex: z.enum(['MASCULINE', 'FEMININE'], 'MASCULINE OU FEMININE')
})

type FormTypeRegister = z.infer<typeof FormRegister>

export default function Screen(){

    const pickerRef = useRef(null)

    const { control, register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(FormRegister)
    })
    const mutationRegister = useMutationRegister()

    const onSubmit = (data: FormTypeRegister) => {

        mutationRegister.mutate(data, {
            onSuccess: (result) => {
                if(result.token){
                    AsyncStorage.setItem('token', result.token)
                    router.replace('/home')
                }
            },
            onError: () => {
                console.log('Ocorreu um error')
            }
        })

    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View>
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <User color="#fff" size={18}/>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>

                    )}
                    name="name"
                />
                <View>
                    <Text>{errors.name?.message}</Text>
                </View>
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <Mail color="#fff" size={18}/>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>

                    )}
                    name="email"
                />
                <View>
                    <Text>{errors.email?.message}</Text>
                </View>
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <Lock color="#fff" size={18}/>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>

                    )}
                    name="password"
                />
                <View>
                    <Text>{errors.password?.message}</Text>
                </View>
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <ShieldUser color="#fff" size={18}/>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Usuário"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        </View>

                    )}
                    name="slug"
                />
                <View>
                    <Text>{errors.slug?.message}</Text>
                </View>

                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ marginBottom: 5, color: '#666' }}>Sexo</Text>
                            <View style={{
                                backgroundColor: '#dedede',
                                borderRadius: 15,
                                overflow: 'hidden',
                                width: 320
                            }}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={{ width: '100%' }}
                                    itemStyle={{ height: 60 }}
                                >
                                    <Picker.Item label="Masculino" value="MASCULINE"/>
                                    <Picker.Item label="Feminino" value="FEMININE"/>
                                </Picker>
                            </View>
                        </View>

                    )}
                    name="sex"
                />
                <View>
                    <Text>{errors.sex?.message}</Text>
                </View>
            </View>

            <Pressable 
                style={styles.btn}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.textBtn}>
                    Registrar
                </Text>
            </Pressable>

            <RegisterOrLogin title="Já possui uma conta?" link="Fazer login" router="/login"/>
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