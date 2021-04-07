import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Divider, Title } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import usuarios from './usuarios.json'
import { useAuth } from '../../../contexts/auth'
const Ponto = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
    //recebe a lista com todos os usuarios que utilizam esse modulo
    const [listUsuarios, setListUsuarios] = useState(usuarios?.usuarios)
    const { user } = useAuth()
    console.log(user)

    //retorna as informações do usuário 
    const usuario = listUsuarios.find((obj) => obj.codEmpresa === user?.codEmpresa && obj.nome === user?.usuario)
    console.log(usuario)


    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', paddingHorizontal: 15 }}>
            <Title children='INSTRUÇÕES!' style={{ textAlign: 'center' }} />
            <Text style={styles.textInstructions}>1. Clique no botão 'BATER PONTO' para abrir a câmera do celular.</Text>
            <Text style={styles.textInstructions}>2. Centralize o seu rosto na área demarcada e tire uma selfie.</Text>
            <Text style={styles.textInstructions}>3. Confira seus dados e a seguir, pressione CONFIRMAR.</Text>
            {/** Navega para a tela da câmera */}
            <Button title='Bater ponto' onPress={() =>
                props.navigation.navigate('CameraPonto', {'usuario': JSON.stringify(usuario)})
            } />
        </View>
    )
}

export default Ponto;

const styles = StyleSheet.create({
    textInstructions: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 18, textAlign: 'justify' }
})