import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import api from '../../../services/api'
import { useAuth } from '../../../contexts/auth'

const Suprimentos = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  const { user } = useAuth()
  const [permissoes, setPermissoes] = useState(undefined)

  const [estoque, setEstoque] = useState(undefined)
  //const [solicitacao, setSolicitacao] = useState(undefined)
  //const [solicitacaoAprov, setSolicitacaoAprov] = useState(undefined)
  //const [cotacao, setCotacao] = useState(undefined)
  //const [cotacaoAprov, setCotacaoAprov] = useState(undefined)
  //const [pedido, setPedido] = useState(undefined)
  //const [pedidoAprov, setPedidoAprov] = useState(undefined)
  //const [recebimento, setRecebimento] = useState(undefined)
  //const [inventario, setInventario] = useState(undefined)
  //const [almoxarifado, setAlmoxarifado] = useState(undefined)

  //permissões de acesso de cada funcionalidade do módulo de suprimentos
  useEffect(() => {
    (async () => {
      //requisição de todas as permissões
      const { data } = await api.get(`/adapt/agente_usu_org_perfil/${user?.USU_IN_CODIGO}/org/${user?.ORG_IN_CODIGO}/resource/0`)
      //seta todas as permissões em uma variável
      setPermissoes(data)
      setEstoque(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:estoque:index')) /** permissão funcionalidade estoque */
      //setSolicitacao(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:solicitacao:index')) /** permissão funcionalidade solicitação */
      //setSolicitacaoAprov(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:solicitacao:aprovar')) /** permissão funcionalidade aprovar solicitação */
      //setCotacao(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:cotacao:index')) /** permissão funcionalidade cotação */
      //setCotacaoAprov(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:cotacao:aprovar')) /** permissão funcionalidade aprovar cotação */
      //setPedido(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:pedido:index')) /** permissão funcionalidade pedido */
      //setPedidoAprov(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:pedido:aprovar')) /** permissão funcionalidade aprovar pedido */
      //setRecebimento(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:recebimento:index')) /** permissão funcionalidade recebimento */
      //setInventario(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:inventario:index')) /** permissão funcionalidade inventário */
      //setAlmoxarifado(data.find(obj => obj.OBJ_ST_RESOURCE == 'suprimento:almoxarifado:index')) /** permissão funcionalidade almoxarifado */
    })()
  }, [permissoes != undefined])

  return (
    permissoes === undefined ?
      <>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
          <ActivityIndicator size={50 || "large"} color="#005685" />
          <Text children={'Carregando...'} style={{ fontSize: 25, fontWeight: 'bold', color: '#005685' }} />
        </View>
      </>
      :
      <>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' }}>
          <ScrollView style={{ flex: 1, width: '100%' }}>
            {/* solicitacao &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Solicitacao')} style={styles.button} underlayColor='#d0d0d0' >
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-5.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Solicitação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* solicitacaoAprov &&
              <TouchableHighlight onPress={() => props.navigation.navigate('AprovSolicitacao')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-1.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Aprovar Solicitação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* cotacao &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Cotacao')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-2.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Cotação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* cotacaoAprov &&
              <TouchableHighlight onPress={() => props.navigation.navigate('AprovCotacao')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-1.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Aprovar Cotação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* pedido &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Pedido')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-3.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Pedido' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* pedidoAprov &&
              <TouchableHighlight onPress={() => props.navigation.navigate('AprovPedido')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-1.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Aprovar Pedido' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* recebimento &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Recebimento')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-6.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Recebimento' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {estoque &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Estoque')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/imagens/Prancheta2.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Estoque' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            }

            {/* inventario &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Inventario')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-4.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Inventário' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}

            {/* almoxarifado &&
              <TouchableHighlight onPress={() => props.navigation.navigate('Almoxarifado')} style={styles.button} underlayColor='#d0d0d0'>
                <>
                  <View style={styles.viewImg}>
                    <Image source={require('../../../assets/icon-module-5.png')} style={styles.imgButton} resizeMode={'contain'} />
                  </View>
                  <View style={styles.viewText}>
                    <Text children='Almoxarifado' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
                  </View>
                </>
              </TouchableHighlight>
            */}
            
          </ScrollView>
        </View>
      </>
  );
}

export default Suprimentos;

const styles = StyleSheet.create({
  viewButtonGroup: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', paddingVertical: 10 },
  button: { borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, height: 120, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFF', flexDirection: 'row', marginHorizontal: 10, marginVertical: 5 },
  imgButton: { width: 100, height: '90%' },
  textButton: { fontSize: 22, fontWeight: 'bold' },
  viewImg: { width: '40%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  viewText: { width: '60%', height: '100%', alignItems: 'center', justifyContent: 'center' }
})