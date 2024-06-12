import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}></Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
   
    backgroundColor: '#ffffff', //cabeçalho
  },
  headerText: {
    fontSize: 30,
    color: '#000000',
  },
});

export default Header;
