import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import colors from '../../styles/colors';

interface buttonProp {
    source: any
    route: any
    title: String
    alert?: boolean
}

const ButtonMenu = (props: buttonProp) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={props.route} underlayColor={colors.default_cinza_claro} style={[styles.card, props.alert && { backgroundColor: colors.default_laranja }]}>
                <>
                    <View style={styles.viewCard}>
                        <Image source={props.source} style={styles.imgCard} resizeMode={'contain'} />
                    </View>
                    <View style={styles.viewCard}>
                        <Text children={props.title} style={[styles.textCard, props.alert && {color: colors.default_branco}]} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                    </View>
                </>
            </TouchableHighlight>
        </View>
    );
}

export default ButtonMenu;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        marginVertical: 3
    },
    card: {
        width: Dimensions.get('window').width * 0.95,
        backgroundColor: colors.default_branco,
        borderWidth: 1,
        borderColor: colors.default_cinza_claro,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    imgCard: {
        width: 90,
        height: 90
    },
    textCard: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000'
    },
    viewCard: {
        width: '50%',
        height: 105,
        justifyContent: 'center',
        alignItems: 'center'
    },
})