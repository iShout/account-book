import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const welcomeStyles = StyleSheet.create({
  welcomeLayout: {
    flexDirection: 'row',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 24,
    lineHeight: 75,
  },
});

const Welcome = () => {
  return (
    <View style={welcomeStyles.welcomeLayout}>
      <Image source={require('../../images/sunny.png')} />
      <Text style={welcomeStyles.welcomeText}>记个账呗</Text>
    </View>
  );
};
export default Welcome;
