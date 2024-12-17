import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { router, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);


    const resetFields = () => {
        setEmail('');
        setPassword('');
    }

    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    const validateInput = () => {
        setErrors('');
        if (!email) {
            setErrors('Email is required');
            return false;
        }
        if (!password) {
            setErrors('Password is required');
            return false;
        }
        if (!re.test(email)) {
            setErrors('Email is not valid');
            return false;
        }
        return true;
    }
    const goToSignIn = () => {
        router.push('/(auth)/sign-in')
    }
    const onSubmit = () => {
        if (!validateInput()) {
            return;
        }
        console.warn('creating account:', email);
        //Save in the database
        resetFields();
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign up" }} />
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder='jon@gmail.com' />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder='pass'
                secureTextEntry
            />

            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button disabled={loading} text={loading ? 'Creating account...' : 'Create account'} onPress={signUpWithEmail} />
            <Text onPress={goToSignIn} style={styles.textBtn}>Sign in</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    textBtn: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    },
    delTextBtn: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'red',
        marginVertical: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    }
});