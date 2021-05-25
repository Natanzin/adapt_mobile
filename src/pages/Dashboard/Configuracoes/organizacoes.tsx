import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'
import { Divider } from 'react-native-paper';
import Loading from '../../../components/Loading';

const Organizacoes = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { user } = useAuth()
    const [org, setOrg] = useState(undefined)
    useEffect(() => {
        (async () => {
            const { data } = await api.get(`/adapt/agente_usuario_org/${user?.USU_IN_CODIGO}`)
            setOrg(data)
            //console.log(data)
        })()
    }, [])
    return (
        org === undefined ?
            <Loading />
            :
            <>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                        {org?.map(item => {
                            return (
                                <View key={item.ORG_IN_CODIGO} style={styles.viewItem}>
                                    <View style={styles.viewText}>
                                        <View style={[styles.viewTextItem, styles.itemLeft]}>
                                            <Text children='Código:' style={styles.textTitle} />
                                        </View>
                                        <View style={[styles.viewTextItem, styles.itemRight]}>
                                            <Text children={`${item.ORG_IN_CODIGO}`} style={styles.text} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewText}>
                                        <View style={[styles.viewTextItem, styles.itemLeft]}>
                                            <Text children='Nome:' style={styles.textTitle} />
                                        </View>
                                        <View style={[styles.viewTextItem, styles.itemRight]}>
                                            <Text children={`${item.ORG_ST_NOME}`} style={styles.text} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewText}>
                                        <View style={[styles.viewTextItem, styles.itemLeft]}>
                                            <Text children='Perfil:' style={styles.textTitle} />
                                        </View>
                                        <View style={[styles.viewTextItem, styles.itemRight]}>
                                            <Text children={`${item.PAI_ST_DESCRICAO}`} style={styles.text} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </View>
                                    <Divider />
                                    <View style={styles.viewText}>
                                        <View style={[styles.viewTextItem, styles.itemLeft]}>
                                            <Text children='Status:' style={styles.textTitle} />
                                        </View>
                                        <View style={[styles.viewTextItem, styles.itemRight]}>
                                            <Text children={`${item.USU_STATUS}`} style={styles.text} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </>
    );
}

export default Organizacoes

const styles = StyleSheet.create({
    viewItem: { width: '90%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#005685', borderTopWidth: 10, marginVertical: 10, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5 },
    viewText: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' },
    textTitle: { fontWeight: 'bold', marginRight: 10 },
    text: { textAlign: 'right' },
    viewTextItem: { height: '100%' },
    itemLeft: { width: '20%' },
    itemRight: { width: '80%' }
})