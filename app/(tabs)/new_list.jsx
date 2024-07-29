import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
    return (
        <SafeAreaView className="h-full bg-primary">
            <View
                className="h-full justify-center items-center"
            >
                <Text className="italic text-white">New List.</Text>
            </View>

            <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>

    );
}
