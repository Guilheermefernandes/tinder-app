import { Stack } from "expo-router";

export default function ScreenRoot(){
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="preferences" />
            <Stack.Screen name="photo/[tag]" />
            <Stack.Screen name="profile/usuario" />
            <Stack.Screen name="profiles/[id]" />
        </Stack>
    )
}