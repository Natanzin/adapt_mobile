import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, TextInput, Keyboard } from 'react-native'
import { Divider, Drawer } from 'react-native-paper'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import Loading from '../../../components/Loading'
import CardList from '../../../components/cardList'
import colors from '../../../styles/colors'
import _ from 'underscore'

const Estoque = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [produtos, setProdutos] = useState(undefined)
    const [baseProdutos, setBaseProdutos] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [almox, setAlmox] = useState(undefined)
    const [almoxAtivo, setAlmoxAtivo] = useState('Todos os Almoxarifados')
    const [visible, setVisible] = useState(false)

    // FUNÇÃO EXECULTADA ASSIM QUE A TELA É ABERTA
    async function listaEstoque() {
        try {
            Keyboard.dismiss()
            setLoading(true)
            //REALIZA REQUISIÇÃO DOS ITENS DO ALMOXARIFADO
            const produtos = await api.get(`/adapt/estoque_lista/${user?.ORG_IN_CODIGO}/USU/${user?.USU_IN_CODIGO}`)
            setBaseProdutos(produtos.data)
            setProdutos(produtos.data)
            //REALIZA REQUISIÇÃO DOS ALMOXARIFADOS 
            const almoxarifados = await api.get(`/adapt/lista_almoxarifado_usu/${user?.ORG_IN_CODIGO}/usu/${user?.USU_IN_CODIGO}`)
            setAlmox(almoxarifados.data)
            setLoading(false)
        } catch (e) {
            console.log('Deu ruim: ' + e)
            props.navigation.navigate('Suprimentos')
        }
    }

    //FUNÇÃO QUE REALIZA SOMENTE A REQUISIÇÃO DOS ITENS 
    //UTILIZADA QUANDO O FILTRO É LIMPO OU QUANDO O USUÁRIO SELECIONA TODOS OS ALMOXARIFADOS
    async function relistaEstoque() {
        try {
            setLoading(true)
            const produtos = await api.get(`/adapt/estoque_lista/${user?.ORG_IN_CODIGO}/USU/${user?.USU_IN_CODIGO}`)
            setBaseProdutos(produtos.data)
            setProdutos(produtos.data)
            setLoading(false)
        } catch (e) {
            console.log(`Deu ruim na relistagem: ${e}`)
            props.navigation.navigate('Suprimentos')
        }

    }

    //FUNÇÃO QUE REALIZA O FILTRO DOS ITENS 
    async function filtrar() {
        Keyboard.dismiss()
        setLoading(true)
        const dadosFiltrados = await baseProdutos?.filter(i => i.ITE_ST_DESCRICAO.includes(search.normalize('NFD').replace(/[^a-zA-Zs]/g, "")))
        setProdutos(dadosFiltrados)
        setLoading(false)
    }

    //FUNÇÃO QUE SETA OS PRODUTOS DE UM ALMOXARIFADO ESPECÍFICO
    async function setaAlmoxarifado(almoxarifadoItem: string) {
        setLoading(true)
        const produtos = await api.get(`/adapt/estoque_lista/${user?.ORG_IN_CODIGO}/USU/${user?.USU_IN_CODIGO}`)
        const produtosAlmox = produtos.data?.filter(i => i.ALM_ST_DESCRICAO == almoxarifadoItem)
        setBaseProdutos(produtosAlmox)
        setProdutos(produtosAlmox)
        setLoading(false)
    }

    //EXECUTA A FUNÇÃO listaEstoque ASSIM QUE A TELA É INICIADA
    useEffect(() => {
        listaEstoque()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
            <View style={style.viewSearch}>
                <TouchableHighlight onPress={() => { relistaEstoque(); setAlmoxAtivo('Todos os Almoxarifados'); setSearch('') }} underlayColor={'#004584'} style={style.iconSearch}>
                    <FontAwesome5Icon name='trash' size={25} color='#FFF' />
                </TouchableHighlight>
                <TextInput
                    autoCapitalize="characters"
                    style={style.inputSearch}
                    value={search}
                    onChangeText={search => setSearch(search)}
                    placeholder='Pesquisar por Nome'
                    placeholderTextColor='#909090'
                    maxLength={40}
                />
                <TouchableHighlight onPress={filtrar} underlayColor={colors.default_azul_claro} style={style.iconSearch}>
                    <FontAwesome5Icon name='search' size={25} color={colors.default_branco} />
                </TouchableHighlight>
            </View>

            {/** LOADING -> RESPONSÁVEL POR MOSTRAR A TELA DE CARREGAMENTO ENQUANDO UMA REQUISIÇÃO É FEITA */}
            {loading ?
                <Loading />
                :
                //SE O RETORNO DOS PRODUTOS FOR VAZIO, ELE RETORNA UMA MENSAGEM INFORMANDO A AUSENCIA DE ITENS NO ESTOQUE
                produtos?.length == 0 ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
                        <Text children='Você não possui nenhum ítem em seu estoque!' numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={{ fontSize: 25, color: '#005685', fontWeight: 'bold', textAlign: 'center' }} />
                    </View>
                    :
                    //SENÃO ELE MOSTRA TODOS OS ITENS RETORNADOS EM CARDS UNITÁRIOS
                    <>
                        <ScrollView style={{ flex: 1 }}>
                            {produtos?.map(item => (
                                <TouchableHighlight
                                    key={item.CHAVE_UNICA_JS}
                                    underlayColor='transparent'
                                    onPress={() => { props.navigation.navigate('MovimentoEstoque', { 'itemId': `${item.ITI_IN_CODIGO}`, 'itemNome': `${item.ITE_ST_DESCRICAO}`, 'itemQtd': `${item.QUANTIDADE}`, 'almoxId': `${item.ALI_IN_CODIGO}` }) }}
                                >
                                    <CardList>
                                        <Text children={`${item.ITE_ST_DESCRICAO}`} style={style.textTitle} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        <Divider />
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
                                    </CardList>
                                </TouchableHighlight>
                            ))}
                        </ScrollView>
                    </>
            }
            {/** SE O USUÁRIO TIVER ACESSO A MAIS DE UM ALMOXARIFADO, O CAMPO DE SELEÇÃO DE ALMOXARIFADO APARECE PARA ELE */}
            {almox?.length > 1 && <View>
                <View style={style.viewAlmox}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text children='Almoxarifado: ' style={{ fontWeight: 'bold' }} />
                        <Text children={almoxAtivo} />
                    </View>

                    <TouchableHighlight onPress={() => { setVisible(!visible) }} underlayColor={'#004584'} style={style.iconSearch}>
                        <FontAwesome5Icon name={visible ? 'angle-down' : 'angle-up'} size={25} color='#FFF' />
                    </TouchableHighlight>
                </View>
                {visible && <View style={{ borderTopWidth: 0.7, borderTopColor: colors.default_azul }}>
                    <Drawer.Section>
                        <ScrollView>
                            <Drawer.Item
                                label={'Todos os Almoxarifados'}
                                active={almoxAtivo == 'Todos os Almoxarifados'}
                                onPress={() => { setAlmoxAtivo('Todos os Almoxarifados'); relistaEstoque(); setVisible(false) }}
                            />
                            {almox?.map(item => (
                                <Drawer.Item
                                    key={item.ALI_IN_CODIGO}
                                    label={item.ALMOXARIFADOS}
                                    active={almoxAtivo == item.ALMOXARIFADOS}
                                    onPress={() => { setAlmoxAtivo(item.ALMOXARIFADOS); setaAlmoxarifado(item.ALMOXARIFADOS); setVisible(false) }}
                                />
                            ))}
                        </ScrollView>
                    </Drawer.Section>
                </View>}
            </View>}
        </View>
    );
}

export default Estoque;

const style = StyleSheet.create({
    card: { marginHorizontal: 15, marginVertical: 5, borderTopWidth: 10, borderTopColor: '#005685' },
    button: { borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginRight: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textBlue: { color: '#005685' },
    viewText: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    textTitle: { fontWeight: 'bold', fontSize: 17 },
    viewModal: { backgroundColor: '#fff', borderRadius: 8, borderTopColor: '#005685', borderTopWidth: 10, marginHorizontal: 15, height: 30 },
    viewSearch: { paddingHorizontal: 8, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.8, borderBottomColor: '#909090' },
    viewAlmox: { paddingHorizontal: 8, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.8, borderTopColor: '#909090', justifyContent: 'space-between' },
    inputSearch: { backgroundColor: '#FFF', color: '#000', flex: 1, paddingHorizontal: 10, marginHorizontal: 3, borderRadius: 5, height: 40, borderWidth: 1, borderColor: '#909090' },
    iconSearch: { backgroundColor: '#005685', height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }
});