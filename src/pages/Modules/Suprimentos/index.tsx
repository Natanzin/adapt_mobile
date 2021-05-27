import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import ButtonMenu from '../../../components/buttonMenu';

const Suprimentos = (props: { navigation: StackNavigationProp<AppParamsList> }) => {
  return (
    <View style={styles.viewIndex}>
      <ScrollView style={styles.scrollView}>
        <ButtonMenu
          route={() => props.navigation.navigate('Estoque')}
          source={require('../../../assets/imagens/Prancheta2.png')}
          title='Estoque'
        />
      </ScrollView>
    </View>
  );
}

export default Suprimentos;

const styles = StyleSheet.create({
  viewIndex: { flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' },
  scrollView: { flex: 1, width: '100%' }
})