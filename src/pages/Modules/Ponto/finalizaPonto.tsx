import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Button, Linking } from 'react-native';
import { Divider, Modal, Title } from 'react-native-paper'
import moment from 'moment';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import empresas from './empresas.json'

//tipagem dos dados requisitados do GPS do celular
interface currentRegionData {
    latitude: number
    longitude: number
}

const FinalizaPonto = (props: any) => {
    const foto = props?.route?.params?.foto
    const usuario = JSON.parse(props?.route?.params?.usuario)
    const [location, setLocation] = useState<currentRegionData | null>(null)
    //recebe a hora atual do celular do usuario
    const [hora, setHora] = useState<string | null>(null)
    //recebe a data atual do celular do usuario
    const [data, setData] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)
    //recebe a lista com todas as empresas que utilizam desse módulo
    const [listEmpresas, setListEmpresas] = useState<String | number | any>(empresas?.empresas)

    //retorna a empresa que o usuario trabalha
    const empresa = listEmpresas.find((obj) => obj?.codEmpresa === usuario?.codEmpresa)
    //retorna a localização da empresa
    const latitudeEmpresa = parseFloat(empresa?.geometry.latitude.replace(',', '.'))
    const longitudeEmpresa = parseFloat(empresa?.geometry.longitude.replace(',', '.'))
    //retorna o setor da empresa que o usuario trabalha
    const setor = empresa?.setores.find((obj) => obj?.codSetor === usuario?.codSetor)
    //retorna a função do setor da empresa que o funcionário trabalha
    const funcao = setor?.funcoes.find((obj) => obj?.codFuncao === usuario?.codFuncao)

    //Pegas as coordenadas atual do usuario, data e hora
    useEffect(() => {
        (async () => {
            //pergunta se o usuário permite que o app use a localização do celular
            let { granted } = await requestPermissionsAsync()
            //se o usuário permitir, ele capta as informações do GPS
            if (granted) {
                let myLocation = await getCurrentPositionAsync({})
                const { latitude, longitude } = myLocation?.coords
                setLocation({
                    latitude,
                    longitude
                })
            }
            moment.locale('pt-br')
            //seta a hora atual do sistema na variável hora
            setHora(moment().format('LT'))
            //seta a data atual do sistema na variável data
            setData(moment().format('DD/MM/YYYY'))
        })()
    }, [])

    var getDistance = {
        lat1: latitudeEmpresa,
        lng1: longitudeEmpresa,
        lat2: location?.latitude,
        lng2: location?.longitude
    }

    const [distance, setDistance] = useState(0)

    useEffect(() => {
        var R = 6371
        var dlat = (getDistance?.lat2 - getDistance?.lat1) * (Math.PI / 180),
            dlng = (getDistance?.lng2 - getDistance?.lng1) * (Math.PI / 180),
            a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
                Math.cos(getDistance?.lat1 * (Math.PI / 180)) *
                Math.cos(getDistance?.lat1 * (Math.PI / 180)) *
                Math.sin(dlng / 2) * Math.sin(dlng / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        setDistance((R * c * 1000))
        console.log(distance)
    })

    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} children='Informações para folha de ponto!' />
                <Image source={{ uri: foto }} style={styles.photo} resizeMode='center' />
            </View>
            <Divider />
            <View style={{ alignItems: 'center' }}>
                <Text
                    children={'Confirme suas informações!'}
                    numberOfLines={1}
                    ellipsizeMode={'clip'}
                    adjustsFontSizeToFit={true}
                    style={styles.title}
                />
            </View>
            <Divider />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingBottom: 12, paddingHorizontal: 10 }}>
                        <View style={styles.viewText}>
                            <Text children={'Usuário:'} style={{ fontWeight: 'bold' }} />
                            <Text children={usuario?.idUsuario + ' - ' + usuario?.nome} />
                        </View>
                        <View style={styles.viewText}>
                            <Text children={'Empresa:'} style={{ fontWeight: 'bold' }} />
                            <Text children={empresa?.nomeEmpresa} />
                        </View>
                        <View style={styles.viewText}>
                            <Text children={'Setor/Função:'} style={{ fontWeight: 'bold' }} />
                            <Text children={setor?.nomeSetor + '/' + funcao?.nomeFuncao} />
                        </View>
                        <View style={styles.viewText}>
                            <Text children={'Hora do ponto:'} style={{ fontWeight: 'bold' }} />
                            <Text children={hora} />
                        </View>
                        <View style={styles.viewText}>
                            <Text children={'Data do ponto:'} style={{ fontWeight: 'bold' }} />
                            <Text children={data} />
                        </View>
                        <Divider />
                        <View>
                            <Title children={'Localização'} />
                            <View style={styles.viewText}>
                                <Text children={'Endereço:'} style={{ fontWeight: 'bold' }} />
                                <Text children={empresa?.endereco} />
                            </View>
                            <View style={styles.viewText}>
                                <Text children={'Distância permitida:'} style={{ fontWeight: 'bold' }} />
                                <Text children={empresa?.raioPonto + ' metros'} />
                            </View>
                            <View style={styles.viewText}>
                                <Text children={'Distância atual:'} style={{ fontWeight: 'bold' }} />
                                <Text children={distance.toFixed(1) + ' metros'} />
                            </View>
                        </View>
                        <Divider />
                        <View>
                            <Title children={'Horários'} />
                            <View style={styles.viewText}>
                                <Text children={'Hora de entrada:'} style={{ fontWeight: 'bold' }} />
                                <Text children={usuario?.horario?.hrEntrada} />
                            </View>
                            <View style={styles.viewText}>
                                <Text children={'Hora de intervalo:'} style={{ fontWeight: 'bold' }} />
                                <Text children={usuario?.horario?.hrIntervalo} />
                            </View>
                            <View style={styles.viewText}>
                                <Text children={'Hora de retorno:'} style={{ fontWeight: 'bold' }} />
                                <Text children={usuario?.horario?.hrRetorno} />
                            </View>
                            <View style={styles.viewText}>
                                <Text children={'Hora de saída:'} style={{ fontWeight: 'bold' }} />
                                <Text children={usuario?.horario?.hrSaida} />
                            </View>
                        </View>
                        <Button title='CONFIRMAR' onPress={() => setVisible(true)} />
                    </View>
                </ScrollView>
            </View>
            {/** MODAL DE CONFIRMAÇÃO */}
            <Modal visible={visible} onDismiss={() => setVisible(false)}>
                <View style={{ backgroundColor: '#fff', height: 250, marginHorizontal: 20, paddingHorizontal: 10, borderRadius: 8, justifyContent: 'space-around' }}>
                    <Title style={{ textAlign: 'center' }} children='Ponto cadastrado com sucesso!' />
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Image source={require('../../../assets/icon-success.png')} style={{ width: 100, height: 100 }} resizeMode={'contain'} />
                    </View>
                    <Button title='FECHAR' onPress={() => { setVisible(false); Linking.openURL(`whatsapp://send?text=SUA_MENSAGEM_AQUI&abid=ID_DO_CONTATO`) }} />
                </View>
            </Modal>
        </>
    );
}

export default FinalizaPonto;

const styles = StyleSheet.create({
    title: { fontWeight: 'bold', fontSize: 22 },
    photo: { width: '80%', height: '80%', borderRadius: 10 },
    viewText: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' }
})