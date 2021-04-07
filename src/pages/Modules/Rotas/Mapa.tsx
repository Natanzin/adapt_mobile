import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, ActivityIndicator, Text, TouchableHighlight } from 'react-native'
import { Divider, Title } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import config from '../../../config/config.json'
import { locales } from './rotas.json'
import MapViewDirections from 'react-native-maps-directions'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

//tipos dos dados requisitados do GPS do celular
interface currentRegionData {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}

const Mapa = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const mapEl = useRef(null)
    const [currentRegion, setCurrentRegion] = useState<currentRegionData | null>(null)
    const [destination, setDestination] = useState<currentRegionData | null>(null)
    const [distance, setDistance] = useState<number | null>(null)
    const [visible, setVisible] = useState<boolean>(true)
    const [selected, setSelected] = useState<number | null>(null)

    //retorna apenas o objeto de um local
    const locale = locales.filter(function (obj) { return obj.id === selected })


    useEffect(() => {
        (async () => {
            let { granted } = await requestPermissionsAsync()
            if (granted) {
                let myLocation = await getCurrentPositionAsync({})
                const { latitude, longitude } = myLocation?.coords
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        })()
    }, [])

    useEffect(() => {
        if (props?.route?.params) {
            setDestination({
                latitude: props?.route?.params?.latitude,
                longitude: props?.route?.params?.longitude,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
            })
        }
    }, [props?.route?.params])

    return (
        <>
            {!currentRegion ?
                <>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color='#005685' />
                    </View>
                </>
                :
                <>
                    <MapView initialRegion={currentRegion} style={style.mapa} showsUserLocation={true} ref={mapEl}>
                        {locales.map(item => {
                            return (
                                <Marker key={item.id} coordinate={{ latitude: item.geometry.latitude, longitude: item.geometry.longitude }} onPress={() => {
                                    setDestination({
                                        latitude: item.geometry.latitude,
                                        longitude: item.geometry.longitude,
                                        latitudeDelta: 0.04,
                                        longitudeDelta: 0.04
                                    })
                                    setVisible(true)
                                    setSelected(item.id)
                                }} ></Marker>
                            )
                        })}
                        {destination &&
                            <>
                                <MapViewDirections
                                    origin={currentRegion}
                                    destination={destination}
                                    apikey={config.google.DirectionsProd}
                                    strokeWidth={4}
                                    strokeColor='#005685'
                                    onReady={result => {
                                        setDistance(result.distance)
                                        mapEl.current.fitToCoordinates(
                                            result.coordenates, {
                                            edgePadding: {
                                                top: 50,
                                                bottom: 50,
                                                left: 50,
                                                right: 50
                                            }
                                        }
                                        )
                                    }}
                                />
                            </>
                        }
                    </MapView>
                    {visible &&
                        locale.map(item => {
                            return (
                                <View key={item.id} style={style.viewModal}>
                                    <ScrollView style={{ flex: 1 }}>
                                        <View style={style.viewCallout}>
                                            <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                                                <View style={{ width: '85%' }}>
                                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginVertical: 3 }}>{item.nome}</Text>
                                                </View>
                                                <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <TouchableHighlight onPress={() => setVisible(false)}>
                                                        <FontAwesome5Icon name='chevron-down' color='#005685' size={30} />
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                            <Divider />
                                            <View style={style.textCallout}>
                                                <Text style={style.textBolder}>Endereço:</Text>
                                                <Text>{item.endereço}</Text>
                                            </View>
                                            <View style={style.textCallout}>
                                                <Text style={style.textBolder}>Responsável:</Text>
                                                <Text>{item.responsavel}</Text>
                                            </View>
                                            <View style={style.textCallout}>
                                                <Text style={style.textBolder}>Próxima coleta:</Text>
                                                <Text>{item.proximaColeta}</Text>
                                            </View>
                                            <View style={style.textCallout}>
                                                <Text style={style.textBolder}>Distância:</Text>
                                                <Text>{distance} metros</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', marginTop: 8 }}>
                                            <LinearGradient colors={['#45BBEB', '#005685']} style={style.button} >
                                                <TouchableHighlight onPress={() => { props.navigation.navigate('DetalheMapa', { "id": item.id }) }} underlayColor='#45BBEB' style={{ borderRadius: 5 }}>
                                                    <Title children={'Ver Detalhes'} style={style.textButton} />
                                                </TouchableHighlight>
                                            </LinearGradient>
                                        </View>
                                    </ScrollView>
                                </View>
                            )
                        })
                    }

                </>
            }
        </>
    )
}

export default Mapa;

const style = StyleSheet.create({
    mapa: { flex: 2.2 },
    textCallout: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 2 },
    viewCallout: { width: '100%', backgroundColor: '#fff', borderTopWidth: 8, borderTopColor: '#005685', borderRadius: 8 },
    viewModal: { flex: 1, backgroundColor: '#fff', width: '100%' },
    textBolder: { fontWeight: 'bold' },
    button: { backgroundColor: '#005685', borderWidth: 1, marginTop: 10, borderColor: '#005685', borderRadius: 5, width: '75%', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 25 },

})