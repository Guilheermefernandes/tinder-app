import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Interaction } from "../types/Interaction";
import { urlImage } from "../utils/image";
import { Check, X } from "lucide-react-native";
import { router } from "expo-router";
import { useMutationCreateInteraction } from "../tanStack/mutation/interaction/createInteractionMutation";

type Props = {
    interaction: Interaction;
    auth: string
}

export default function Like({auth, interaction}: Props){

    const mutationCreateInteraction = useMutationCreateInteraction()

    const reject = () => {

    }

    const approve = () => {

        mutationCreateInteraction.mutate({auth: auth, param: interaction.from_user.id, query: 'LIKE'}, {
            onSuccess: (result) => {
                if(result.ok == true){
                    
                    alert('Aceitou!')

                }
            }
        })

    }

    return(
        <Pressable style={styles.container} onPress={() => router.push({
            pathname: '(tabs)/(telas)/profiles/[id]',
            params: { id: interaction.from_user.id }
        })}>
            <View style={styles.areaFromUser}>
                <View style={styles.imageArea}>
                    <Image source={{ uri: `${urlImage}/${interaction.from_user.avatar}` }} style={styles.img}/>
                </View>
                <View style={styles.basicInfo}>
                    <Text style={styles.name}>
                        {interaction.from_user.name}
                    </Text>
                    <Text style={styles.slug}>
                        {interaction.from_user.slug}
                    </Text>
                </View>
            </View>
            <View style={styles.areaBtn}>
                <Pressable style={[styles.btn, styles.reject]}>
                    <X />
                </Pressable>
                <Pressable style={[styles.btn, styles.approve]}>
                    <Check />
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: '#dedede',
        borderRadius: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageArea: {
        width: 50,
        height: 50,
        overflow: 'hidden'
    },
    img: {
        width: 'auto',
        height: 50,
        borderRadius: 99
    },
    areaFromUser: {
        flexDirection: 'row',
        gap: 10
    },
    basicInfo: {
        gap:2
    },
    name: {
        fontWeight: 500
    },
    slug: {
        color: '#666'
    },
    areaBtn: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    btn: {
        padding: 5,
        borderRadius: 99,
        opacity: 0.7
    },
    reject: {
        backgroundColor: '#F52727'
    },
    approve: {
        backgroundColor: '#27F546'
    }
})