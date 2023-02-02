import React, {useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import PageContext from '../../appContext';

const IconTab = props => {
  const {text, icon, targetPage = 'TodayBill', navigation} = props;
  const setPage = useContext(PageContext);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(targetPage);
      }}>
      <View style={tabStyles.tabContainer}>
        <Image source={icon} style={tabStyles.iconStyle} />
        <Text style={tabStyles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
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

export default IconTab;
