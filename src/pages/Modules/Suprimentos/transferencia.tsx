import React, { useEffect, useState } from 'react'
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator, Divider } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import CardList from '../../../components/cardList'
import colors from '../../../styles/colors'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import Loading from '../../../components/Loading'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'



const Transferencia = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const [transferencias, setTransferencias] = useState<any>(null)
    const [itensTransferencias, setItensTransferencias] = useState<any>(null)
    const [visibleItem, setVisibleItem] = useState<boolean>(false)

    interface transferenciaType {
        EST_IN_CODIGO: string
        EST_ST_NUMDOC: string
        EST_EMISSAO: string
        EST_MOVIMENTO: string
        EST_ST_OBSERVACAO: string
        ALM_ST_DESCRICAO: string
    }

    interface itiTransfType {
        EST_IN_CODIGO: string
        ITI_IN_CODIGO: string
        ESI_RE_QUANTIDADE: string
        ESI_RE_VLUNITARIO: string
        ESI_RE_VLTOTAL: string
        PRO_IN_CODIGO: string
        PRO_ST_DESCRICAO: string
        APL_ST_EXTENSO: string
        APL_ST_DESCRICAO: string
        ESI_CCI_IN_CODIGO: string
        D_ALI_IN_CODIGO: string
        ALM_ST_DESCRICAO: string
        ITE_IN_CODIGO: string
        ITE_ST_DESCRICAO: string
        ESI_IN_CODIGO_ORIGEM: string
        INT_IN_CODIGO: string
        EST_DT_MOVIMENTO: string
        EST_ST_TIPO: string
        ORG_IN_CODIGO: string
        UNI_ST_DESCRICAO: string

    }

    async function getTransferencia() {
        try {
            const transf = await api.get(`/adapt/lista_transferencias/${user?.USU_IN_CODIGO}/org/${user?.ORG_IN_CODIGO}`)
            setTransferencias(transf.data)
            const itensTransf = await api.get(`/adapt/lista_itens_transferencia/${user?.ORG_IN_CODIGO}`)
            setItensTransferencias(itensTransf.data)
        } catch (e) {
            console.log(`Deu ruim na listagem das transferências: ${e}`)
        }
    }

    useEffect(() => {
        getTransferencia()
        console.log(user)
    }, [])

    async function realizaTransferencia(cod: string) {
        try {
            const { data } = await api.get(`adapt/recebe_transferencia/${cod}`)
            getTransferencia()
        } catch (e) {
            console.log(`Deu ruim na transferência de material: ${e}`)
        }
    }

    //COMPONENTE DO BOTÃO COM ICONE
    type ButtonItem = {
        text: String
        onPress: any
    }
    const ButtonItem = (props: ButtonItem) => {
        return (
            <TouchableOpacity onPress={props.onPress} style={styles.viewButton}>
                <Image source={require('../../../assets/imagens/Prancheta6.png')} style={styles.imgButton} resizeMode={'contain'} />
                <Text children={props.text} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={styles.textButton} />
            </TouchableOpacity>
        )
    }

    //COMPONENTE DE TEXTO DO CARD
    type textItemType = {
        textTitle: String
        textInfo: String
    }
    const TextItem = (props: textItemType) => {
        return (
            <View style={{ flexDirection: 'row', marginVertical: 2 }}>
                <View style={{ width: '45%', alignItems: 'flex-start', paddingLeft: 3 }}>
                    <Text children={props.textTitle} style={{ fontWeight: 'bold', fontSize: 15, textTransform: 'capitalize' }} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                </View>
                <View style={{ width: '55%', alignItems: 'flex-end', paddingRight: 3 }}>
                    <Text children={props.textInfo} style={{ fontSize: 15, textTransform: 'capitalize' }} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                </View>
            </View>
        )
    }

    //RENDERIZA A TELA
    return (
        transferencias == null ?
            <Loading />
            :
            <ScrollView>
                {transferencias?.map((item: transferenciaType) => (
                    <CardList key={item.EST_IN_CODIGO}>
                        <View>
                            <TextItem
                                textTitle={'Cód. Transferência:'}
                                textInfo={item.EST_IN_CODIGO}
                            />
                            <Divider />
                            <TextItem
                                textTitle={'Almoxarifado:'}
                                textInfo={item.ALM_ST_DESCRICAO}
                            />
                            <Divider />
                            <TextItem
                                textTitle={'Data de emissão:'}
                                textInfo={item.EST_EMISSAO}
                            />
                            <Divider />
                            {item.EST_ST_OBSERVACAO &&
                                <>
                                    <TextItem
                                        textTitle={'Observação:'}
                                        textInfo={item.EST_ST_OBSERVACAO}
                                    />
                                    <Divider />
                                </>
                            }
                        </View>
                        <TouchableOpacity
                            onPress={() => setVisibleItem(!visibleItem)}
                            style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderRadius: 2, borderColor: colors.default_cinza, paddingVertical: 5, paddingHorizontal: 3, backgroundColor: colors.default_background }}
                        >
                            <Text children={'Itens da Transferência'} style={{ fontSize: 18, fontWeight: 'bold' }} />
                            {!itensTransferencias ?
                                <ActivityIndicator color={colors.default_azul} size={18} />
                                :
                                <FontAwesome5Icon name={!visibleItem ? 'chevron-down' : 'chevron-up'} color={colors.default_azul} size={18} />
                            }
                        </TouchableOpacity>
                        {visibleItem &&
                            itensTransferencias?.map((iti: itiTransfType) => {
                                if (item.EST_IN_CODIGO == iti.EST_IN_CODIGO) {
                                    return (
                                        <View key={iti.EST_IN_CODIGO} style={{ borderWidth: 0.6, borderRadius: 2, borderColor: colors.default_cinza_claro, marginVertical: 0.5 }}>
                                            <TextItem
                                                textTitle={'Cod. - Item:'}
                                                textInfo={iti.ITE_IN_CODIGO + ' - ' + iti.ITE_ST_DESCRICAO}
                                            />
                                            <Divider />
                                            <TextItem
                                                textTitle={'Quantidade:'}
                                                textInfo={iti.ESI_RE_QUANTIDADE + ' ' + iti.UNI_ST_DESCRICAO}
                                            />
                                            <Divider />
                                        </View>
                                    )
                                }
                            })
                        }
                        <View style={{ marginTop: 8 }}>
                            <ButtonItem
                                text='Receber Material'
                                onPress={() => realizaTransferencia(item.EST_IN_CODIGO)}
                            />
                        </View>
                    </CardList>
                ))}
            </ScrollView>

    );
}

export default Transferencia;

const styles = StyleSheet.create({
    imgButton: { width: 35, height: 35 },
    viewButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.default_branco, paddingVertical: 6, marginHorizontal: 5, marginVertical: 3, borderWidth: 1, borderColor: colors.default_azul, borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { fontWeight: 'bold', fontSize: 18 },
    textItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
})