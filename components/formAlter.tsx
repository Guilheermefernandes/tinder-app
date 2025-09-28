import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import z, { minLength } from "zod";

const Form = z.object({
    name: z.string('Escreva seu nome'),
    description: z.string('Escreva sua descrição')
})

export default function FormAlter(){

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(Form)
    })

    return(
        <View style={styles.container}>
            <View style={styles.areaInputs}>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Novo nome"
                        />
                    )}
                    name="name"
                />
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Nova descrição"
                        />
                    )}
                    name="description"
                />
            </View>
            <View style={styles.areaBtn}>
                <Pressable style={styles.btn}>
                    <Text>Editar dados</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    areaInputs: {
        gap: 10
    },
    input: {
        height: 60,
        backgroundColor: '#dedede',
        paddingHorizontal: 15,
        borderRadius: 10,
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
})