import { Stack } from "expo-router";

export default function ProfileLayout(){
    return(
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="usuario" />
            <Stack.Screen name="update/[userId]"/>
            <Stack.Screen name="hobies/[userId]"/>
            <Stack.Screen name="[postId]" />
        </Stack>
    )
}