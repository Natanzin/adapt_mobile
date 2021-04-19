import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { Camera } from 'expo-camera';

const CameraFiscal = (props: any) => {
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
      props.navigation.navigate('FormularioFiscal', { 'foto': uri })
    }
  }


  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        autoFocus={Camera.Constants.AutoFocus.on}
        flashMode={Camera.Constants.FlashMode.on}
        ref={camRef}
      >
      </Camera>
      <View style={styles.button}>
        <TouchableHighlight onPress={takePicture} underlayColor='transparent' >
          <View style={{ alignItems: 'center' }}>
            <View style={styles.buttonCamera} />
            <Text style={styles.textButton}>Pressione para bater o ponto!</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default CameraFiscal;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  camera: {
      flex: 3.8,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'

  },
  button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  marcacaoRosto: {
      backgroundColor: 'transparent',
      width: Dimensions.get('screen').width - 180,
      height: 330,
      borderColor: '#fff',
      borderWidth: 5,
      borderRadius: 180
  },
  text: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 8
  },
  buttonCamera: {
      width: 60,
      height: 60,
      backgroundColor: '#fff',
      borderWidth: 6,
      borderColor: '#aaa',
      borderRadius: 180
  },
  textButton: {
      color: '#000',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold'
  }
});