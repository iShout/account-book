import React, {useState, useEffect} from 'react';
import {View, FlatList, DeviceEventEmitter, Text, Image} from 'react-native';

import EmptyCard from './components/emptyCard';
import BillsCard from './components/billsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TapBg from '../images/tap-bg.png';

const DisplayTypeSelector = () => {
  const typeText = ['流水', '日历'];
  return (
    <View
      style={{
        width: 180,
        height: 50,
        paddingStart: 12,
        paddingEnd: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      {typeText.map(ele => (
        <View key={ele} style={{width: 80}}>
          <Text
            style={{
              fontFamily: 'ZiZhiQuXiMaiTi',
              fontSize: 32,
              lineHeight: 50,
              textAlign: 'center',
            }}>
            {ele}
          </Text>
          <Image
            source={TapBg}
            style={{position: 'absolute', zIndex: -1, top: -26, left: 0}}
            width={'70%'}
            resizeMode="contain"
          />
        </View>
      ))}
    </View>
  );
};
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
      <DisplayTypeSelector />
      {JSON.stringify(billsData) === '[]' || !billsData[0] ? (
        <View>
          <EmptyCard />
        </View>
      ) : (
        <FlatList
          data={billsData}
          renderItem={flatRenderCard}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 60}} />}
        />
      )}
    </View>
  );
};
export default BillDetails;
