import React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import {analyseTimeString} from '../../toolFunctions/toolFunctions';

import iconList from '../../iconList';

const Dot = () => {
  return (
    <View
      style={{
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#a0a0a0',
      }}
    />
  );
};
//右上角 更多按钮
const More = () => {
  return (
    <View
      style={{
        width: 4,
        height: 18,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {[1, 2, 3].map(index => (
        <Dot key={index} />
      ))}
    </View>
  );
};
//账单列表item
const BillsList = props => {
  const {group, billType, note, amount} = props;
  return (
    <View style={cardStyles.listItemStyle}>
      <Text style={cardStyles.listItemText}>
        {group}-{note}
      </Text>
      <Text style={cardStyles.listItemText}>
        {billType === 'income' ? '+' : '-'}
        {amount}元
      </Text>
    </View>
  );
};

const randomPick = array => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

const BillsCard = props => {
  const {time, details} = props;
  const timeObj = analyseTimeString(time);
  const renderListItem = ({item}) => <BillsList {...item} />;
  return (
    <View style={cardStyles.cardBasic}>
      {/* 卡片more操作按钮,pos:absolute */}
      <View
        style={{
          width: 20,
          height: 20,
          position: 'absolute',
          right: 16,
          top: 36,
        }}>
        <More />
      </View>
      {/* 时间 */}
      <View
        style={{
          width: '100%',
          height: 40,
          flexDirection: 'row',
          marginBottom: 24,
        }}>
        <View
          style={{
            minWidth: 60,
            minHeight: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={randomPick(iconList)}
            style={{width: 48}}
            resizeMode="contain"
          />
        </View>
        <View style={{marginLeft: 16}}>
          <Text
            style={{
              fontSize: 22,
              lineHeight: 48,
              color: '#2e2e2e',
              fontWeight: '600',
            }}>
            {timeObj.month}月{timeObj.days}日
            <Text style={{fontSize: 12}}>{timeObj.year}年</Text>
          </Text>
        </View>
      </View>
      <View>
        <FlatList data={details} renderItem={renderListItem} />
      </View>
      {/* 结余角标,pos:absolute */}
      <View style={{position: 'absolute', bottom: 16, right: 24}}>
        <Text style={{color: '#c2c2c2'}}>结余: 888元</Text>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  // 卡片基本样式
  cardBasic: {
    width: '96%',
    minHeight: 178,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 28,
    paddingBottom: 48,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  //卡片的文字样式
  textStyle: {
    width: 178,
    height: 40,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 40,
    marginLeft: 16,
  },
  //账单的list样式
  listItemStyle: {
    width: '100%',
    height: 48,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //账单list的文字样式
  listItemText: {
    fontSize: 16,
    lineHeight: 48,
  },
});

export default BillsCard;
