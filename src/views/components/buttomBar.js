import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';

import AddButton from './addButton.js';
import IconTab from './iconTab.js';
import AppContext from '../../appContext.js';
import HapticFeedbackView from './hapticFeedbackView';

const styles = StyleSheet.create({
  barBasic: {
    width: '100%',
    height: 50,
    backgroundColor: '#1890ff',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingStart: 16,
    paddingEnd: 16,
    bottom: 12,
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

const ButtomBar = props => {
  const {navigation, state} = props;
  const navi = useContext(AppContext);
  return (
    <View style={styles.barBasic}>
      <View style={styles.tabPosition}>
        <IconTab
          icon={require('../../images/index-icon.png')}
          text="首页"
          targetPage="TodayBill"
          navigation={navigation}
        />
        <IconTab
          icon={require('../../images/bills-icon.png')}
          text="账单"
          targetPage="BillDetails"
          navigation={navigation}
        />
      </View>
      <View style={styles.addPosition}>
        <HapticFeedbackView
          onPress={() => {
            navi.navigate('AddBills');
          }}>
          <AddButton />
        </HapticFeedbackView>
      </View>
      <View style={styles.tabPosition}>
        <IconTab
          icon={require('../../images/statistic-icon.png')}
          text="统计"
          targetPage="StatisticPage"
          navigation={navigation}
        />
        <IconTab
          icon={require('../../images/option-icon.png')}
          text="我的"
          targetPage="OptionPage"
          navigation={navigation}
        />
      </View>
    </View>
  );
};
export default ButtomBar;
