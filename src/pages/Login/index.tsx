import React, { useState } from 'react'
import { View, TouchableHighlight, TextInput, Text, Image, ActivityIndicator, TouchableOpacity, Dimensions, StyleSheet, Keyboard } from 'react-native'
import { Title, Portal, Modal, Provider, Dialog } from 'react-native-paper'
import { useAuth } from '../../contexts/auth'
import api from '../../services/api'
import md5 from 'md5'
import colors from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons'
import { InputTexto, InputSenha } from '../../components/input'

const Login = (props: any) => {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visibleError, setVisibleError] = useState(false)
    const [visibleErrorCarac, setVisibleErrorCarac] = useState(false)

    const { signIn } = useAuth()

    async function efetuarLogin() {
        Keyboard.dismiss()
        if (usuario != '' && senha != '') {
            try {
                setLoading(true)
                var senhaCrip = md5(senha)
                const { data } = await api.get(`/adapt/login/${usuario}/pass/${senhaCrip}`)
                var usuarioLogin = {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM',
                    'user': {
                        'USU_ST_LOGIN': `${data?.USU_ST_LOGIN}`,
                        'USU_IN_CODIGO': `${data?.USU_IN_CODIGO}`,
                        'ORG_IN_CODIGO': `${data?.ORG_IN_CODIGO}`
                    }
                }
                if (data == 'erro') {
                    setVisibleError(true)
                    setSenha('')
                    setTimeout(function () { setVisibleError(false) }, 2000)
                } else {
                    signIn(usuarioLogin)
                }
                setLoading(false)
            } catch (e) {
                console.log("A vaca foi pro brejo! " + e)
                setLoading(false)
                setVisibleErrorCarac(true)
                setUsuario('')
                setSenha('')
                setTimeout(function () { setVisibleErrorCarac(false) }, 2000)
            }
        } else {
            setVisibleError(true)
            setSenha('')
            setTimeout(function () { setVisibleError(false) }, 2000)
        }
    }

    return (
        <Provider>
            <View style={style.content}>
                <View style={style.viewLogo}>
                    <View style={[style.viewContent, { backgroundColor: colors.default_background }]}>
                        <Image source={require('../../assets/logo-login.png')} resizeMode='contain' style={style.logo} />
                    </View>
                </View>
                <View style={[style.viewContent, { backgroundColor: colors.default_azul }]}>

                    <View>
                        <InputTexto
                            value={usuario}
                            onChangeText={text => setUsuario(text)}
                            placeholder='Usuário'
                        />
                        <InputSenha
                            value={senha}
                            onChangeText={text => setSenha(text)}
                            placeholder='Senha'
                        />
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableHighlight onPress={efetuarLogin} underlayColor={colors.default_laranja_claro} style={style.button}>
                            <Text children={'Entrar'} style={style.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                        </TouchableHighlight>
                        <View style={style.viewAjuda}>
                            {/*<TouchableHighlight onPress={() => { }} underlayColor={colors.default_azul_claro} style={style.buttonAjuda} >
                                <Text children='Esqueci Minha Senha' style={style.textAjuda} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                            </TouchableHighlight>*/}
                            <TouchableHighlight onPress={() => { props.navigation.navigate('Ajuda') }} underlayColor={colors.default_azul_claro} style={style.buttonAjuda} >
                                <Text children='Ajuda' style={style.textAjuda} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                            </TouchableHighlight>
                        </View>
                    </View>

                    <Text children='COPYRIGHT© - TODOS OS DIREITOS RESERVADOS - 2010 PSE2' style={style.copy} />

                </View>
            </View>
            {/** MODAL RECUPERA SENHA */}
            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={style.viewModal}>
                            <Title children='Esqueci Minha Senha' />
                            <TextInput
                                placeholder='Usuário'
                                style={style.inputModal}
                                onChangeText={text => setUsuario(text)}
                                value={usuario}
                                placeholderTextColor={colors.default_cinza}
                            />
                            <Text
                                style={style.textModal}
                                children='Obs.: Preencha o campo de login, e em seguida clique no botão "Recuperar senha", o sistema validará seus dados e encaminhará um link para o seu e-mail, ao clicar no link o sistema encaminhará para uma nova tela, onde poderá efetuar a troca de sua senha.'
                            />
                            <View style={style.buttonModal} >
                                <TouchableHighlight onPress={() => { }} underlayColor={colors.default_azul_claro} style={{ borderRadius: 5 }}>
                                    <Title
                                        style={{ color: colors.default_branco, textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}
                                        children='Recuperar Senha'
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Portal>
            {/** Error de usuário ou senha */}
            <Portal>
                <Dialog visible={visibleError} onDismiss={() => setVisibleError(false)} style={style.modalError}>
                    <Dialog.Content>
                        <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: colors.default_azul }} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true}>
                            Usuário ou senha incorretos, favor repitir a operação.
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            {/** erro no catch */}
            <Portal>
                <Dialog visible={visibleErrorCarac} onDismiss={() => setVisibleErrorCarac(false)} style={[style.modalError, { borderTopColor: colors.color_danger }]}>
                    <Dialog.Content>
                        <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: colors.default_azul }} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true}>
                            O serviço está indisponível, tente novamente mais tarde!
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            {/** Loading */}
            <Portal>
                <Modal visible={loading}>
                    <ActivityIndicator size={50 || "large"} color={colors.default_branco} />
                    <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: colors.default_branco }} />
                </Modal>
            </Portal>
        </Provider>
    );
}

export default Login;

const style = StyleSheet.create({
    content: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
    button: { backgroundColor: colors.default_laranja, borderRadius: 5, width: Dimensions.get('screen').width * 0.65, marginBottom: 5, paddingVertical: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    buttonModal: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: colors.default_azul, textAlign: 'center', fontWeight: 'bold', fontSize: 30 },
    copy: { color: colors.default_branco, fontSize: 8, textAlign: 'center' },
    viewLogo: { flex: 1, backgroundColor: colors.default_background, width: '100%', alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.37, shadowRadius: 7.49, elevation: 12 },
    viewContent: { flex: 4, width: '100%', alignItems: 'center', justifyContent: 'space-around' },
    logo: { width: '80%', height: '80%', marginTop: 30 },
    textOption: { color: colors.default_branco, fontSize: 9, paddingHorizontal: 5, marginVertical: 10 },
    viewModal: { backgroundColor: colors.default_branco, width: '90%', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', borderTopWidth: 15, borderTopColor: '#005685' },
    inputModal: { height: 40, width: '100%', borderColor: colors.default_cinza, borderWidth: 1, backgroundColor: colors.default_branco, textAlign: 'center', color: '#000', borderRadius: 5 },
    textModal: { fontSize: 11, marginVertical: 10, textAlign: 'justify' },
    modalError: { borderTopWidth: 10, borderTopColor: colors.default_azul },
    viewAjuda: { flexDirection: 'row', width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    buttonAjuda: { paddingVertical: 5, paddingHorizontal: 20, alignItems: 'center', marginBottom: 12, borderRadius: 8 },
    textAjuda: { fontWeight: 'bold', textTransform: 'capitalize', color: colors.default_branco },
    inputArea: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', height: 50 },
    input: { height: 50, width: '80%', borderColor: colors.default_cinza, borderWidth: 1, backgroundColor: colors.default_branco, textAlign: 'center', color: '#000', borderRadius: 5 },
    icon: {}
})