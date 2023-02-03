import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import EmptyCard from './components/emptyCard';
import BillsCard from './components/billsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import '../toolFunctions/calendarConfig';

import TapBg from '../images/tap-bg.png';

const DisplayTypeSelector = props => {
  const {displayType, setBillType} = props;
  const typeText = ['流水', '日历'];
  return (
    <View
      style={{
        width: 180,
        height: 75,
        paddingStart: 12,
        paddingEnd: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      {typeText.map(ele => (
        <TouchableOpacity
          key={ele}
          onPress={() => {
            setBillType(ele);
          }}>
          <View key={ele} style={{width: 80, justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'ZiZhiQuXiMaiTi',
                fontSize: 32,
                lineHeight: 75,
                textAlign: 'center',
              }}>
              {ele}
            </Text>
            {ele === displayType && (
              <Image
                source={TapBg}
                style={{position: 'absolute', zIndex: -1, top: -16, left: 0}}
                width={'70%'}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
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
  const [billDetailsType, setBillType] = useState('日历');
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
      <View style={{marginBottom: 24}}>
        <DisplayTypeSelector
          displayType={billDetailsType}
          setBillType={setBillType}
        />
      </View>
      {billDetailsType === '流水' ? (
        <View>
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
      ) : (
        <Calendar
          onDayPress={day => {
            console.log(day, 'daysss');
          }}
          enableSwipeMonths={true}
          // dayComponent={day => <Text>{day}</Text>}
        />
      )}
    </View>
  );
};
export default BillDetails;
