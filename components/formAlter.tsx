import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
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
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    input: {
        height: 60,
        backgroundColor: '#dedede',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
})