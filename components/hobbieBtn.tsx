import { Pressable, StyleSheet, Text, View } from "react-native";
import { Hobbies } from "../types/hobies";
import { Plus } from "lucide-react-native";
import { userMutationCreateHobbieUser } from "../tanStack/mutation/hobbie/createHobbieMutation";
import { query } from "../utils/query";

type Props = {
    auth: string
    hobbie: Hobbies
}

export default function HobbieBtn({auth, hobbie}: Props){

    const mutationHobbie = userMutationCreateHobbieUser()

    const createHobbieUser = () => {
        mutationHobbie.mutate({auth: auth, data: { hobbieId: hobbie.id}}, {
            onSuccess: (result) => {
                if(result.ok === true){
                    query.invalidateQueries({
                        queryKey: ['hobbies']
                    })
                }
            }
        })
    }

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>{hobbie.hobbie}</Text>
            </View>
            <Pressable style={styles.plus} onPress={() => createHobbieUser()}>
                <Plus color="#dedede" size={18}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 60,
        width: 'auto',
        backgroundColor: '#dedede',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        fontWeight: 500,
    },
    plus: {
        padding: 4,
        backgroundColor: '#666',
        borderRadius: 99
    }
})