import { Tabs } from "expo-router";
import { Camera, CircleFadingPlus, Heart, House, MessageCircle, ThumbsUp } from "lucide-react-native";
import { AuthProvider } from "../../context/authContext";

export default function TabsLayout(){
    return(
        <AuthProvider>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#000000",
            }}>
                <Tabs.Screen name="home" options={{
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => <House color={focused ? color : '#777'}/>
                }}/>
                <Tabs.Screen name="like" options={{
                    title: 'Curtidas',
                    tabBarIcon: ({color, focused}) => <ThumbsUp color={focused ? color : "#777"} />
                }}/>
                <Tabs.Screen name="matched" options={{
                    title: 'Matches',
                    tabBarIcon: ({color, focused}) => <Heart color={focused ? color : "#777"}/>
                }}/>
                <Tabs.Screen name="message" options={{
                    title: 'Menssagens',
                    tabBarIcon: ({ color, focused }) => <MessageCircle color={focused ? color : "#777" }/>
                }}/>
                <Tabs.Screen name="post" options={{
                    title: "Post",
                    tabBarIcon: ({ color, focused }) => <CircleFadingPlus color={focused ? color : "#777" } />
                }}/>
                <Tabs.Screen name="profile" options={{
                    href: null
                }}/>
                <Tabs.Screen name="(telas)" options={{
                    href: null
                }}/>
            </Tabs>
        </AuthProvider>
    )
}