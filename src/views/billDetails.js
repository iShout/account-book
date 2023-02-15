import React, {useState, useEffect, createContext} from 'react';
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
import HapticFeedbackView from './components/hapticFeedbackView';

import TapBg from '../images/tap-bg.png';

/**
 * @param {object} bills 账单数据
 * @param {strign} selectedDate 被选中的日期，格式'xxxx-xx-xx'
 * @return {object} 用于标记日历的数据
 */
const calendarExtraInfo = (bills, selectedDate) => {
  const markedDate = {};
  bills.forEach(bill => {
    const dashTime = numberToDash(bill.time);
    const disburseArr = bill.details.filter(
      billItem => billItem.billType === 'disburse',
    );
    const incomeArr = bill.details.filter(
      billItem => billItem.billType === 'income',
    );
    const dotsArr = [];
    if (disburseArr.length) {
      dotsArr.push(disburse);
    }
    if (incomeArr.length) {
      dotsArr.push(income);
    }
    markedDate[dashTime] = {dots: dotsArr};
  });
  markedDate[selectedDate] = Object.assign(markedDate[selectedDate] || {}, {
    selected: true,
  });
  return markedDate;
};

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
        <HapticFeedbackView
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
        </HapticFeedbackView>
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
  // 选中日期的账单详情数据
  const [selectedDateData, setSelectedData] = useState([]);
  // 账单详情type
  const [billDetailsType, setBillType] = useState('日历');
  //日历选中时间，默认今天
  const todayString = getNowString();
  const [selectedTime, setSelectedTime] = useState(numberToDash(todayString));
  //查询的账单存储库名，默认本月
  const [storageName, setStorageName] = useState(
    `Bill-${getNowString('month')}`,
  );
  const DateContext = createContext();
  //存储库名
  useEffect(() => {
    AsyncStorage.getItem(storageName).then(res => {
      setBillsData(res !== null ? JSON.parse(res) : []);
      setSelectedData(
        JSON.parse(res).filter(
          bill => bill.time === dashToNumber(selectedTime),
        ),
      );
    });
  }, [storageName, selectedTime]);
  useEffect(() => {
    const navigationListener = DeviceEventEmitter.addListener(
      'addDone',
      async e => {
        await AsyncStorage.getItem(storageName).then(res => {
          setBillsData(res !== null ? JSON.parse(res) : []);
          setSelectedData(
            JSON.parse(res).filter(
              bill => bill.time === dashToNumber(selectedTime),
            ),
          );
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
                setSelectedTime(day.dateString);
              }}
              enableSwipeMonths={true}
              style={{marginBottom: 24, width: '100%'}}
              markingType={'multi-dot'}
              markedDates={calendarExtraInfo(billsData, selectedTime)}
            />
          </View>
          <View>
            {JSON.stringify(selectedDateData) === '[]' ||
            !selectedDateData[0] ? (
              <View>
                <EmptyCard />
              </View>
            ) : (
              <FlatList
                data={selectedDateData}
                renderItem={flatRenderCard}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{height: 60}} />}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};
export default BillDetails;
