import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';

import AddButton from './addButton.js';
import IconTab from './iconTab.js';
import AppContext from '../../appContext.js';

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
  const navi = useContext(AppContext);
  return (
    <View style={styles.barBasic}>
      <View style={styles.tabPosition}>
        <IconTab icon={require('../../images/index-icon.png')} text="首页" />
        <IconTab icon={require('../../images/bills-icon.png')} text="账单" />
      </View>
      <View style={styles.addPosition}>
        <TouchableOpacity
          onPress={() => {
            navi.navigate('AddBills');
          }}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <View style={styles.tabPosition}>
        <IconTab
          icon={require('../../images/statistic-icon.png')}
          text="统计"
        />
        <IconTab icon={require('../../images/option-icon.png')} text="我的" />
      </View>
    </View>
  );
};
export default ButtomBar;
