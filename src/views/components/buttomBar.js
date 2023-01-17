import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import AddButton from './addButton.js';
import IconTab from './iconTab.js';

const styles = StyleSheet.create({
  barBasic: {
    width: '90%',
    height: 50,
    backgroundColor: '#1890ff',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingStart: 16,
    paddingEnd: 16,
  },
  addPosition: {
    bottom: 24,
  },
  tabPosition: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const ButtomBar = () => {
  return (
    <View style={styles.barBasic}>
      <View style={styles.tabPosition}>
        <IconTab icon={require('../../Images/index-icon.png')} text="首页" />
        <IconTab icon={require('../../Images/bills-icon.png')} text="账单" />
      </View>
      <View style={styles.addPosition}>
        <AddButton />
      </View>
      <View style={styles.tabPosition}>
        <IconTab
          icon={require('../../Images/statistic-icon.png')}
          text="统计"
        />
        <IconTab icon={require('../../Images/option-icon.png')} text="我的" />
      </View>
    </View>
  );
};
export default ButtomBar;
