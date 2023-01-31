import React, {useState, useEffect} from 'react';
import {View, FlatList, DeviceEventEmitter} from 'react-native';

import Welcome from './components/welcome';
import EmptyCard from './components/emptyCard';
import BillsCard from './components/billsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BillDetails = () => {
  const flatRenderCard = ({item}) => (
    <View style={{marginBottom: 28}}>
      <BillsCard {...item} />
    </View>
  );
  const [billsData, setBillsData] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('BillDetails').then(res => {
      setBillsData(res !== null ? JSON.parse(res) : []);
    });
  }, []);
  useEffect(() => {
    const navigationListener = DeviceEventEmitter.addListener(
      'addDone',
      async e => {
        await AsyncStorage.getItem('BillDetails').then(res => {
          console.log(res, 'rrs');
          setBillsData(res !== null ? JSON.parse(res) : []);
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
