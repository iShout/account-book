import React from 'react';
import {View, StyleSheet} from 'react-native';

import ButtomBar from './components/buttomBar';
import BillDetails from './billDetails';
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

const AppIndex = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingTop: 32}}>
      <AppContext.Provider value={navigation}>
        <View
          style={{
            flex: 1,
            padding: 16,
          }}>
          <BillDetails />
        </View>
        <View style={styles.barStyle}>
          <ButtomBar />
        </View>
      </AppContext.Provider>
    </View>
  );
};
export default AppIndex;
