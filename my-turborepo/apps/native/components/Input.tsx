import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputProps {
    onChangeText: (text: string) => void;
    value: string;
    placeholder?: string;
    type?: 'default' | 'numeric' | 'date';
    title?: string;
    validator?: (value: string) => string | null;
}

export default function Input({ onChangeText, value, placeholder = 'Enter text', type = 'default', title, validator }: InputProps) {
    const [error, setError] = useState<string | null>(null);

    let keyboardType: 'default' | 'numeric' | 'datetime' = 'default';
    if (type === 'numeric') {
        keyboardType = 'numeric';
    } else if (type === 'date') {
        keyboardType = 'datetime';
    }

    useEffect(() => {
        if (validator) {
            setError(validator(value));
        }
    }, [value, validator]);

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderRadius: 4,
        borderColor: 'grey',
        backgroundColor: 'white',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});