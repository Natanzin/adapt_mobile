import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const Loading: React.FC = () => {
  return (
      <View style={styles.container}>
          <ActivityIndicator size={50 || 'large'} color="#005685" />
          <Text children='Carregando...' style={styles.textLoading} numberOfLines={1} ellipsizeMode={'clip'} adjustsFontSizeToFit={true} />
      </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0' },
    textLoading: { fontSize: 25, fontWeight: 'bold', color: '#005685' }
})