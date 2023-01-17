import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import ButtomBar from './components/buttomBar';
import BillDetails from './billDetails';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const AppIndex = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingTop: 32}}>
      <View
        style={{
          flex: 1,
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BillDetails />
      </View>
      <View style={styles.barStyle}>
        <ButtomBar />
      </View>
    </View>
  );
};
export default AppIndex;
