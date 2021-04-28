import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'

const Configuracoes = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    return (
        <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1, alignItems: 'center' }}>
            <TouchableHighlight onPress={() => props.navigation.navigate('Organizacoes') } underlayColor='#45BBEB' style={styles.cardButton}>
                <>
                    <Text children='Organizações' style={styles.textButton} />
                    <FontAwesome5Icon name='sitemap' size={30} color='#005685' />
                </>
            </TouchableHighlight>
        </LinearGradient>
    );
}

export default Configuracoes;
const styles = StyleSheet.create({
    cardButton: { width: '90%', height: 80, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#005685', borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10 },
    textButton: { fontSize: 25, fontWeight: 'bold', color: '#005685' }
})