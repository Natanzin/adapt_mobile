import React, { useEffect } from 'react'
import { Button, TouchableHighlight, Image, Text, StyleSheet, View, ScrollView } from 'react-native'
import { useAuth } from '../../contexts/auth'
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../routes/app.routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import autorization from './autorization.json'

const Dashboard = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { signOut, user } = useAuth()
    const autorizations = autorization?.autorization
    const moduleAutorization = autorizations.find(obj => obj.codEmpresa == user?.codEmpresa)

    function handleSignOut() {
        signOut()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Image source={require('../../assets/logo-login.png')} style={styles.img} resizeMode={'center'} />
                    <ScrollView style={{ flex: 1 }}>
                        {moduleAutorization?.modules.suprimentos &&
                            <TouchableHighlight onPress={() => props.navigation.navigate('Suprimentos')} style={styles.button} underlayColor='#d0d0d0'>
                                <>
                                    <View style={styles.viewButton}>
                                        <Image source={require('../../assets/icon-suprimentos.png')} style={styles.imgButton} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.viewButton}>
                                        <Text children='Suprimentos' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                    </View>
                                </>
                            </TouchableHighlight>
                        }{moduleAutorization?.modules.rotas &&
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
                        }{moduleAutorization?.modules.reservas &&
                            <TouchableHighlight onPress={() => props.navigation.navigate('Reservas')} style={styles.button} underlayColor='#d0d0d0'>
                                <>
                                    <View style={styles.viewButton}>
                                        <Image source={require('../../assets/icon-reserva.png')} style={styles.imgButton} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.viewButton}>
                                        <Text children='Reservas' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                    </View>
                                </>
                            </TouchableHighlight>
                        }{moduleAutorization?.modules.ponto &&
                            <TouchableHighlight onPress={() => props.navigation.navigate('Ponto')} style={styles.button} underlayColor='#d0d0d0'>
                                <>
                                    <View style={styles.viewButton}>
                                        <Image source={require('../../assets/icon-ponto.png')} style={styles.imgButton} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.viewButton}>
                                        <Text children='Ponto' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                    </View>
                                </>
                            </TouchableHighlight>
                        }{moduleAutorization?.modules.fiscalizarCondominio &&
                            <TouchableHighlight onPress={() => props.navigation.navigate('FiscalCondom')} style={styles.button} underlayColor='#d0d0d0'>
                                <>
                                    <View style={styles.viewButton}>
                                        <Image source={require('../../assets/icon-ponto.png')} style={styles.imgButton} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.viewButton}>
                                        <Text children='Fiscalizar Condomínio' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                    </View>
                                </>
                            </TouchableHighlight>
                        }
                        <TouchableHighlight onPress={handleSignOut} style={styles.button} underlayColor='#d0d0d0'>
                            <>
                                <View style={styles.viewButton}>
                                    <Image source={require('../../assets/icon-logout.png')} style={styles.imgButton} resizeMode={'contain'} />
                                </View>
                                <View style={styles.viewButton}>
                                    <Text children='Sair' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                                </View>
                            </>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, height: 100, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFF', marginVertical: 5 },
    imgButton: { width: 100, height: '90%' },
    textButton: { fontSize: 20, fontWeight: 'bold' },
    viewButton: { width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    img: { width: '90%', height: 100 }
})