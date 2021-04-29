import React, { useEffect, useState, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Image, ScrollView } from 'react-native';
import { Divider, RadioButton, Title, Modal, Portal, Provider } from 'react-native-paper';
//import { useAuth } from '../../../contexts/auth'
import { LinearGradient } from 'expo-linear-gradient'
import { Camera } from 'expo-camera';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'

const FormularioFiscal = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  //const { user } = useAuth()
  const [flashCamera, setFlashCamera] = useState(Camera.Constants.FlashMode.off)
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)
  const photoUri = props?.route?.params?.foto
  const [visible, setVisible] = useState(false)

  const [check1, setChek1] = useState('check')
  const [desc1, setDesc1] = useState('')
  const [photo1, setPhoto1] = useState('')

  const [check2, setChek2] = useState('check')
  const [desc2, setDesc2] = useState('')
  const [photo2, setPhoto2] = useState('')

  const [check3, setChek3] = useState('check')
  const [desc3, setDesc3] = useState('')
  const [photo3, setPhoto3] = useState('')

  const [check4, setChek4] = useState('check')
  const [desc4, setDesc4] = useState('')
  const [photo4, setPhoto4] = useState('')

  const [check5, setChek5] = useState('check')
  const [desc5, setDesc5] = useState('')
  const [photo5, setPhoto5] = useState('')

  const [check6, setChek6] = useState('check')
  const [desc6, setDesc6] = useState('')
  const [photo6, setPhoto6] = useState('')

  const [check7, setChek7] = useState('check')
  const [desc7, setDesc7] = useState('')
  const [photo7, setPhoto7] = useState('')

  const [check8, setChek8] = useState('check')
  const [desc8, setDesc8] = useState('')
  const [photo8, setPhoto8] = useState('')

  const [check9, setChek9] = useState('check')
  const [desc9, setDesc9] = useState('')
  const [photo9, setPhoto9] = useState('')

  const [check10, setChek10] = useState('check')
  const [desc10, setDesc10] = useState('')
  const [photo10, setPhoto10] = useState('')

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
      photo1 === 'pendente'
        ? setPhoto1(uri)
        : photo2 === 'pendente'
          ? setPhoto2(uri)
          : photo3 == 'pendente'
            ? setPhoto3(uri)
            : photo4 == 'pendente'
              ? setPhoto4(uri)
              : photo5 == 'pendente'
                ? setPhoto5(uri)
                : photo6 == 'pendente'
                  ? setPhoto6(uri)
                  : photo7 == 'pendente'
                    ? setPhoto7(uri)
                    : photo8 == 'pendente'
                      ? setPhoto8(uri)
                      : photo9 == 'pendente'
                        ? setPhoto9(uri)
                        : photo10 == 'pendente'
                          ? setPhoto10(uri)
                          : <></>

    }
  }

  return (
    <Provider>
      <ScrollView style={{ flex: 1, width: '100%' }}>

        {/** 1_ Ítem presença no posto  */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Presença no posto' />
            <Divider />
            <Text children='Conformidade' />
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
                <Text children='Providência' />
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
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
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

        {/** 2_ Ítem uso do uniforme  */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Uso do Uniforme' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek2(newValue)} value={check2}>
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
            {check2 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc2}
                  onChangeText={setDesc2}
                  style={styles.input}
                  multiline={true}
                />
                {photo2 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto2('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo2 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto2('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 3_ Ítem utilização de crachá  */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Utilização de Crachá' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek3(newValue)} value={check3}>
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
            {check3 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc3}
                  onChangeText={setDesc3}
                  style={styles.input}
                  multiline={true}
                />
                {photo3 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto3('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo3 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto3('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 4_ Ítem assinatura na folha de ponto  */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Assinatura de folha de Ponto' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek4(newValue)} value={check4}>
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
            {check4 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc4}
                  onChangeText={setDesc4}
                  style={styles.input}
                  multiline={true}
                />
                {photo4 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto4('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo4 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto4('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 5_ Ítem maquiagem adequada */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Maquiagem Adequada' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek5(newValue)} value={check5}>
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
            {check5 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc5}
                  onChangeText={setDesc5}
                  style={styles.input}
                  multiline={true}
                />
                {photo5 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto5('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo5 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto5('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 6_ Ítem limpeza dos halls */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Limpeza dos Halls' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek6(newValue)} value={check6}>
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
            {check6 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc6}
                  onChangeText={setDesc6}
                  style={styles.input}
                  multiline={true}
                />
                {photo6 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto6('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo6 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto6('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 7_ Ítem limpeza da guarita */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Limpeza da Guarita' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek7(newValue)} value={check7}>
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
            {check7 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc7}
                  onChangeText={setDesc7}
                  style={styles.input}
                  multiline={true}
                />
                {photo7 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto7('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo7 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto7('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 8_ Ítem limpeza dos elevadores */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Limpeza dos elevadores' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek8(newValue)} value={check8}>
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
            {check8 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc8}
                  onChangeText={setDesc8}
                  style={styles.input}
                  multiline={true}
                />
                {photo8 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto8('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo8 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto8('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 9_ Ítem limpeza das escadas */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Limpeza das escadas' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek9(newValue)} value={check9}>
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
            {check9 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc9}
                  onChangeText={setDesc9}
                  style={styles.input}
                  multiline={true}
                />
                {photo9 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto9('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo9 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto9('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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

        {/** 10_ Ítem limpeza da garagem */}
        <View style={styles.cardCondom}>
          <View>
            <Title children='Limpeza da garagem' />
            <Divider />
            <Text children='Conformidade' />
            <RadioButton.Group onValueChange={newValue => setChek10(newValue)} value={check10}>
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
            {check10 === 'noCheck' &&
              <>
                <Divider />
                <Text children='Providência' />
                <TextInput
                  placeholder='Descreva a ação realizada'
                  value={desc10}
                  onChangeText={setDesc10}
                  style={styles.input}
                  multiline={true}
                />
                {photo10 === '' ?
                  <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                    <TouchableHighlight onPress={() => { setVisible(true); setPhoto10('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5Icon name='camera' size={25} color='#fff' />
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children=' Capturar foto' />
                      </View>
                    </TouchableHighlight>
                  </LinearGradient>
                  :
                  <>
                    <Divider style={{ marginTop: 3 }} />
                    <Text children='Pré-visualização' />
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: photo10 }} style={styles.photo} resizeMode={'contain'} />
                    </View>
                    <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
                      <TouchableHighlight onPress={() => { setVisible(true); setPhoto10('pendente') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
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
        {/**  fim do formulário */}

        {/**  Enviar formulário */}
        <LinearGradient style={styles.button} colors={['#45bbeb', '#005685']}>
          <TouchableHighlight onPress={() => { console.log('fiscalização') }} underlayColor='#45bbeb' style={{ borderRadius: 5 }} >
            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginVertical: 3 }} children='Concluir Fiscalização' />
          </TouchableHighlight>
        </LinearGradient>
      </ScrollView>

      {/** modal que abre a câmera */}
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} >
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