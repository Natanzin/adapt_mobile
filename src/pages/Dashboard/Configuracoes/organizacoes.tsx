import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import { Divider } from 'react-native-paper';
import Loading from '../../../components/Loading';
import CardList from '../../../components/cardList';

const Organizacoes = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const [org, setOrg] = useState<any>(undefined)
    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/adapt/agente_usuario_org/${user?.USU_IN_CODIGO}`)
                setOrg(data)
            } catch (e) {
                console.log(`Deu ruim na listagem das organizações: ${e}`)
            }
        })()
    }, [])
    return (
        org === undefined ?
            <Loading />
            :
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                    {org?.map((item: any) => {
                        return (
                            <CardList key={item.ORG_IN_CODIGO}>
                                <View style={styles.viewText}>
                                    <Text children={'Código:'} style={styles.textTitle} />
                                    <Text children={item.ORG_IN_CODIGO} style={{}} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                </View>
                                <Divider />
                                <View style={styles.viewText}>
                                    <Text children={'Nome:'} style={styles.textTitle} />
                                    <Text children={item.ORG_ST_NOME} style={{ width: Dimensions.get('screen').width * 0.75, textAlign: 'right' }} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                </View>
                                <Divider />
                                <View style={styles.viewText}>
                                    <Text children={'Perfil:'} style={styles.textTitle} />
                                    <Text children={item.PAI_ST_DESCRICAO} style={{}} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                </View>
                                <Divider />
                                <View style={styles.viewText}>
                                    <Text children={'Status:'} style={styles.textTitle} />
                                    <Text children={item.USU_STATUS} style={{}} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                </View>
                            </CardList>
                        )
                    })}
                </View>
            </ScrollView>
    );
}

export default Organizacoes

const styles = StyleSheet.create({
    viewText: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 3, paddingVertical: 2 },
    textTitle: { fontWeight: 'bold' },
})