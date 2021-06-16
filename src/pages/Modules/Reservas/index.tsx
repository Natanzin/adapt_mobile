import React, { Children, useEffect, useState } from 'react'
import { TouchableHighlight, StyleSheet, View, ScrollView, Text } from 'react-native'
import { Drawer, Provider, Portal, Modal, Divider } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import meses from './meses.json'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import Loading from '../../../components/Loading'
import moment from 'moment';
import 'moment/locale/pt-br';
import colors from '../../../styles/colors'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import CardList from '../../../components/cardList'

const Reservas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    //seta a localização brasil na lib moment.js
    moment.locale('pt-br')
    moment.updateLocale('pt-br', null)

    //Busca as informações do usuário
    const { user } = useAuth()

    const mesAtual = moment().format('MM')
    const anoAtual = moment().format('YYYY')
    const descMesAtual = moment().format('MMMM').charAt(0).toUpperCase() + moment().format('MMMM').slice(1)
    const todosMeses = meses
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dataReservas, setDataReservas] = useState(undefined)
    const [calendario, setCalendario] = useState(undefined)
    const [active, setActive] = useState(descMesAtual)
    const teste = '01/06/2021';

    //executa assim que a tela é aberta
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const calendario = await api.get(`/adapt/lista_calendario/${mesAtual}/ano/${anoAtual}`)
                setCalendario(calendario.data)
                const reservas = await api.get(`/adapt/lista_reserva/${user?.ORG_IN_CODIGO}/mes/${mesAtual}/ano/${anoAtual}`)
                setDataReservas(reservas.data)
                setLoading(false)
            } catch (e) {
                console.log('Deu ruim na listagem das reservas: ' + e)
            }
        })()
    }, [])

    async function getReservas(mes: string, ano: string) {
        try {
            setLoading(true)
            const calendario = await api.get(`/adapt/lista_calendario/${mes}/ano/${ano}`)
            setCalendario(calendario.data)
            const reservas = await api.get(`/adapt/lista_reserva/${user?.ORG_IN_CODIGO}/mes/${mes}/ano/${ano}`)
            setDataReservas(reservas.data)
            setLoading(false)
        } catch (e) {
            console.log(`Deu ruim na listagem das reservas de ${active}: ${e}`)
        }

    }

    return (
        loading === true ?
            <Loading />
            :
            <Provider>
                <View style={styles.container}>
                    <TouchableHighlight style={styles.selectMes} onPress={() => { setVisible(true) }} underlayColor='transparent' >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <View style={{ flexDirection: 'row' }}>
                                <Text children={`Mês: `} style={[styles.textSelect, { fontWeight: 'bold' }]} />
                                <Text children={active} style={styles.textSelect} />
                            </View>
                            <FontAwesome5Icon name={!visible ? 'angle-down' : 'angle-up'} size={25} color={colors.default_branco} />
                        </View>
                    </TouchableHighlight>
                    <ScrollView>
                        {calendario?.map(item => (
                            <CardList key={item.DIA}>
                                <View style={{ paddingTop: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text children={item.DIA} style={{ fontSize: 17, fontWeight: 'bold' }} />
                                        <Text children={item.DESCR_DIA} style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 17 }} />
                                    </View>
                                    <Divider />
                                    {dataReservas?.map(res => {
                                        if (item.DATA == res.CARI_DT_DATA) {
                                            return (
                                                <View key={res.CARI_IN_CODIGO} style={styles.itemReserva}>
                                                    <Text children={res.ESPH_ST_DESCRICAO} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                                    <Text children={res.AGN_ST_NOME} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                                </View>
                                            )
                                        }
                                    })}
                                </View>
                            </CardList>
                        ))}
                    </ScrollView>
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={() => { setVisible(false) }}>
                        <View style={styles.cardModal}>
                            <Text children={'Selecione o mês!'} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={styles.textDia} />
                            <Divider />
                            <Drawer.Section>
                                {todosMeses.map(item => (
                                    <View key={item.id} style={styles.viewItemSelect} >
                                        <FontAwesome5Icon name='angle-right' size={14} color={colors.default_azul} />
                                        <Drawer.Item
                                            label={item.nomeMes}
                                            active={active == `${item.nomeMes}`}
                                            onPress={() => { setActive(`${item.nomeMes}`); setVisible(false); getReservas(item.numeroMes, anoAtual) }}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
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
    cardModal: { backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 8, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8 },
    selectMes: { backgroundColor: colors.default_azul_claro, marginHorizontal: 5, marginVertical: 3, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3 },
    textSelect: { color: colors.default_branco, fontSize: 20 },
    textDia: { fontWeight: 'bold', fontSize: 20, textAlign: 'center' },
    viewItemSelect: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10 },

    itemReserva: { borderWidth: 1, borderRadius: 2, backgroundColor: colors.default_laranja, marginVertical: 1, borderColor: colors.default_laranja_claro, paddingHorizontal: 5 }
})