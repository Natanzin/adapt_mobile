import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Card, Divider } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import almoxarifado from './EstruturasTabelas/Almoxarifado.json'
import api from '../../../services/api'


const Almoxarifado = (props: any) => {
  const item = almoxarifado?.Almoxarifado
  return (
      <LinearGradient style={{ flex: 1 }} colors={['#FFFFFF', '#D0D0D0']}>
          <ScrollView style={{ flex: 1 }}>
              {item.map(item => (
                  <Card style={style.card} key={item.id}>
                      <Card.Title title={`Código: ${item.codigo}`} />
                      <Card.Content>
                          <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                              <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>
                              <Text>{item.descricao}</Text>
                          </View>
                      </Card.Content>
                  </Card>
              ))}
          </ScrollView>
      </LinearGradient>
  );
}

export default Almoxarifado;

const style = StyleSheet.create({
  card: { marginHorizontal: 15, marginVertical: 10, borderTopWidth: 10, borderTopColor: '#005685' },
  button: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 25, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  textBlue: { color: '#005685' },
  text: { marginVertical: 3 }
});