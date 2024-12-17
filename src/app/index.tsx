import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import Button from '@/components/Button';
import { Link, Redirect } from 'expo-router';
import { AuthContext } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
    const { session, loading, isAdmin } = useContext(AuthContext);

    if (loading) {
        return <ActivityIndicator color={'green'} />
    }
    if (!session) {
        return <Redirect href={'/sign-in'} />
    }
    if (!isAdmin) {
        return <Redirect href={'/(user)'} />
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <Link href={'/(user)'} asChild>
                <Button text='User' />
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button text='Admin' />
            </Link>
            <Button onPress={() => supabase.auth.signOut()} text='Sign out' />

        </View>
    )
}

export default index;