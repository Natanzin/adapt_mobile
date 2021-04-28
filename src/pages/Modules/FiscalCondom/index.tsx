import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { View, ScrollView, TouchableHighlight, StyleSheet, Text } from 'react-native';
import { Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'
import IonIcons from 'react-native-vector-icons/Ionicons'

//Nessa tela mostraremos todos os condomínios que o fiscal irá fiscalizar

const FiscalCondom = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.cardCondom}>
          <Text children={'Nome Condomínio'} style={styles.textTitle} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
          <TouchableHighlight onPress={() => { }} style={styles.buttonLoc}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <IonIcons name='navigate-outline' size={18} color='#FFF' style={styles.icon} />
              <Text children='Localização condomínio' style={{ color: '#fff', fontWeight: 'bold' }} />
            </View>
          </TouchableHighlight>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={styles.buttonFiscal}>
              <TouchableHighlight onPress={() => props.navigation.navigate('CameraFiscal', { 'tipoVigia': 'dia' })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <IonIcons name='sunny-outline' size={18} color='#FFF' style={styles.icon} />
                  <Text children='Fiscal Diurno' style={{ color: '#fff', fontWeight: 'bold' }} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.buttonFiscal}>
              <TouchableHighlight onPress={() => props.navigation.navigate('CameraFiscal', { 'tipoVigia': 'noite' })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <IonIcons name='moon-outline' size={18} color='#FFF' style={styles.icon} />
                  <Text children='Fiscal Noturno' style={{ color: '#fff', fontWeight: 'bold' }} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default FiscalCondom;

const styles = StyleSheet.create({
  cardCondom: { borderWidth: 1, borderColor: '#005685',  marginHorizontal: 15, marginVertical: 10, borderTopWidth: 10, borderTopColor: '#005685', backgroundColor: '#fff', padding: 5, borderRadius: 5 },
  buttonLoc: { alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 8, backgroundColor: '#005685', marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 3, }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6, },
  buttonFiscal: { width: '47%', height: 35, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#005685', shadowColor: "#000", shadowOffset: { width: 0, height: 3, }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6, },
  icon: { marginRight: 5 },
  textTitle: { fontWeight: 'bold', fontSize: 22 }
})