import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight } from 'react-native'
import { RadioButton, Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment'

const FormReservas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    const [qtdPessoas, setQtdPessoas] = useState('')
    const [finalidade, setFinalidade] = useState('')
    const [date, setDate] = useState(moment().format('DD/MM/YYYY'))
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
        { 'id':'01','title': 'Churrasqueira' }, { 'id':'02','title': 'Entrega de Móveis' }, { 'id':'03','title': 'Gourmet / Home' }, { 'id':'04','title': 'Instalação de Internet' }, { 'id':'05','title': 'Lavanderia - Noturno' }, { 'id':'06','title': 'Mudança' }, { 'id':'07','title': 'Salão de Festa' }
    ]
    var itemHorario = [
        { 'id':'01','hora': '10:30' }, { 'id':'02','hora': '12:30' },
    ]
    return (
        <ScrollView style={{ flex: 1, width: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15, backgroundColor: '#f0f0f0' }} >
                <Title children={'Data'} style={style.titleInput} />
                    <TextInputMask 
                        style={style.input}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={date}
                        onChangeText={text => setDate(text)}
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
                                <View key={item.id} style={style.pickerItem}>
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
            </View >
        </ScrollView>
    );
}

export default FormReservas;

const style = StyleSheet.create({
    //input: { height: 40, width: '80%', borderColor: '#ccc', borderWidth: 0, backgroundColor: '#fff', textAlign: 'center', color: '#000', borderRadius: 5, marginVertical: 10 },
    input: { width: '90%', height: 40, backgroundColor: '#fff', borderRadius: 5, fontSize: 20, padding: 5, borderWidth: 1, borderColor: '#005685' },
    pickerItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    picker: { paddingHorizontal: 10, paddingVertical: 5, width: '80%', borderColor: '#ccc', borderWidth: 0, backgroundColor: '#fff', color: '#000', borderRadius: 5, marginVertical: 10 },
    titleInput: { color: '#fff', width: '80%' },
    button: { backgroundColor: '#f29f54', borderWidth: 1, marginVertical: 15, borderColor: '#85480f', borderRadius: 5, width: '70%', paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#643509', textAlign: 'center', fontWeight: 'bold', fontSize: 25 },
})