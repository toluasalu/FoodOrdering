import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import { router, Stack } from 'expo-router';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const resetFields = () => {
        setEmail('');
        setPassword('');
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

    const onSubmit = () => {
        if (!validateInput()) {
            return;
        }
        console.warn('signing in:', email);
        //Save in the database
        resetFields();
    }

    const createAccount = () => {
        router.push('/(auth)/sign-up')
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign in" }} />
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
            <Button text='Sign in' onPress={onSubmit} />
            <Text onPress={createAccount} style={styles.textBtn}>Create an account</Text>
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