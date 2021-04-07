import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { locales } from './rotas.json'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'


const DetalheMapa = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const locale = locales.filter(function (obj) { return obj.id === props?.route?.params?.id })
    //console.log(locale)
    return (
        <>
            {locale.map(item => {
                return (
                    <View key={item.id}>
                        <Text children={'Endereço: ' + `${item.endereço}`} />
                        <Text children={'Nome: ' + `${item.nome}`} />
                        <Text children={'Responsável: ' + `${item.responsavel}`} />
                        <Text children={'Próxima Coleta: ' + `${item.proximaColeta}`} />
                        <Button title="Localização" onPress={() => { 
                            props.navigation.navigate('Mapa',{ 'latitude': item.geometry.latitude, 'longitude': item.geometry.longitude })
                         }} />
                    </View>
                );
            })}
        </>
    )
}

export default DetalheMapa;