import React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'

const Configuracoes = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' }}>
            <TouchableHighlight onPress={() => props.navigation.navigate('Organizacoes') } underlayColor='#45BBEB' style={styles.cardButton}>
                <>
                    <Text children='Organizações' style={styles.textButton} />
                    <FontAwesome5Icon name='sitemap' size={40} color='#005685' />
                </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => props.navigation.navigate('Sobre') } underlayColor='#45BBEB' style={styles.cardButton}>
                <>
                    <Text children='Sobre' style={styles.textButton} />
                    <FontAwesome5Icon name='info-circle' size={40} color='#005685' />
                </>
            </TouchableHighlight>
        </View>
    );
}

export default Configuracoes;
const styles = StyleSheet.create({
    cardButton: { width: '90%', height: 80, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#005685', borderRadius: 5, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10, paddingHorizontal: 20 },
    textButton: { fontSize: 25, fontWeight: 'bold', color: '#005685' }
})