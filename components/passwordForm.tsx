import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import z from "zod";

type Props = {
    userId: string
}

const FormAlterPassword = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, 'A senha deve ter no minimo 6 caracteres'),
    confirmNewPassword: z.string().min(6, 'A senha deve ter no minimo 6 caracteres')
})

export default function PasswordForm({userId}: Props){

    const { control, handleSubmit, formState: {errors} } = useForm({
        resolver: zodResolver(FormAlterPassword)
    })

    const onSubmit = (data: z.infer<typeof FormAlterPassword>) => {
        if(data.newPassword != data.confirmNewPassword){
            alert('Senhas deiferentes')
        }
        if(data.currentPassword === data.newPassword){
            alert('Senha nova igual a senha antiga. Faça outra!')
        }
        
        
        
    }

    return (
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
                            placeholder="Senha atual"
                        />
                    )}
                    name="currentPassword"
                />
                <Text>{errors.currentPassword?.message}</Text>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Nova senha"
                        />
                    )}
                    name="newPassword"
                />
                <Text>{errors.newPassword?.message}</Text>
                <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Confirmar nova senha"
                        />
                    )}
                    name="confirmNewPassword"
                />
                <Text>{errors.confirmNewPassword?.message}</Text>
            </View>
            <View>
                <Pressable style={styles.btn} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.textBtn}>Alterar senha</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'space-between'
    },
    areaInputs: {
        gap: 15
    },
    input: {
        height: 60,
        backgroundColor: '#dedede',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    btn: {
        height: 60,
        backgroundColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: '#fff', 
        fontWeight: '500'
    }
})