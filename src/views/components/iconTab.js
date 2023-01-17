import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const tabStyles = StyleSheet.create({
  tabContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 10,
    color: '#fff',
  },
  iconStyle: {
    width: 48,
    height: 36,
  },
});

const IconTab = props => {
  const {text, icon} = props;
  return (
    <View style={tabStyles.tabContainer}>
      <Image source={icon} style={tabStyles.iconStyle} />
      <Text style={tabStyles.textStyle}>{text}</Text>
    </View>
  );
};

export default IconTab;
