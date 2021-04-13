import React, { useState } from 'react'
import { View, StyleSheet, TouchableHighlight, TextInput, Text, Image, Button } from 'react-native'
import { Title, Portal, Modal, Provider } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '../../contexts/auth'

const Login: React.FC = () => {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [codEmpresa, setCodEmpresa] = useState('')
    const [visible, setVisible] = useState(false)

    const { signIn } = useAuth()

    function handleSignIn() {
        signIn()
    }

    return (
        <Provider>
            <View style={style.content}>
                <View style={style.viewLogo}>
                    <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={style.viewContent}>
                        <Image source={require('../../assets/logo-login.png')} resizeMode='contain' style={style.logo} />
                    </LinearGradient>
                </View>
                <LinearGradient colors={['#45BBEB', '#005685']} style={style.viewContent}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Usuário'
                            style={style.input}
                            onChangeText={text => setUsuario(text)}
                            value={usuario}
                            placeholderTextColor='#D0D0D0'
                        />
                        <TextInput
                            placeholder='Senha'
                            style={[style.input, { marginTop: 20 }]}
                            onChangeText={senha => setSenha(senha)}
                            value={senha}
                            secureTextEntry={true}
                            placeholderTextColor='#D0D0D0'
                        />
                        <TextInput
                            placeholder='Código de Empresa'
                            style={[style.input, { marginTop: 20 }]}
                            onChangeText={text => setCodEmpresa(text)}
                            value={codEmpresa}
                            placeholderTextColor='#D0D0D0'
                        />
                    </View>
                    <LinearGradient colors={['#F29F54', '#E17009']} style={style.button}>
                        <TouchableHighlight onPress={handleSignIn} underlayColor='#F29F54' style={{ borderRadius: 5 }}>
                            <Title children={'Entrar'} style={style.textButton} />
                        </TouchableHighlight>
                    </LinearGradient>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableHighlight onPress={() => setVisible(true)} underlayColor='#005685' style={{ borderRadius: 4 }}>
                            <Text children='ESQUECI MINHA SENHA' style={style.textOption} />
                        </TouchableHighlight>
                        <Text children='||' style={style.textOption} />
                        <TouchableHighlight onPress={() => { }} underlayColor='#005685' style={{ borderRadius: 5 }} >
                            <Text children='AJUDA' style={style.textOption} />
                        </TouchableHighlight>
                    </View>
                    <Text children='COPYRIGHT© - TODOS OS DIREITOS RESERVADOS - 2010 PSE2' style={style.copy} />
                </LinearGradient>
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
        </Provider>
    );
}

export default Login;

const style = StyleSheet.create({
    content: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
    button: { backgroundColor: '#f29f54', borderWidth: 1, borderColor: '#85480f', borderRadius: 5, width: '50%', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    buttonModal: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
    textButton: { color: '#643509', textAlign: 'center', fontWeight: 'bold', fontSize: 25 },
    input: { height: 40, width: '80%', borderColor: '#ccc', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', color: '#000', borderRadius: 5 },
    copy: { color: '#fff', fontSize: 8, textAlign: 'center' },
    viewLogo: { flex: 1, backgroundColor: '#e9e9e9', width: '100%', alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.37, shadowRadius: 7.49, elevation: 12 },
    viewContent: { flex: 4, width: '100%', alignItems: 'center', justifyContent: 'space-around' },
    logo: { width: '80%', height: '80%', marginTop: 30 },
    textOption: { color: '#fff', fontSize: 9, paddingHorizontal: 5, marginVertical: 10 },
    viewModal: { backgroundColor: '#fff', width: '90%', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', borderTopWidth: 15, borderTopColor: '#005685' },
    inputModal: { height: 40, width: '100%', borderColor: '#ccc', borderWidth: 1, backgroundColor: '#fff', textAlign: 'center', color: '#000', borderRadius: 5 },
    textModal: { fontSize: 11, marginVertical: 10, textAlign: 'justify' }
})