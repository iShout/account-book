import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const welcomeStyles = StyleSheet.create({
  welcomeLayout: {
    flexDirection: 'row',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 24,
    lineHeight: 75,
    fontFamily: 'ZiZhiQuXiMaiTi',
  },
});

const Welcome = () => {
  return (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.removeItem('BillDetails').then(() => {
          console.error('全部数据已删除');
        });
      }}>
      <View style={welcomeStyles.welcomeLayout}>
        <Image source={require('../../images/sunny.png')} />
        <Text style={welcomeStyles.welcomeText}>记个账呗</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Welcome;
