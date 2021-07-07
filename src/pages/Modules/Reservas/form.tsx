import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { RadioButton, Title, Provider, Portal, Modal, Divider } from 'react-native-paper'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import colors from '../../../styles/colors'
import DateTimePicker from '@react-native-community/datetimepicker'
import ButtonConfirm from '../../../components/buttonConfirm'

type Campos = {
    data: String,
    categoria: String,
    horario: String,
    quantidade: String,
    finalidade: String
}

const FormReservas = (props: { navigation: StackNavigationProp<AppParamsList> }) => {

    var dateDias = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
    var dateMeses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const [date, setDate] = useState<Date>(new Date())
    const [dateString, setDateString] = useState<any>()

    const [qtdPessoas, setQtdPessoas] = useState('')
    const [finalidade, setFinalidade] = useState('')
    const [categoria, setCategoria] = useState<string>('')
    const [categoryName, setCategoryName] = useState()
    const [horario, setHorario] = useState('')
    const [horarioName, setHorarioName] = useState()
    const [loadingHorario, setLoadingHorario] = useState(false)
    const [showPickerCategory, setShowPickerCategory] = useState(false)
    const [showPickerHorario, setShowPickerHorario] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const { user } = useAuth()
    const [allCategory, setAllCategory] = useState<any>()
    const [allHorario, setAllHorario] = useState<any>()
    const [findQtdPessoas, setFindQtdPessoas] = useState<any>()

    async function getEspaco() {
        try {
            const { data } = await api.get(`/adapt/lista_espaco_reserva/${user?.ORG_IN_CODIGO}`)
            setAllCategory(data)
        } catch (e) {
            console.warn(`Deu ruim na listagem dos espaços: ${e}`)
        }
    }

    async function getHorario(cat: string) {
        try {
            setLoadingHorario(true)
            const { data } = await api.get(`http://napi.adapterp.com.br/adapt/lista_espaco_horario/${cat}`)
            setAllHorario(data)
            setLoadingHorario(false)
        } catch (e) {
            console.warn(`Deu ruim na listagem dos horários => ${e}`)
        }
    }

    function getQtdPessoas(cat: string) {
        const find = allCategory?.find((item: any) => item.ESPI_IN_CODIGO == cat)
        setFindQtdPessoas(find)
        console.log(find)
    }

    useEffect(() => {
        getEspaco()
    }, [])

    useEffect(() => {
        setDateString(`${dateDias[date.getDate()]}/${dateMeses[date.getMonth()]}/${date.getFullYear()}`)
    }, [date])

    const initialValue: Campos = {
        data: '',
        categoria: '',
        horario: '',
        quantidade: '',
        finalidade: ''
    }
    const schema = Yup.object().shape({
        data: Yup.string().required('Data da reserva obrigatório!'),
        categoria: Yup.string().required('Categoria obrigatório!'),
        horario: Yup.string().required('Horário obrigatório!'),
        quantidade: Yup.string(),
        finalidade: Yup.string()
    })

    return (
        <ScrollView style={{ flex: 1, width: '100%' }}>
            <Formik
                initialValues={initialValue}
                validationSchema={schema}
                validateOnChange={true}
                onSubmit={async () => { }}
            >
                {(onSubmit) => (
                    <>
                        <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)} style={style.buttonPicker} >
                            <Text children={String(dateString)} style={style.textPicker} />
                            <FontAwesome5Icon name={showDatePicker ? 'chevron-up' : 'chevron-down'} size={20} color={colors.default_azul} />
                        </TouchableOpacity>
                        {showDatePicker &&
                            <DateTimePicker
                                mode={'date'}
                                value={date}
                                onChange={(event: any, selectedDate: any) => {
                                    const currentDate = selectedDate || date
                                    setShowDatePicker(!showDatePicker)
                                    setDate(currentDate)
                                }}
                                display="default"
                            />
                        }

                        <TouchableOpacity onPress={() => setShowPickerCategory(!showPickerCategory)} style={style.buttonPicker} >
                            <Text children={categoryName || 'Selecione uma categoria!'} style={style.textPicker} />
                            <FontAwesome5Icon name={showPickerCategory ? 'chevron-up' : 'chevron-down'} size={20} color={colors.default_azul} />
                        </TouchableOpacity>
                        {showPickerCategory &&
                            allCategory?.map((item: any) => (
                                <TouchableOpacity key={item.ESPI_IN_CODIGO} onPress={() => { setCategoria(item.ESPI_IN_CODIGO); setCategoryName(item.CEM_ST_DESCRICAO); setShowPickerCategory(!showPickerCategory); getHorario(item.ESPI_IN_CODIGO), getQtdPessoas(item.ESPI_IN_CODIGO) }} style={style.itemPicker}>
                                    <Text children={item.CEM_ST_DESCRICAO} style={style.textPicker} />
                                </TouchableOpacity>
                            ))
                        }

                        <TouchableOpacity onPress={() => setShowPickerHorario(!showPickerHorario)} style={style.buttonPicker} >
                            {
                                loadingHorario ?
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <ActivityIndicator size={18} color={colors.default_azul} />
                                    </View>
                                    :
                                    <>
                                        <Text children={horarioName || 'Selecione um horário!'} style={style.textPicker} />
                                        <FontAwesome5Icon name={showPickerHorario ? 'chevron-up' : 'chevron-down'} size={20} color={colors.default_azul} />
                                    </>
                            }
                        </TouchableOpacity>
                        {showPickerHorario &&
                            allHorario?.map((item: any) => (
                                <TouchableOpacity key={item.ESPH_IN_CODIGO} onPress={() => { setShowPickerHorario(!showPickerHorario); setHorarioName(item.ESPH_ST_DESCRICAO) }} style={style.itemPicker}>
                                    <Text children={item.ESPH_ST_DESCRICAO} style={style.textPicker} />
                                </TouchableOpacity>
                            ))
                        }
                        <Divider />

                        {findQtdPessoas?.CEM_CH_TIPO == 'E' &&
                            <>
                                <View style={style.buttonPicker}>
                                    <TextInput
                                        value={qtdPessoas}
                                        onChangeText={(text: string) => setQtdPessoas(text)}
                                        placeholder={`Quantidade de pessoas! max: ${findQtdPessoas?.CEM_IN_CAPACIDADE}`}
                                    />
                                </View>

                                <View style={[style.buttonPicker]}>
                                    <TextInput
                                        value={finalidade}
                                        onChangeText={(text: string) => setFinalidade(text)}
                                        placeholder={'Finalidade'}
                                        multiline={true}
                                    />
                                </View>
                            </>}

                        <ButtonConfirm
                            textButton={'Reservar'}
                            onPress={onSubmit}
                        />

                    </>
                )}
            </Formik>
        </ScrollView>

    );
}

export default FormReservas;

const style = StyleSheet.create({
    input: { width: '90%', height: 40, backgroundColor: '#fff', borderRadius: 5, fontSize: 20, padding: 5, borderWidth: 1, borderColor: '#005685' },
    pickerItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    picker: { paddingHorizontal: 10, paddingVertical: 5, width: '80%', borderColor: '#ccc', borderWidth: 0, backgroundColor: '#fff', color: '#000', borderRadius: 5, marginVertical: 10 },
    titleInput: { color: '#fff', width: '80%' },
    button: { backgroundColor: '#f29f54', borderWidth: 1, marginVertical: 15, borderColor: '#85480f', borderRadius: 5, width: '70%', paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#643509', textAlign: 'center', fontWeight: 'bold', fontSize: 25 },

    buttonPicker: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: colors.default_azul, paddingHorizontal: 10, paddingVertical: 8, marginHorizontal: 10, marginVertical: 3, borderRadius: 5, backgroundColor: colors.default_branco },
    itemPicker: { backgroundColor: colors.default_branco, justifyContent: 'center', marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: colors.default_cinza_claro },
    textPicker: { fontWeight: '300', fontSize: 17 }
})