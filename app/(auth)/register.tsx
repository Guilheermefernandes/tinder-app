import { Button, Pressable, StyleSheet, Text, TextInput, TextInputBase, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../ui/input";
import { useRef, useState } from "react";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react-native";
import {Picker} from '@react-native-picker/picker';

const FormRegister = z.object({
    name: z.string('Digite seu nome').min(2, 'Ao menos 2 letras'),
    email: z.email('Digite seu email'),
    password: z.string('Digite sua senha'),
    slug: z.string('Digite um usuário único'),
    sex: z.enum(['MASCULINE', 'FEMININE'], 'MASCULINE OU FEMININE')
})

export default function Screen(){

    const pickerRef = useRef(null)

    const { control, register, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(FormRegister)
    })

    const onSubmit = (data: z.infer<typeof FormRegister>) => {
        console.log(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <View>
                <Controller 
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.iconInput}>
                                <Mail color="#fff" size={18}/>
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
                                <Mail color="#fff" size={18}/>
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
                                <Mail color="#fff" size={18}/>
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
                        <View style={styles.areaInput}>
                           
                            <Picker ref={pickerRef}>
                                
                                <Picker.Item label="Masculino" value="MASCULINE"/>
                                <Picker.Item label="Feminino" value="FEMININE"/>
                            </Picker>
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
                    Entrar
                </Text>
            </Pressable>

            <View>
                <Text>
                    Ainda não possui uma conta? <Link href="">Criar conta</Link>
                </Text>
            </View>
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
    }
})