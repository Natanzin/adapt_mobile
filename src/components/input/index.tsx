import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import colors from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons'
{/** INPUT TEXTO */ }

interface textoProps {
    value: any
    onChangeText: any
    placeholder: string
}

export const InputTexto = (props: textoProps) => {
    return (
        <View style={global.viewArea}>
            <View style={global.viewInput}>
                <TextInput
                    style={styleTexto.input}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholder={props.placeholder}
                    autoCompleteType={'off'}
                />
            </View>
        </View>
    );
}

const styleTexto = StyleSheet.create({
    input: { height: 50, color: '#000000', fontSize: 16 }
})

{/** INPUT SENHA  */ }

interface senhaProps {
    value: any
    onChangeText: any
    placeholder: string
}

export const InputSenha = (props: senhaProps) => {
    const [eye, setEye] = useState<boolean>(true)
    return (
        <View style={global.viewArea}>
            <View style={[global.viewInput, { flexDirection: 'row' }]}>
                <TextInput
                    style={styleSenha.input}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholder={props.placeholder}
                    autoCompleteType={'off'}
                    secureTextEntry={eye}
                />
                <TouchableOpacity style={styleSenha.icon} onPress={() => setEye(!eye)}>
                    <Ionicons name={eye ? 'eye' : 'eye-off'} color={colors.default_azul} size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styleSenha = StyleSheet.create({
    input: { width: '85%', height: 50, color: '#000000', fontSize: 16 },
    icon: { width: '15%', height: 50, justifyContent: 'center', alignItems: 'flex-end' }
})


{/** STYLESHEET GLOBAL */ }

const global = StyleSheet.create({
    viewArea: {
        width: Dimensions.get('screen').width,
        height: 50,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewInput: {
        borderWidth: 1,
        borderColor: colors.default_cinza,
        width: '80%',
        height: 50,
        backgroundColor: colors.default_branco,
        borderRadius: 6,
        paddingHorizontal: 20,
        justifyContent: 'center'
    }
})
