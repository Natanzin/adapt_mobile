import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import app from '../../../../app.json'
import { LinearGradient } from 'expo-linear-gradient'

const Sobre: React.FC = () => {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#f0f0f0' }}>
          <Text style={styles.text} children="Adapt - Sistema de Gestão Empresarial" />
          <Text style={styles.text} children={`Versão: ${app?.expo?.version}`} />
          <Image source={require('../../../assets/img-grupo-eficaz.png')} style={{ width: Dimensions.get('screen').width - 30, height: 100 }} resizeMode={'contain'} />
          <Text style={styles.text} children='COPYRIGHT© - TODOS OS DIREITOS RESERVADOS - 2010 PSE2' numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
      </View>
  );
}

export default Sobre;

const styles = StyleSheet.create({
    text: { fontSize: 18, fontWeight: 'bold' }
})