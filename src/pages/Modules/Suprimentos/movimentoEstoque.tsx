import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import { Divider, Snackbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { LinearGradient } from 'expo-linear-gradient'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import moment from 'moment';

const MovimentoEstoque = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const itemId = props?.route?.params?.itemId
    const itemNome = props?.route?.params?.itemNome
    const almox = props?.route?.params?.almoxId
    const quantidade = parseInt(props?.route?.params?.itemQtd)
    const [movimento, setMovimento] = useState<number>(0)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [snackErro, setSnackErro] = useState(false)
    let documento = moment().format('DDMMYYYY')

    useEffect(() => {
        if (movimento < 0) {
            setMovimento(0)
        } else if (movimento > quantidade && quantidade >= 0) {
            setMovimento(quantidade)
            setVisible(true)
        } else if (quantidade < 0){
            setMovimento(0)
            setVisible(true)
        }
    },[movimento])

    async function movimentar() {
        setLoading(true)
        try {
            const { data } = await api.get(`/adapt/baixa_estoque/${user?.ORG_IN_CODIGO}/usu/${user?.USU_IN_CODIGO}/ali/${almox}/iti/${itemId}/qtd/${movimento}/doc/${documento}`)
            console.log(data)
            setLoading(false)
            props.navigation.navigate('Estoque', { 'movimento': 'ok' })
        } catch (e) {
            console.log('Deu ruim: ' + e)
            setLoading(false)
            setSnackErro(true)
        }
    }

    return (
        loading ? <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                <ActivityIndicator size={50 || "large"} color="#005685" />
                <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', color: '#005685' }} />
            </View>
        </> :
            <View style={styles.viewContainer} >
                <View style={styles.viewContent}>
                    <Text children={itemNome} style={styles.textItem} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                    <Divider />
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Text children="Quantidade: " />
                        <Text children={quantidade} style={{ fontWeight: 'bold' }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Text children="Nº do documento: " />
                        <Text children={documento} style={{ fontWeight: 'bold' }} />
                    </View>
                    <View style={styles.viewContador}>
                        <TouchableHighlight style={styles.iconChevron} underlayColor='#006685' onPress={() => { setMovimento(movimento - 1) }} >
                            <FontAwesome5Icon name='chevron-left' size={30} color='#fff' />
                        </TouchableHighlight>
                        <Text children={movimento} style={styles.textCont} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                        <TouchableHighlight style={styles.iconChevron} underlayColor='#006685' onPress={() => { setMovimento(movimento + 1) }} >
                            <FontAwesome5Icon name='chevron-right' size={30} color='#fff' />
                        </TouchableHighlight>
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                        <TouchableHighlight onPress={movimentar} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children='CONFIRMAR' />
                        </TouchableHighlight>
                    </LinearGradient>
                </View>
                <Snackbar
                    visible={visible}
                    onDismiss={() => { setVisible(!visible) }}
                    duration={3500}
                    style={{ backgroundColor: '#005685', borderTopWidth: 8, borderTopColor: '#dd0000' }}
                >
                    Quantidade máxima atingida!
                </Snackbar>
                <Snackbar
                    visible={snackErro}
                    onDismiss={() => { setSnackErro(!snackErro) }}
                    duration={3500}
                    style={{ backgroundColor: '#005685', borderTopWidth: 8, borderTopColor: '#dd0000' }}
                >
                    Desculpe, mas não conseguimos alterar o seu estoque. Tente novamente mais tarde!
                </Snackbar>
            </View>
    );
}

export default MovimentoEstoque;

const styles = StyleSheet.create({
    viewContainer: { flex: 1, justifyContent: 'center', backgroundColor: '#f0f0f0' },
    viewContent: { backgroundColor: '#FFF', marginHorizontal: 15, borderTopColor: '#005685', borderTopWidth: 10, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textItem: { fontSize: 25, fontWeight: 'bold', textAlign: 'center' },
    viewContador: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
    textCont: { fontSize: 40 },
    iconChevron: { paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#005685', borderRadius: 180, marginHorizontal: 15 },
    button: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 25, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    input: { borderWidth: 1, padding: 0, paddingHorizontal: 8 }

})