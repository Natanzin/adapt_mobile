import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Card, Divider, Paragraph, Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import aprovaPedido from './EstruturasTabelas/AprovaPedido.json'

// import { Container } from './styles';

const AprovPedido = (props: any) => {
    const item = aprovaPedido?.AprovaPedido
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#FFFFFF', '#D0D0D0']}>
            <ScrollView style={{ flex: 1 }}>
                {item.map(item => (
                    <Card style={style.card} key={item.id}>
                        <Card.Title title={`Cotação: ${item.pedido}`} />
                        <Card.Content>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Cotante: </Text>
                                <Text>{item.cotante}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>
                                <Text>{item.total}</Text>
                            </View>
                            <Divider />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableHighlight onPress={() => { console.log('relatório') }} style={{ paddingVertical: 12 }} underlayColor='#eee' >
                                    <Text style={{ color: '#005685' }}>Acesse o relatório <FontAwesomeIcons name="file-pdf" color={'#005685'} size={18} /></Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => { console.log('mapa') }} style={{ paddingVertical: 12 }} underlayColor='#eee' >
                                    <Text style={{ color: '#005685' }}>Acesse o mapa <FontAwesomeIcons name="file-pdf" color={'#005685'} size={18} /></Text>
                                </TouchableHighlight>
                            </View>
                            <Divider />
                            <LinearGradient style={style.button} colors={['#45bbeb', '#005685']}>
                                <TouchableHighlight onPress={() => { console.log('Aprovar') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children='Aprovar' />
                                </TouchableHighlight>
                            </LinearGradient>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </LinearGradient>
    )
}

export default AprovPedido;

const style = StyleSheet.create({
    card: { marginHorizontal: 15, marginVertical: 10, borderTopWidth: 10, borderTopColor: '#005685', borderWidth: 1, borderColor: '#005685' },
    button: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 25, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 }
});