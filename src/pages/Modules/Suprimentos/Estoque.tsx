import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, TextInput } from 'react-native'
import { Card, Divider } from 'react-native-paper'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import Loading from '../../../components/Loading'

const Estoque = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const [produtos, setProdutos] = useState(undefined)
    const [search, setSearch] = useState('')

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
    }, [])

    async function filtrar() {
        const dadosFiltrados = await produtos?.filter(i => i.ITE_ST_DESCRICAO.includes(search))
        setProdutos(dadosFiltrados)
    }

    return (
        <>
            {!produtos ?
                <Loading />
                :
                <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
                    <View style={style.viewSearch}>
                        <TextInput
                            style={style.inputSearch}
                            value={search}
                            onChangeText={search => setSearch(search)}
                            placeholder='Pesquisar por Nome'
                            placeholderTextColor='#909090'
                            maxLength={40}
                        />
                        <TouchableHighlight onPress={filtrar} underlayColor={'#004584'} style={style.iconSearch}>
                            <FontAwesome5Icon name='search' size={25} color='#FFF' />
                        </TouchableHighlight>
                    </View>
                    {produtos?.length == 0 ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
                            <Text children='Você não possui nenhum ítem em seu estoque!' numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={{ fontSize: 25, color: '#005685', fontWeight: 'bold', textAlign: 'center' }} />
                        </View>
                        :
                        <ScrollView style={{ flex: 1 }}>
                            produtos?.map(item => (
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
                        ))
                    </ScrollView>}
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
    viewModal: { backgroundColor: '#fff', borderRadius: 8, borderTopColor: '#005685', borderTopWidth: 10, marginHorizontal: 15, height: 30 },
    viewSearch: { paddingHorizontal: 8, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.8, borderBottomColor: '#909090' },
    inputSearch: { backgroundColor: '#FFF', color: '#000', flex: 1, paddingHorizontal: 10, marginRight: 3, borderRadius: 5, height: 40, borderWidth: 1, borderColor: '#909090' },
    iconSearch: { backgroundColor: '#005685', paddingHorizontal: 8, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }
});