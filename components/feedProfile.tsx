import { ReactNode } from "react"
import { View } from "react-native"

type Props = {
    children: ReactNode
}

export default function FeedProfile({ children }: Props){
    return (
        <View>
            {children}
        </View>
    )
}