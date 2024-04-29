import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Headline = ({headline}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headline?.title}</Text>
    </View>
  );
};

export default React.memo(Headline);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#322C2B',
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    minHeight: 50,
  },
  title: {
    color: '#E4C59E',
  },
});
