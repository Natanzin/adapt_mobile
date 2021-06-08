import React, { useEffect, useState } from 'react'
import { Button, TouchableHighlight, Image, Text, StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { Divider, Title } from 'react-native-paper'
import { useAuth } from '../../contexts/auth'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../routes/app.routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../../services/api'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Loading from '../../components/Loading'
import ButtonMenu from '../../components/buttonMenu'
import colors from '../../styles/colors'

const Dashboard = (props: { navigation: StackNavigationProp<AppParamsList> } & any) => {
    const { signOut, user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [suprimento, setSuprimento] = useState(undefined)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`/adapt/agente_usu_org_perfil/${user?.USU_IN_CODIGO}/org/${user?.ORG_IN_CODIGO}/resource/suprimento:index:index`)
                setSuprimento(data)
                setLoading(false)
            } catch (e) {
                console.log(`Deu ruim na autorização: ${e}`)
                signOut()
            }
        })()
    }, [])


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
                                <FontAwesome5Icon name='cog' size={28} color='#005685' />
                            </TouchableHighlight>
                        </View>
                    </View>
                    {loading ?
                        <Loading />
                        :
                        <>
                            <Text children="Meus Serviços" style={{ textAlign: 'center', fontWeight: 'bold', color: colors.default_azul }} />
                            <ScrollView style={{ flex: 1, width: '100%', borderTopWidth: 0.8, borderTopColor: '#005685' }}>

                                {suprimento &&
                                    <ButtonMenu
                                        route={() => props.navigation.navigate('Suprimentos')}
                                        source={require('../../assets/imagens/Prancheta1.png')}
                                        title='Suprimentos'
                                    />}

                                {/*user?.ORG_IN_CODIGO == '2' &&
                                    <ButtonMenu
                                        route={() => props.navigation.navigate('Reservas')}
                                        source={require('../../assets/imagens/icone-portal-reserva.png')}
                                        title='Reservas'
                                />*/}

                            </ScrollView>
                        </>
                    }
                    <ButtonMenu
                        route={handleSignOut}
                        source={require('../../assets/imagens/icon-logout.png')}
                        title='SAIR DO APP'
                        alert={true}
                    />

                </View>
            </View>
        </SafeAreaView>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, height: 100, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFF', marginVertical: 5, marginHorizontal: 10 },
    imgButton: { width: 100, height: '90%' },
    textButton: { fontSize: 20, fontWeight: 'bold', color: '#000' },
    viewButton: { width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    img: { width: '90%', height: 100 }
})
