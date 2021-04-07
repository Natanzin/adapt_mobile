import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight } from 'react-native'
import { RadioButton, Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import DatePicker from 'react-native-datepicker'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'

const FormReservas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const [qtdPessoas, setQtdPessoas] = useState('')
    const [finalidade, setFinalidade] = useState('')
    const [date, setDate] = useState('')
    const [categoria, setCategoria] = useState('')
    const [horario, setHorario] = useState('')

    var max = 0;
    if (categoria == 'Entrega de Móveis' || categoria == 'Instalação de Internet' || categoria == 'Lavanderia - Noturno' || categoria == 'Mudança') {
        max = 60;
    } else if (categoria == 'Churrasqueira' || categoria == 'Salão de Festa') {
        max = 35;
    } else if (categoria == 'Gourmet / Home') {
        max = 17;
    }

    var itemCategoria = [
        { 'title': 'Churrasqueira' }, { 'title': 'Entrega de Móveis' }, { 'title': 'Gourmet / Home' }, { 'title': 'Instalação de Internet' }, { 'title': 'Lavanderia - Noturno' }, { 'title': 'Mudança' }, { 'title': 'Salão de Festa' }
    ]
    var itemHorario = [
        { 'hora': '10:30' }, { 'hora': '12:30' },
    ]
    return (
        <ScrollView style={{ flex: 1, width: '100%' }}>
            <LinearGradient style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }} colors={['#45bbeb', '#005685']}>
                <Title children={'Data'} style={style.titleInput} />
                <DatePicker
                    format='DD/MM/YYYY'
                    style={style.input}
                    date={date}
                    onDateChange={value => setDate(value)}
                />
                <Title children={'Espaço'} style={style.titleInput} />
                <View style={style.picker}>
                    <RadioButton.Group onValueChange={categoria => setCategoria(categoria)} value={categoria} >
                        {itemCategoria.map(item => {
                            return (
                                <View style={style.pickerItem}>
                                    <Text>{item.title}</Text>
                                    <RadioButton value={`${item.title}`} />
                                </View>
                            )
                        })}
                    </RadioButton.Group>
                </View>
                <Title children={'Horário'} style={style.titleInput} />
                <View style={style.picker}>
                    <RadioButton.Group onValueChange={horario => setHorario(horario)} value={horario}>
                        {itemHorario.map(item => {
                            return (
                                <View style={style.pickerItem}>
                                    <Text>{item.hora}</Text>
                                    <RadioButton value={`${item.hora}`} />
                                </View>
                            )
                        })}
                    </RadioButton.Group>
                </View>
                <Title children={max != 0 ? `Qtd. Pessoas - Max. ${max}` : 'Qtd. Pessoas'} style={style.titleInput} />
                <TextInput
                    placeholder={'Qtd. Pessoas'}
                    style={style.input}
                    onChangeText={text => setQtdPessoas(text)}
                    value={qtdPessoas}
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                />
                <Title children={'Finalidade'} style={style.titleInput} />
                <TextInput
                    placeholder='Finalidade'
                    style={[style.input, { height: 80 }]}
                    onChangeText={text => setFinalidade(text)}
                    value={finalidade}
                    placeholderTextColor='gray'
                    multiline={true}
                />

                <LinearGradient style={style.button} colors={['#f29f54', '#e17009']}>
                    <TouchableHighlight onPress={() => { }} underlayColor='#f29f54' style={{ borderRadius: 5 }} >
                        <Title style={style.textButton} children='Reservar' />
                    </TouchableHighlight>
                </LinearGradient>
            </LinearGradient >
        </ScrollView>
    );
}

export default FormReservas;

const style = StyleSheet.create({
    input: { height: 40, width: '80%', borderColor: '#ccc', borderWidth: 0, backgroundColor: '#fff', textAlign: 'center', color: '#000', borderRadius: 5, marginVertical: 10 },
    pickerItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    picker: { paddingHorizontal: 10, paddingVertical: 5, width: '80%', borderColor: '#ccc', borderWidth: 0, backgroundColor: '#fff', color: '#000', borderRadius: 5, marginVertical: 10 },
    titleInput: { color: '#fff', width: '80%' },
    button: { backgroundColor: '#f29f54', borderWidth: 1, marginVertical: 15, borderColor: '#85480f', borderRadius: 5, width: '70%', paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#643509', textAlign: 'center', fontWeight: 'bold', fontSize: 25 },
})