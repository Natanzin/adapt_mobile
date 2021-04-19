import React, { useEffect, useState, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Image } from 'react-native';
import { Divider, RadioButton, Title, Modal, Portal, Provider } from 'react-native-paper';
import { useAuth } from '../../../contexts/auth'
import { LinearGradient } from 'expo-linear-gradient'
import { Camera } from 'expo-camera';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'

const FormularioFiscal = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  const { user } = useAuth()
  const [flashCamera, setFlashCamera] = useState(Camera.Constants.FlashMode.off)
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)
  const photoUri = props?.route?.params?.foto
  const [visible, setVisible] = useState(false)

  const [check1, setChek1] = useState('check')
  const [desc1, setDesc1] = useState('')
  const [photo1, setPhoto1] = useState('')


  function onDismissModal() {
    setVisible(false)

  }

  //faz referência com a câmera
  const camRef = useRef<any | null>(null)
  //Recebe a permissão de uso da câmera
  const [hasPermission, setHasPermission] = useState<null | String | boolean>(null);

  //Permissão de uso da câmera
  useEffect(() => {
    (async () => {
      //pergunta ao usuário se o app pode usar a câmera
      const { status } = await Camera.requestPermissionsAsync();
      //armazena o resultado na variável
      setHasPermission(status === 'granted');
    })();
  }, []);

  //Se não for respondida, não aparecerá nada na tela
  if (hasPermission === null) {
    return <View />;
  }
  //se não autorizar, aparecerar um texto
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera!</Text>;
  }

  //função responsável por capturar a imagem
  async function takePicture() {
    if (camRef) {
      const { uri } = await camRef?.current?.takePictureAsync()
      setVisible(false)
      if (photo1 === 'pendente') {
        setPhoto1(uri)
      }
    }
  }

  return (
    <Provider>

      <View style={styles.cardCondom}>
        <View>
          <Title children='Presença no posto' />
          <Divider />
          <Title children='Conformidade' />
          <RadioButton.Group onValueChange={newValue => setChek1(newValue)} value={check1}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value='check' />
                <Text>Sim</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value='noCheck' />
                <Text>Não</Text>
              </View>
            </View>
          </RadioButton.Group>
          {check1 === 'noCheck' &&
            <>
              <Divider />
              <Title children='Providência' />
              <TextInput
                placeholder='Descreva a ação realizada'
                value={desc1}
                onChangeText={setDesc1}
                style={styles.input}
                multiline={true}
              />
              {photo1 === '' ?
                <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                  <TouchableHighlight onPress={() => { setVisible(true); setPhoto1('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <FontAwesome5Icon name='camera' size={25} color='#fff' />
                      <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                    </View>
                  </TouchableHighlight>
                </LinearGradient>
                :
                <>
                  <Title children='Pré-visualização' />
                  <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: photo1 }} style={styles.photo} resizeMode={'contain'} />
                  </View>
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto1('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar outra foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                </>
              }
            </>
          }
        </View>
      </View>

      <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
        <TouchableHighlight onPress={() => { console.log('fiscalização') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children='Concluir Fiscalização' />
        </TouchableHighlight>
      </LinearGradient>


      <Portal>
        <Modal visible={visible} onDismiss={onDismissModal} >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.viewModal}>
              <Camera
                style={styles.camera}
                type={typeCamera}
                autoFocus={Camera.Constants.AutoFocus.on}
                flashMode={flashCamera}
                ref={camRef}
              >
              </Camera>
              <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '85%' }}>
                  <TouchableHighlight underlayColor='#ccc' onPress={() => { typeCamera == Camera.Constants.Type.back ? setTypeCamera(Camera.Constants.Type.front) : setTypeCamera(Camera.Constants.Type.back) }}>
                    <IonIcons name='camera-reverse-outline' size={30} color='#000' />
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor='#ccc' onPress={() => { flashCamera == Camera.Constants.AutoFocus.off ? setFlashCamera(Camera.Constants.AutoFocus.on) : setFlashCamera(Camera.Constants.AutoFocus.off) }}>
                    <IonIcons name={flashCamera == Camera.Constants.AutoFocus.off ? 'flash-outline' : 'flash-off-outline'} size={30} color='#000' />
                  </TouchableHighlight>
                </View>
                <Divider />
                <TouchableHighlight onPress={takePicture} underlayColor='transparent' >
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.buttonCamera} >
                      <IonIcons name='camera-outline' size={35} color='#000' />
                    </View>
                    <Text style={styles.textButton}>Pressione para registrar ocorrência!</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

export default FormularioFiscal;

const styles = StyleSheet.create({
  cardCondom: { marginHorizontal: 15, marginVertical: 10, borderTopWidth: 10, borderTopColor: '#005685', backgroundColor: '#fff', padding: 5, borderRadius: 5 },
  cardFinal: { marginHorizontal: 30, marginVertical: 10, backgroundColor: '#005685', padding: 5, borderRadius: 5 },
  button: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 25, marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 },
  textSuccess: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20 },
  input: { borderWidth: 1, padding: 0, paddingHorizontal: 8 },
  photo: { width: 220, height: 220, borderRadius: 5 },

  viewModal: { backgroundColor: '#fff', width: '95%', height: '95%', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 5, borderTopWidth: 10, borderTopColor: '#005685' },
  camera: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonCamera: { width: 60, height: 60, backgroundColor: '#fff', borderWidth: 6, borderColor: '#aaa', borderRadius: 180, alignItems: 'center', justifyContent: 'center' },
  textButton: { color: '#000', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }
})