import * as React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Card, Divider } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import aprovaCotacao from './EstruturasTabelas/AprovaCotacao.json'

const AprovCotacao = (props: any) => {
    const item = aprovaCotacao?.AprovaCotacao
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#FFFFFF', '#D0D0D0']}>
            <ScrollView style={{ flex: 1 }}>
                {item.map(item => (
                    <Card style={style.card} key={item.id}>
                        <Card.Title title={`Cotação: ${item.cotacao}`} />
                        <Card.Content>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Comprador: </Text>
                                <Text>{item.comprador}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Descrição: </Text>
                                <Text>{item.descricao}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Cotante: </Text>
                                <Text>{item.cotante}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Mercadoria+(imposto): </Text>
                                <Text>{item.mercadoriaImposto}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Acres./Frete: </Text>
                                <Text>{item.acresFrete}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Descontos: </Text>
                                <Text>{item.acresFrete}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 3, justifyContent: 'space-between', width: '100%' }}>
                                <Text style={{ fontWeight: 'bold' }}>Total: </Text>
                                <Text>{item.acresFrete}</Text>
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
    );
}

export default AprovCotacao;

const style = StyleSheet.create({
    card: { marginHorizontal: 15, marginVertical: 10, borderTopWidth: 10, borderTopColor: '#005685' },
    button: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 25, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textBlue: { color: '#005685' },
    text: { marginVertical: 3 }
});