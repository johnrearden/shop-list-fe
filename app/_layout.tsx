import { Stack, Tabs } from "expo-router";
import { AuthContextProvider } from '../contexts/AuthProvider'

export default function RootLayout() {
    return (
        <>
            <AuthContextProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack>
            </AuthContextProvider>

        </>

    );
}
