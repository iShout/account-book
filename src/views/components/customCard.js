import React from 'react';
import {View, StyleSheet} from 'react-native';

const CustomCard = props => {
  const {height = 178, title, children} = props;
  return (
    <View style={[styles.cardBasic, {minHeight: height}]}>
      <View>{title}</View>
      <View style={{justifyContent: 'center'}}>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardBasic: {
    width: '96%',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
});
export default CustomCard;
