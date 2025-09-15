import { Redirect, router, Stack } from "expo-router";
import { AuthContext, AuthProvider, useAuth } from "../context/authContext";
import { useContext } from "react";

export default function RootLayout(){
    return(
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index"/>
            </Stack>
        </AuthProvider>
    )
}