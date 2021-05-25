import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight, TextInput, Text, Image, ActivityIndicator } from 'react-native'
import { Title, Portal, Modal, Provider, Dialog } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '../../contexts/auth'
import api from '../../services/api'
import md5 from 'md5'

const Login = (props: any) => {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visibleError, setVisibleError] = useState(false)
    const [visibleErrorCarac, setVisibleErrorCarac] = useState(false)

    const { signIn } = useAuth()

    async function efetuarLogin() {
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
                    <View style={[style.viewContent, { backgroundColor: '#f0f0f0' }]}>
                        <Image source={require('../../assets/logo-login.png')} resizeMode='contain' style={style.logo} />
                    </View>
                </View>
                <View style={[style.viewContent, { backgroundColor: '#005685' }]}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Usuário'
                            style={style.input}
                            onChangeText={text => setUsuario(text)}
                            value={usuario}
                            placeholderTextColor='#909090'
                            autoCompleteType={'off'} />
                        <TextInput
                            placeholder='Senha'
                            style={[style.input, { marginTop: 20 }]}
                            onChangeText={senha => setSenha(senha)}
                            value={senha}
                            secureTextEntry={true}
                            placeholderTextColor='#909090'
                            autoCompleteType={'off'} />
                    </View>

                    <TouchableHighlight onPress={efetuarLogin} underlayColor='#F29F54' style={style.button}>
                        <Text children={'Entrar'} style={style.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                    </TouchableHighlight>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight onPress={() => setVisible(true)} underlayColor='#005685' style={{ borderRadius: 4 }}>
                            <Text children='ESQUECI MINHA SENHA' style={style.textOption} />
                        </TouchableHighlight>
                        <Text children='||' style={style.textOption} />
                        <TouchableHighlight onPress={() => { props.navigation.navigate('Ajuda') }} underlayColor='#005685' style={{ borderRadius: 5 }} >
                            <Text children='AJUDA' style={style.textOption} />
                        </TouchableHighlight>
                    </View>
                    <Text children='COPYRIGHT© - TODOS OS DIREITOS RESERVADOS - 2010 PSE2' style={style.copy} />
                </View>
            </View>
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
                                placeholderTextColor='#D0D0D0'
                            />
                            <Text
                                style={style.textModal}
                                children='Obs.: Preencha o campo de login, e em seguida clique no botão "Recuperar senha", o sistema validará seus dados e encaminhará um link para o seu e-mail, ao clicar no link o sistema encaminhará para uma nova tela, onde poderá efetuar a troca de sua senha.'
                            />
                            <LinearGradient style={style.buttonModal} colors={['#45BBEB', '#005685']} >
                                <TouchableHighlight onPress={() => { }} underlayColor='#45BBEB' style={{ borderRadius: 5 }}>
                                    <Title
                                        style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}
                                        children='Recuperar Senha'
                                    />
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                </Modal>
            </Portal>
            {/** Error de usuário ou senha */}
            <Portal>
                <Dialog visible={visibleError} onDismiss={() => setVisibleError(false)} style={style.modalError}>
                    <Dialog.Content>
                        <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#005685' }} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true}>
                            Usuário ou senha incorretos, favor repitir a operação.
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            {/** erro no catch */}
            <Portal>
                <Dialog visible={visibleErrorCarac} onDismiss={() => setVisibleErrorCarac(false)} style={[style.modalError, { borderTopColor: '#F00' }]}>
                    <Dialog.Content>
                        <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: '#005685' }} numberOfLines={2} ellipsizeMode={'clip'} adjustsFontSizeToFit={true}>
                            O serviço está indisponível, tente novamente mais tarde!
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            {/** Loading */}
            <Portal>
                <Modal visible={loading}>
                    <ActivityIndicator size={50 || "large"} color="#fff" />
                    <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#FFF' }} />
                </Modal>
            </Portal>
        </Provider>
    );
}

export default Login;

const style = StyleSheet.create({
    content: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
    button: { backgroundColor: 'rgb(251, 180, 47)', borderWidth: 1, borderColor: '#85480f', borderRadius: 5, width: '60%', paddingVertical: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    buttonModal: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 30 },
    input: { height: 50, width: '80%', borderColor: '#f0f0f0', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', color: '#000', borderRadius: 5 },
    copy: { color: '#fff', fontSize: 8, textAlign: 'center' },
    viewLogo: { flex: 1, backgroundColor: '#e9e9e9', width: '100%', alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.37, shadowRadius: 7.49, elevation: 12 },
    viewContent: { flex: 4, width: '100%', alignItems: 'center', justifyContent: 'space-around' },
    logo: { width: '80%', height: '80%', marginTop: 30 },
    textOption: { color: '#fff', fontSize: 9, paddingHorizontal: 5, marginVertical: 10 },
    viewModal: { backgroundColor: '#fff', width: '90%', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', borderTopWidth: 15, borderTopColor: '#005685' },
    inputModal: { height: 40, width: '100%', borderColor: '#ccc', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', color: '#000', borderRadius: 5 },
    textModal: { fontSize: 11, marginVertical: 10, textAlign: 'justify' },
    modalError: { borderTopWidth: 10, borderTopColor: '#005685' }
})