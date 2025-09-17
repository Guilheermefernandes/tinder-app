import { Pressable, StyleSheet, Text, View } from "react-native";
import { User } from "../types/user";
import { UserRound } from "lucide-react-native";
import WorkProfile from "./workProfile";

type Props = {
    user: User
}

export default function Profile({user}: Props){

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <UserRound />
                </View>
                <View style={styles.headerData}>
                    <Text style={styles.title}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.profileWork}>
                <WorkProfile label="Photos" data={user.photos}/>            
                <WorkProfile label="matchs" data={user.matched}/>    
                <WorkProfile label="Interações" data={user.interactions}/>    
            </View>
            <Pressable style={styles.btnEdit}>
                <Text style={styles.textBtn}>Editar dados</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    avatar: {
        width: 80,
        height: 80,
        backgroundColor: '#dedede',
        borderRadius: 99,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    headerData: {
        flexDirection: 'column'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 14,
        color: '#666666'
    },
    profileWork: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnEdit: {
        marginTop: 20,
        width: 'auto',
        padding: 10, 
        backgroundColor: '#dedede',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textBtn: {
        textAlign: 'center'
    }
})