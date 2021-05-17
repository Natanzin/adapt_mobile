import React, { useEffect, useState } from 'react'
import { TouchableHighlight, StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { Title, Drawer, Provider, Portal, Modal, Divider } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import reservas from './reservas.json'
import meses from './meses.json'
import moment from 'moment';
import api from '../../../services/api'

const Reservas = (props: { navigation: StackNavigationProp<AppParamsList> & any }) => {
    const data = reservas
    const todosMeses = meses
    const mesAtual = moment().format('MM')
    const [dataReservas, setDataReservas] = useState()
    const [active, setActive] = useState(mesAtual)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    async function getReservas(mes: String) {
        try {
            setLoading(true)
            const { data } = await api.get(`/adapt/reservas/mes/${mes}`)
            setDataReservas(data)
            setLoading(false)
        } catch (e) {
            console.log('Deu ruim na listagem das reservas: ' + e)
        }
    }

    function chamaFormulario(){
        props.navigation.navigate('FormReservas')
    }

    //executa assim que a tela é aberta
    useEffect(() => {
        //getReservas(mesAtual)
    }, [])

    return (
        <Provider>
            {loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                    <ActivityIndicator size={50 || "large"} color="#005685" />
                    <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', color: '#005685' }} />
                </View>
                :
                <>
                    <View style={styles.container}>
                        <Title children={`Condomínio: `} />
                        <TouchableHighlight onPress={() => { setVisible(true) }} underlayColor='transparent' >
                            <Title children={`Mês: ${active}`} />
                        </TouchableHighlight>
                        <ScrollView style={styles.scroll}>
                            {data?.map(item => {
                                return (
                                    <View key={item.id} style={styles.cardData}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text children={item.dia + " "} style={styles.textDia} />
                                            <Text children={item.mes} style={{ fontWeight: 'bold' }} />
                                        </View>
                                        {!item.cadastros ?
                                            <View style={styles.cardSemCadastro}>
                                                <Text children={'Nenhum evento cadastrado!'} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                            </View>
                                            :
                                            item.cadastros.map(reserva => (
                                                <View key={reserva.id} style={styles.cardReserva}>
                                                    <Text children={reserva.categoria} />
                                                    <Text children={reserva.responsavel + ' - ' + reserva.apartamento + '_' + reserva.bloco} />
                                                </View>
                                            ))
                                        }
                                    </View>
                                )
                            })}
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
                                            onPress={() => { setActive(`${item.numeroMes}`); setVisible(false); getReservas(item.numeroMes) }}
                                        />
                                    ))}
                                </Drawer.Section>
                            </View>
                        </Modal>
                    </Portal>
                </>}
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