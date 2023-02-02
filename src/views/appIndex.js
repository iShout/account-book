import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ButtomBar from './components/buttomBar';
import BillDetails from './billDetails';
import TodayBill from './todayBill';
import AppContext from '../appContext';

const styles = StyleSheet.create({
  barStyle: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const BottomTab = createBottomTabNavigator();
//底部自定义导航
const BottomNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <ButtomBar {...props} />}
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen name="TodayBill" component={TodayBill} />
      <BottomTab.Screen name="BillDetails" component={BillDetails} />
    </BottomTab.Navigator>
  );
};
const AppIndex = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingTop: 32}}>
      <AppContext.Provider value={navigation}>
        <View
          style={{
            flex: 1,
            padding: 16,
          }}>
          <BottomNavigator />
        </View>
        {/* <View style={styles.barStyle}>
        </View> */}
      </AppContext.Provider>
    </View>
  );
};
export default AppIndex;
