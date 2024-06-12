import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido por Ana Caroline Araújo, Leocendino Cardoso e Ruan Felipe Negrão
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Alinha o conteúdo na parte inferior
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#555555',
    position: 'absolute',
    bottom: 0,
    width: '100%', // Garante que a largura seja 100%
  },
  footerText: {
    fontSize: 12,
    color: '#ffffff',
  },
});

export default Footer;
