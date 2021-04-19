import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { View, ScrollView, TouchableHighlight, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

//Nessa tela mostraremos todos os condomínios que o fiscal irá fiscalizar

const FiscalCondom = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableHighlight onPress={() => props.navigation.navigate('CameraFiscal') } style={styles.cardCondom}>
          <View>
            <Text children='teste condominio' />
          </View>
        </TouchableHighlight>
      </ScrollView>
    </LinearGradient>
  );
}

export default FiscalCondom;

const styles = StyleSheet.create({
  cardCondom: { marginHorizontal: 15, marginVertical: 10, borderTopWidth: 10, borderTopColor: '#005685', backgroundColor: '#fff', padding: 5, borderRadius: 5 }
})