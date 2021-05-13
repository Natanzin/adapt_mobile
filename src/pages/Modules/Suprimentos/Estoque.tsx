import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native'
import { Card, Snackbar, Divider } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { LinearGradient } from 'expo-linear-gradient'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'

const Estoque = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const [produtos, setProdutos] = useState(undefined)

    async function listaEstoque() {
        try {
            const { data } = await api.get(`/adapt/estoque_lista/${user?.ORG_IN_CODIGO}/USU/${user?.USU_IN_CODIGO}`)
            setProdutos(data)
        } catch (e) {
            console.log('Deu ruim: ' + e)
            props.navigation.navigate('Suprimentos')
        }
    }

    useEffect(() => {
        listaEstoque()
    })

    return (
        <>
            {produtos === undefined ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                    <ActivityIndicator size={50 || "large"} color="#005685" />
                    <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', color: '#005685' }} />
                </View>
                :
                <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
                    <ScrollView style={{ flex: 1 }}>
                        {produtos?.map(item => (
                            <TouchableHighlight
                                key={item.ITI_IN_CODIGO}
                                underlayColor='transparent'
                                onPress={() => { props.navigation.navigate('MovimentoEstoque', { 'itemId': `${item.ITI_IN_CODIGO}`, 'itemNome': `${item.ITE_ST_DESCRICAO}`, 'itemQtd': `${item.QUANTIDADE}`, 'almoxId': `${item.ALI_IN_CODIGO}` }) }}
                            >
                                <Card style={style.card} >
                                    <Text children={`${item.ITE_ST_DESCRICAO}`} style={style.textTitle} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                    <Divider style={{ backgroundColor: '#005685', marginHorizontal: 8 }} />
                                    <Card.Content>

                                        <View style={style.viewText}>
                                            <Text style={{ fontWeight: 'bold' }}>Almoxarifado: </Text>
                                            <Text>{item.ALM_ST_DESCRICAO}</Text>
                                        </View>

                                        <View style={style.viewText}>
                                            <Text style={{ fontWeight: 'bold' }}>Grupo: </Text>
                                            <Text>{item.GRU_ST_DESCRICAO}</Text>
                                        </View>

                                        <View style={style.viewText}>
                                            <Text style={{ fontWeight: 'bold' }}>Unidade: </Text>
                                            <Text>{item.UNI_CH_SIGLA || ' - '}</Text>
                                        </View>

                                        <View style={style.viewText}>
                                            <Text style={{ fontWeight: 'bold' }}>Quantidade: </Text>
                                            <Text>{item.QUANTIDADE}</Text>
                                        </View>

                                    </Card.Content>
                                </Card>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </View>
            }
        </>
    );
}

export default Estoque;

const style = StyleSheet.create({
    card: { marginHorizontal: 15, marginVertical: 5, borderTopWidth: 10, borderTopColor: '#005685' },
    button: { borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginRight: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textBlue: { color: '#005685' },
    viewText: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    textTitle: { fontWeight: 'bold', fontSize: 17, marginHorizontal: 15 },
    viewModal: { backgroundColor: '#fff', borderRadius: 8, borderTopColor: '#005685', borderTopWidth: 10, marginHorizontal: 15, height: 30 }
});