import React, { useEffect, useState } from 'react'
import { TouchableHighlight, StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { Title, Drawer, Provider, Portal, Modal, Divider } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import meses from './meses.json'
import moment from 'moment';
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import Loading from '../../../components/Loading'

const Reservas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const todosMeses = meses
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [dataReservas, setDataReservas] = useState(undefined)
    const mesAtual = moment().format('MM')
    const descMesAtual = moment().format('MMMM')
    const anoAtual = moment().format('YYYY')
    const [active, setActive] = useState(mesAtual)

    //TODO - executar essa função quando for solicitado pelo usuário alterar o mês do calendário.
    async function getReservas(mes: string, ano: string) {
        try {
            //inicia o loading do tela enquanto a requisição é feita
            setLoading(true)
            //realiza a requisição na API das reservas
            const { data } = await api.get(`/adapt/lista_reserva/${user?.ORG_IN_CODIGO}/mes/${mes}/ano/${ano}`)
            //seta o resultado da requisição na variável dataReservas
            setDataReservas(data)
        } catch (e) {
            console.log('Deu ruim na listagem das reservas: ' + e)
        }
        //finaliza o loading da tela após o resultado da requisição
        setLoading(false)
    }

    //executa assim que a tela é aberta
    useEffect(() => {
        (async () => {
            try {
                //inicia o loading do tela enquanto a requisição é feita
                setLoading(true)
                //realiza a requisição na API das reservas
                const { data } = await api.get(`/adapt/lista_reserva/${user?.ORG_IN_CODIGO}/mes/${mesAtual}/ano/${anoAtual}`)
                setDataReservas(data)
                //seta o resultado da requisição na variável dataReservas
                console.log(dataReservas)
            } catch (e) {
                console.log('Deu ruim na listagem das reservas: ' + e)
            }
            //finaliza o loading da tela após o resultado da requisição
            setLoading(false)
        })()
    }, [])

    //TODO - chama o formulário para a realização da reserva
    function chamaFormulario() {
        props.navigation.navigate('FormReservas')
    }

    return (
        loading === true ?
            <Loading />
            :
            <Provider>
                <View style={styles.container}>
                    <TouchableHighlight onPress={() => { setVisible(true) }} underlayColor='transparent' >
                        <Title children={`Mês: ${descMesAtual}`} />
                    </TouchableHighlight>
                    <ScrollView style={styles.scroll}>
                        {/** TODO - fazer um .map retornar todas as reservas e suas respectivas datas! */}
                    </ScrollView>
                    <View>
                        <TouchableHighlight onPress={chamaFormulario} underlayColor='#45bbeb' style={styles.button} >
                            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children='Cadastrar novo evento!' />
                        </TouchableHighlight>
                    </View>
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={() => { setVisible(false) }}>
                        <View style={styles.cardModal}>
                            <Text children={'Escolha o mês que deseja visualizar!'} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={styles.textDia} />
                            <Divider />
                            <Drawer.Section>
                                {todosMeses.map(item => (
                                    <Drawer.Item
                                        key={item.id}
                                        label={item.numeroMes + " - " + item.nomeMes}
                                        active={active === `${item.numeroMes}`}
                                        onPress={() => { setActive(`${item.numeroMes}`); setVisible(false); }}
                                    />
                                ))}
                            </Drawer.Section>
                        </View>
                    </Modal>
                </Portal>
            </Provider>
    )
}

export default Reservas;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    scroll: { paddingVertical: 8, paddingHorizontal: 10 },
    textDia: { fontWeight: 'bold', fontSize: 25 },
    cardData: { width: '100%', borderWidth: 2, borderColor: '#005685', marginBottom: 12, borderRadius: 5, backgroundColor: 'rgb(251, 180, 47)' },
    cardReserva: { backgroundColor: '#fff', marginHorizontal: 8, marginVertical: 1.5, borderColor: '#005685', borderWidth: 1, borderRadius: 3, paddingHorizontal: 5 },
    cardSemCadastro: { alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
    button: { borderWidth: 2, borderColor: '#000', borderRadius: 5, marginHorizontal: 10, marginVertical: 2, backgroundColor: '#005685', alignItems: 'center', justifyContent: 'center', paddingVertical: 5, },
    cardModal: { backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 8, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8 }
})