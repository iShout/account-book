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
import {disburse, income} from '../toolFunctions/calendarConfig';
import {
  getNowString,
  numberToDash,
  dashToNumber,
} from '../toolFunctions/toolFunctions';

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
  // 账单数据详情数据
  const [billsData, setBillsData] = useState([]);
  // 账单详情type
  const [billDetailsType, setBillType] = useState('日历');
  //日历选中时间，默认今天
  const todayString = getNowString();
  const [selectedTime, setSelectedTime] = useState(numberToDash(todayString));
  useEffect(() => {
    AsyncStorage.getItem('BillDetails').then(res => {
      console.log(res, 'reess');
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
              ListFooterComponent={<View style={{height: 220}} />}
            />
          )}
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <Calendar
              onDayPress={day => {
                console.log(day, 'daysss');
                setSelectedTime(day.dateString);
              }}
              enableSwipeMonths={true}
              style={{marginBottom: 24, width: '100%'}}
              markingType={'multi-dot'}
              markedDates={{
                [selectedTime]: {selected: true, dots: [income, disburse]},
              }}
              // dayComponent={day => <Text>{day}</Text>}
            />
          </View>
          <EmptyCard />
        </View>
      )}
    </View>
  );
};
export default BillDetails;
