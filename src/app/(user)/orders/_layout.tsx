import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useColorScheme } from '@components/useColorScheme';
import { Pressable } from "react-native";

export default function OrderStack() {
    const colorScheme = useColorScheme();

    return <Stack>
        <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
}