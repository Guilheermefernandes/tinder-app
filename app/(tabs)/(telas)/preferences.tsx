import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, VenusAndMars } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import {Picker} from '@react-native-picker/picker';
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const FormPreference = z.object({
    sex: z.enum(["MASCULINE", "FEMININE"])
})

export default function Screen(){

    const [token, setToken] = useState<string | null>(null)

    const { control, handleSubmit, formState: {errors} } = useForm<z.infer<typeof FormPreference>>({
        resolver: zodResolver(FormPreference),
        defaultValues: {
            sex: "FEMININE"
        }
    })
    const pickerRef = useRef(null)

    const onSubmit = (data: z.infer<typeof FormPreference>) => {
        console.log(data)
    }

    const auth = async () => {
        const token = await AsyncStorage.getItem('token')
        if(token != null){
            setToken(token)
        }else{
            router.replace('login')
        }
    }   

    useEffect(() => {
        auth()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sua preferência</Text>
            </View>
            <View style={styles.form}>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <View style={styles.areaInput}>
                            <View style={styles.icon}>
                                <VenusAndMars color="#000" size={18}/>
                            </View>
                            <Picker ref={pickerRef}
                                style={styles.picker}
                                selectedValue={value}
                                onValueChange={(itemValue) =>
                                    onChange(itemValue)
                                }
                            >
                            
                                
                                <Picker.Item label="Masculino" value="MASCULINE"/>
                                <Picker.Item label="Feminino" value="FEMININE"/>
                            </Picker>
                        </View>

                    )}
                    name="sex"
                />
                <Pressable style={styles.btn}>
                    <Text style={styles.textBtn}>
                        Editar dados
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    areaInput: {
        flexDirection: 'row'
    },
    icon: {
        width: 60,
        height: 60,
        backgroundColor: '#F52780',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picker: {
        backgroundColor: '#dedede',
        width: 300
    },
    btn: {
        padding: 15,
        borderRadius: 10,
        width: 360,
        backgroundColor: '#dedede',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textBtn: {
        textAlign: 'center'
    }
})