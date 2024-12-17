import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import { useColorScheme } from '@components/useColorScheme';
import { Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export default function AuthLayout() {
    const colorScheme = useColorScheme();
    const { session, loading } = useContext(AuthContext);

    if (session) {
        return <Redirect href={'/'} />
    }
    return <Stack />

}