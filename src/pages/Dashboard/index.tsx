import React from 'react'
import { Button, TouchableHighlight, Image, Text, StyleSheet, View } from 'react-native'
import { useAuth } from '../../contexts/auth'
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../routes/app.routes'
import * as StoreReview from 'expo-store-review';

const Dashboard = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const { signOut, user } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return (
        <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1, justifyContent: 'space-around' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
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
                <TouchableHighlight onPress={() => props.navigation.navigate('Ponto')} style={styles.button} underlayColor='#d0d0d0'>
                    <>
                    <View style={styles.viewButton}>
                        <Image source={require('../../assets/icon-truck.png')} style={styles.imgButton} resizeMode={'contain'} />
                    </View>
                    <View style={styles.viewButton}>
                        <Text children='Ponto' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                    </View>
                    </>
                </TouchableHighlight>
                <TouchableHighlight onPress={handleSignOut} style={styles.button} underlayColor='#d0d0d0'>
                    <>
                    <View style={styles.viewButton}>
                        <Image source={require('../../assets/icon-truck.png')} style={styles.imgButton} resizeMode={'contain'} />
                    </View>
                    <View style={styles.viewButton}>
                        <Text children='Sair' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                    </View>
                    </>
                </TouchableHighlight>
            </View>
        </LinearGradient>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, width: '90%', height: 100, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#FFF' },
    imgButton: { width: 100, height: '90%' },
    textButton: { fontSize: 20, fontWeight: 'bold' },
    viewButton: { width: '45%', height: '100%', justifyContent: 'center', alignItems: 'center' }
})