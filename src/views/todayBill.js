import React, {useState, useEffect} from 'react';
import {View, FlatList, DeviceEventEmitter} from 'react-native';

import Welcome from './components/welcome';
import EmptyCard from './components/emptyCard';
import BillsCard from './components/billsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getNowString} from '../toolFunctions/toolFunctions';

const BillDetails = () => {
  const todayTime = getNowString();
  const flatRenderCard = ({item}) => (
    <View style={{marginBottom: 28}}>
      <BillsCard {...item} />
    </View>
  );
  const [billsData, setBillsData] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('BillDetails').then(res => {
      let ObtainedBills = [];
      if (res !== null) {
        const resArray = JSON.parse(res);
        ObtainedBills = resArray.filter(bill => bill.time === todayTime);
        setBillsData(ObtainedBills);
      }
    });
  }, [todayTime]);
  useEffect(() => {
    const navigationListener = DeviceEventEmitter.addListener(
      'addDone',
      async e => {
        await AsyncStorage.getItem('BillDetails').then(res => {
          let ObtainedBills = [];
          const resArray = JSON.parse(res);
          ObtainedBills = resArray.filter(bill => bill.time === todayTime);
          setBillsData(ObtainedBills);
        });
      },
    );
    return () => {
      navigationListener.remove();
    };
  });
  return (
    <View>
      {JSON.stringify(billsData) === '[]' || !billsData[0] ? (
        <View>
          <View style={{marginBottom: 24}}>
            <Welcome />
          </View>
          <EmptyCard />
        </View>
      ) : (
        <FlatList
          data={billsData}
          renderItem={flatRenderCard}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{marginBottom: 24}}>
              <Welcome />
            </View>
          }
          ListFooterComponent={<View style={{height: 60}} />}
        />
      )}
    </View>
  );
};
export default BillDetails;
