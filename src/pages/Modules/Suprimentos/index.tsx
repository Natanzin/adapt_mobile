import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { AppParamsList } from '../../../routes/app.routes'
import ButtonMenu from '../../../components/buttonMenu';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import colors from '../../../styles/colors';
import { ActivityIndicator } from 'react-native-paper';

const Suprimentos = (props: { navigation: StackNavigationProp<AppParamsList> }) => {

  const { user } = useAuth()
  const [transf, setTransf] = useState<any>()

  async function getQtdTransferencia() {
    try {
      const { data } = await api.get(`/adapt/contar_transferencia/${user?.USU_IN_CODIGO}/org/${user?.ORG_IN_CODIGO}`)
      if (data) {
        setTransf(data)
      } else {
        setTransf(0)
      }
    } catch (e) {
      console.log(`Deu ruim na contagem das transferências: ${e}`)
    }
  }

  useEffect(() => {
    getQtdTransferencia()
  }, [])

  return (
    <View style={styles.viewIndex}>
      <ScrollView style={styles.scrollView}>
        <ButtonMenu
          route={() => props.navigation.navigate('Estoque')}
          source={require('../../../assets/imagens/Prancheta2.png')}
          title='Estoque'
        />
        <View style={{ zIndex: 1 }}>
          <View style={styles.viewCont}>
            <Text children={transf} style={{ color: colors.default_branco, fontWeight: 'bold' }} />
          </View>
        </View>
        <View style={{ zIndex: 0 }}>
          <ButtonMenu
            route={() => props.navigation.navigate('Transferencia')}
            source={require('../../../assets/imagens/Prancheta3.png')}
            title='Transferência'
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Suprimentos;

const styles = StyleSheet.create({
  viewIndex: { flex: 1, alignItems: 'center', backgroundColor: '#f0f0f0' },
  scrollView: { flex: 1, width: '100%' },
  viewCont: {
    width: 25, height: 25, backgroundColor: colors.default_azul_claro, borderRadius: 360, alignItems: 'center', justifyContent: 'center',
    position: 'absolute', top: 14, left: 21
  }
})