import { LucideIcon, Mail } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
    placeholder: string
    onChange: (t: string) => void,
    value: string,
    password?: boolean,
}

export default function Input({placeholder, onChange, value, password}: Props){
    return (
        <View style={styles.container}>
            <View style={styles.iconInput}>
                <Mail color="#fff" size={18}/>
            </View>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                secureTextEntry={password ? true : false}
                onChangeText={text => onChange(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 300,
        borderRadius: 15,
        overflow: 'hidden',
        flexDirection: 'row'
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
        alignItems: 'center',
        backgroundColor: '#F52780'
    }
})