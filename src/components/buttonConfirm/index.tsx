import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../../styles/colors';

interface ButtonComponent {
    textButton: String
    onPress: any
}

const ButtonConfirm = (props: ButtonComponent) => {
    return (
        <TouchableOpacity style={styles.touchButton} onPress={props.onPress} >
            <Text children={props.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={styles.textButton} />
        </TouchableOpacity>
    );
}

export default ButtonConfirm;

const styles = StyleSheet.create({
    touchButton: {
        backgroundColor: colors.default_azul,
        borderWidth: 1,
        borderColor: colors.default_azul_claro,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    textButton: {
        color: colors.default_branco,
        fontWeight: 'bold',
        fontSize: 30
    }
})