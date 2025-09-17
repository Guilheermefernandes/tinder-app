import { Redirect, router, Stack } from "expo-router";
import { AuthContext, AuthProvider, useAuth } from "../context/authContext";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout(){

    const queryClient = new QueryClient()

    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Stack screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="index"/>
                    <Stack.Screen name="(tabs)"/>
                    <Stack.Screen name="(auth)"/>
                    <Stack.Screen name="/profile/usuario"/>
                </Stack>
            </AuthProvider>
        </QueryClientProvider>
    )
}