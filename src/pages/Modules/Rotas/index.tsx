import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import rotas from './rotas.json'

const Rotas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  const router = rotas?.locales
  return (
    <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15 }}>
      <TouchableHighlight onPress={() => props.navigation.navigate('Mapa')} style={styles.button} underlayColor='#d0d0d0'>
        <>
          <Image source={require('../../../assets/icon-mapa.png')} style={styles.imgButton} resizeMode={'contain'} />
          <Text children='Visualizar Mapa' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
        </>
      </TouchableHighlight>
      <Divider />
      <ScrollView style={{ flex: 1, width: '100%', marginTop: 5 }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {router.map(item => (
            <View key={item.id} style={styles.viewInfo}>
              <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
                <Text>{item.nome}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: 'bold' }}>Endereço: </Text>
                <Text>{item.endereço}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: 'bold' }}>Responsável: </Text>
                <Text>{item.responsavel}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                <Text style={{ fontWeight: 'bold' }}>Próxima Coleta: </Text>
                <Text>{item.proximaColeta}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Rotas;

const styles = StyleSheet.create({
  button: { flexDirection: 'row', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, width: '90%', height: 100, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFF' },
  imgButton: { width: 70, height: 70 },
  textButton: { fontSize: 16, fontWeight: 'bold' },
  viewInfo: { backgroundColor: '#fff', width: '90%', marginVertical: 10, paddingVertical: 10, paddingHorizontal: 8, borderTopWidth: 10, borderTopColor: '#005685', borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 }
})