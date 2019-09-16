import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  font: {
    fontFamily: 'Helvetica',
    fontSize: 10,
  }
});

export default () => (
  <View style={styles.container}>
    <Title>Overview</Title>
    <Text style={styles.font}>This document gives you an overview about your current search history and the distribution of language levels you searched for.</Text>
  </View>
);
