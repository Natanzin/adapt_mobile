import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import colors from '../../styles/colors';

const CardList: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {props.children}
            </View>
        </View>
    );
}

export default CardList;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        alignItems: 'center'
    },
    content: {
        width: Dimensions.get('screen').width * 0.95,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 0.7,
        borderTopWidth: 10,
        borderColor: colors.default_azul,
        borderRadius: 6,
        backgroundColor: colors.default_branco,
        marginVertical: 4
    }
})