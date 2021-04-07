import React from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'

const Suprimentos = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#D0D0D0']} style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.viewButtonGroup}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Solicitacao')} style={styles.button} underlayColor='#d0d0d0' >
            <>
              <Image source={require('../../../assets/icon-module-5.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Solicitação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => props.navigation.navigate('AprovSolicitacao')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-1.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Aprovar Solicitação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
        </View>

        <View style={styles.viewButtonGroup}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Cotacao')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-2.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Cotação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => props.navigation.navigate('AprovCotacao')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-1.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Aprovar Cotação' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
        </View>

        <View style={styles.viewButtonGroup}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Pedido')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-3.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Pedido' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => props.navigation.navigate('AprovPedido')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-1.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Aprovar Pedido' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
        </View>

        <View style={styles.viewButtonGroup}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Recebimento')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-6.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Recebimento' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => props.navigation.navigate('Estoque')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-5.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Estoque' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
        </View>

        <View style={styles.viewButtonGroup}>
          <TouchableHighlight onPress={() => props.navigation.navigate('Inventario')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-4.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Inventário' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => props.navigation.navigate('Almoxarifado')} style={styles.button} underlayColor='#d0d0d0'>
            <>
              <Image source={require('../../../assets/icon-module-5.png')} style={styles.imgButton} resizeMode={'contain'} />
              <Text children='Almoxarifado' style={styles.textButton} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
            </>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default Suprimentos;

const styles = StyleSheet.create({
  viewButtonGroup: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', paddingVertical: 10 },
  button: { borderWidth: 1, borderColor: '#D0D0D0', borderRadius: 5, width: '40%', height: 120, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFF' },
  imgButton: { width: 70, height: 70 },
  textButton: { fontSize: 16, fontWeight: 'bold' }
})