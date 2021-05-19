import React, { useEffect, useState } from 'react'
import { Button, TouchableHighlight, Image, Text, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { Divider } from 'react-native-paper'
import { useAuth } from '../../contexts/auth'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../routes/app.routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import autorization from './autorization.json'
import api from '../../services/api'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const Dashboard = (props: { navigation: StackNavigationProp<AppParamsList> } & any) => {
    const { signOut, user } = useAuth()
    const autorizations = autorization?.autorization
    const moduleAutorization = autorizations.find(obj => obj.ORG_IN_CODIGO == user?.ORG_IN_CODIGO)
    const [organizacoes, setOrganizacoes] = useState()

    const [permissoes, setPermissoes] = useState(undefined)
    const [suprimento, setSuprimento] = useState(undefined)
    const [rota, setRota] = useState(undefined)
    const [reserva, setReserva] = useState(undefined)

    useEffect(() => {
        (async () => {
            //requisição de todas as permissões
            const { data } = await api.get(`/adapt/agente_usu_org_perfil/${user?.USU_IN_CODIGO}/org/${user?.ORG_IN_CODIGO}/resource/0`)
            //seta todas as permissões em uma variável
            setPermissoes(data)
            setSuprimento(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:index:index')) /** permissão módulo Suprimento */
            //setRota(data.find(obj => obj.OBJ_ST_RESOURCE == 'contrato:rota:index')) /** permissão módulo Rotas */
            //setReserva(data.find(obj => obj.OBJ_ST_RESOURCE == 'contrato:contrato-reserva:index')) /** permissão módulo Reserva */
        })()
        console.log(user)
    }, [permissoes != undefined])


    function handleSignOut() {
        signOut()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '85%', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/logo-login.png')} style={styles.img} resizeMode={'center'} />
                        </View>
                        <View style={{ width: '15%', paddingTop: 5 }}>
                            <TouchableHighlight onPress={() => { props.navigation.navigate('Configuracoes') }} underlayColor='transparent' style={{ alignItems: 'center', justifyContent: 'flex-start' }} >
                                <>
                                    <FontAwesome5Icon name='cog' size={28} color='#005685' />
                                    <Text children='Configurações' numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} style={{ color: '#005685' }} />
                                </>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {permissoes === undefined ?
                        <>
                            <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size={50 || "large"} color="#005685" />
                                <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', color: '#005685' }} />
                            </View>
                        </>
                        : <>
                            <ScrollView style={{ flex: 1, width: '100%', borderTopWidth: 1, borderTopColor: '#005685' }}>
                                {suprimento &&
                                    <TouchableHighlight onPress={() => props.navigation.navigate('Suprimentos')} style={styles.button} underlayColor='#d0d0d0'>
                                        <>
                                            <View style={styles.viewButton}>
                                                <Image source={require('../../assets/imagens/Prancheta1.png')} style={styles.imgButton} resizeMode={'contain'} />
                                            </View>
                                            <View style={styles.viewButton}>
                                                <Text children='Suprimentos' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                            </View>
                                        </>
                                    </TouchableHighlight>
                                }{/*rota &&
                                    <TouchableHighlight onPress={() => props.navigation.navigate('Rotas')} style={styles.button} underlayColor='#d0d0d0'>
                                        <>
                                            <View style={styles.viewButton}>
                                                <Image source={require('../../assets/icon-truck.png')} style={styles.imgButton} resizeMode={'contain'} />
                                            </View>
                                            <View style={styles.viewButton}>
                                                <Text children='Rotas' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                            </View>
                                        </>
                                    </TouchableHighlight>
                                */}

                                {/*<TouchableHighlight onPress={() => props.navigation.navigate('Reservas')} style={styles.button} underlayColor='#d0d0d0'>
                                    <>
                                        <View style={styles.viewButton}>
                                            <Image source={require('../../assets/imagens/icone-portal-reserva.png')} style={styles.imgButton} resizeMode={'contain'} />
                                        </View>
                                        <View style={styles.viewButton}>
                                            <Text children='Reservas' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </>
                            </TouchableHighlight>*/}


                                {/*<TouchableHighlight onPress={() => props.navigation.navigate('Ponto')} style={styles.button} underlayColor='#d0d0d0'>
                                        <>
                                            <View style={styles.viewButton}>
                                                <Image source={require('../../assets/icon-ponto.png')} style={styles.imgButton} resizeMode={'contain'} />
                                            </View>
                                            <View style={styles.viewButton}>
                                                <Text children='Ponto' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                            </View>
                                        </>
                        </TouchableHighlight>*/}

                                {/*<TouchableHighlight onPress={() => props.navigation.navigate('FiscalCondom')} style={styles.button} underlayColor='#d0d0d0'>
                                    <>
                                        <View style={styles.viewButton}>
                                            <Image source={require('../../assets/icon-ponto.png')} style={styles.imgButton} resizeMode={'contain'} />
                                        </View>
                                        <View style={styles.viewButton}>
                                            <Text children='Fiscalizar Condomínio' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </>
                    </TouchableHighlight>*/}

                                <TouchableHighlight onPress={handleSignOut} style={[styles.button, { backgroundColor: 'rgb(251, 180, 47)' }]} underlayColor='#d0d0d0'>
                                    <>
                                        <View style={styles.viewButton}>
                                            <Image source={require('../../assets/imagens/icon-logout.png')} style={styles.imgButton} resizeMode={'contain'} />
                                        </View>
                                        <View style={styles.viewButton}>
                                            <Text children='SAIR DO APP' style={[styles.textButton, { color: '#FFF' }]} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                        </View>
                                    </>
                                </TouchableHighlight>
                            </ScrollView>
                        </>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, height: 100, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFF', marginVertical: 5, marginHorizontal: 10 },
    imgButton: { width: 100, height: '90%' },
    textButton: { fontSize: 20, fontWeight: 'bold' },
    viewButton: { width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    img: { width: '90%', height: 100 }
})