import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {
  isHapticEnabled,
  hapticToTarget,
} from '../redux/features/haptic/hapticSlice';

import ButtomBar from './components/buttomBar';
import BillDetails from './billDetails';
import TodayBill from './todayBill';
import StatisticPage from './statisticPage';
import OptionPage from './optionPage';
import AppContext from '../appContext';

const BottomTab = createBottomTabNavigator();
//底部自定义导航
const BottomNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <ButtomBar {...props} />}
      initialRouteName="TodayBill"
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen name="TodayBill" component={TodayBill} />
      <BottomTab.Screen name="BillDetails" component={BillDetails} />
      <BottomTab.Screen name="StatisticPage" component={StatisticPage} />
      <BottomTab.Screen name="OptionPage" component={OptionPage} />
    </BottomTab.Navigator>
  );
};
const AppIndex = ({navigation}) => {
  const hapticStatus = useSelector(isHapticEnabled);
  const dispatch = useDispatch();
  const getAppSetup = async () => {
    return await AsyncStorage.getItem('GlobalOptions');
  };
  useEffect(() => {
    getAppSetup().then(resJSON => {
      const res = JSON.parse(resJSON);
      if (res && res.hapticSetup !== undefined) {
        dispatch(hapticToTarget(res.hapticSetup));
      } else {
        const hapticSetup = {
          hapticSetup: hapticStatus,
        };
        res === null
          ? AsyncStorage.setItem('GlobalOptions', JSON.stringify(hapticSetup))
          : AsyncStorage.mergeItem(
              'GlobalOptions',
              JSON.stringify(hapticSetup),
            );
      }
    });
  }, []);
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
      </AppContext.Provider>
    </View>
  );
};
export default AppIndex;
