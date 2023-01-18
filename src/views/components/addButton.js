import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinePlus from '../../images/line-plus.png';

const styles = StyleSheet.create({
  addBotton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dfff17',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AddButton = () => {
  return (
    <View style={styles.addBotton}>
      <Image source={LinePlus} />
    </View>
  );
};

export default AddButton;
