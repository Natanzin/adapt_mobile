import React, { useEffect, useState } from 'react'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'

const Reservas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {

    interface reservationData {
        dataReserva: string,
        dots: {
            churrasqueira: boolean,
            gourmet: boolean,
            entregaMoveis: boolean,
            mudanca: boolean,
            internet: boolean,
            lavanderia: boolean,
            salaoFesta: boolean
        }
    }

    const [reservation, setReservation] = useState<reservationData>({
        dataReserva: '',
        dots: {
            churrasqueira: false,
            gourmet: false,
            entregaMoveis: false,
            mudanca: false,
            internet: false,
            lavanderia: false,
            salaoFesta: false
        }
    })

    useEffect(() => {

    }, [])

    LocaleConfig.locales['br'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    };
    LocaleConfig.defaultLocale = 'br';

    return (
        <LinearGradient style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }} colors={['#45bbeb', '#005685']}>
            <LinearGradient style={style.button} colors={['#f29f54', '#e17009']}>
                <TouchableHighlight onPress={() => props.navigation.navigate('FormReservas')} underlayColor='#f29f54' style={{ borderRadius: 5 }} >
                    <Title style={style.textButton} children='Nova Reserva' />
                </TouchableHighlight>
            </LinearGradient>
            <Calendar
                style={{
                    borderRadius: 10,
                    borderTopWidth: 10,
                    borderTopColor: '#005685',
                    paddingBottom: 10
                }}
                onDayPress={day => console.log(day)}
                theme={{
                    backgroundColor: '#fff',
                    calendarBackground: '#fff',
                    textSectionTitleColor: '#ccc',
                    selectedDayBackgroundColor: '#ccc',
                    selectedDayTextColor: '#fff',
                    todayTextColor: '#45bbeb',
                    dayTextColor: '#005685',
                    textDisabledColor: '#f0f0f0',
                    dotColor: '#45bbeb',
                    selectedDotColor: '#fff',
                    arrowColor: '#e17009',
                    monthTextColor: '#45bbeb',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 20,
                    textMonthFontSize: 21,
                    textDayHeaderFontSize: 16
                }}
                markedDates={{}}
                markingType={'multi-dot'}

            />
        </LinearGradient>

    );
}
{/** '2021-03-25': { dots: [churrasqueira], selected: true },
                    '2021-03-26': { dots: [churrasqueira, entregaMoveis], selected: true },
                    '2021-03-27': { dots: [churrasqueira, entregaMoveis, gourmet], selected: true },
                    '2021-03-28': { dots: [churrasqueira, entregaMoveis, gourmet, internet], selected: true },
                    '2021-03-29': { dots: [churrasqueira, entregaMoveis, gourmet, internet, lavanderia], selected: true },
                    '2021-03-30': { dots: [churrasqueira, entregaMoveis, gourmet, internet, lavanderia, mudanca], selected: true },
                    '2021-03-31': { dots: [churrasqueira, entregaMoveis, gourmet, internet, lavanderia, mudanca, salaoFesta], selected: true }, */}

export default Reservas;

const style = StyleSheet.create({
    button: { backgroundColor: '#f29f54', borderWidth: 1, borderColor: '#85480f', borderRadius: 5, marginBottom: 15, width: '50%', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#643509', textAlign: 'center', fontWeight: 'bold', fontSize: 25 }
})

{/**     const churrasqueira = { key: 'churrasqueira', color: 'red', selectedDotColor: 'red' };
    const gourmet = { key: 'gourmet', color: 'orange', selectedDotColor: 'orange' };
    const entregaMoveis = { key: 'entregaMoveis', color: 'purple', selectedDotColor: 'purple' };
    const mudanca = { key: 'mudanca', color: 'green', selectedDotColor: 'green' };
    const internet = { key: 'internet', color: 'blue', selectedDotColor: 'blue' };
    const lavanderia = { key: 'lavanderia', color: 'gray', selectedDotColor: 'gray' };
    const salaoFesta = { key: 'salaoFesta', color: 'pink', selectedDotColor: 'pink' }; */}