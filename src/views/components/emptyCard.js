import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const cardStyles = StyleSheet.create({
  // 卡片基本样式
  cardBasic: {
    width: '96%',
    height: 178,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 28,
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
  //立即记账按钮样式
  billButtonStyle: {
    width: 160,
    height: 40,
    backgroundColor: '#1890ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const MakeBillButton = () => {
  return (
    <View style={cardStyles.billButtonStyle}>
      <Text style={{color: '#fff', textAlign: 'center'}}>立即记账</Text>
    </View>
  );
};
const EmptyCard = () => {
  return (
    <View style={cardStyles.cardBasic}>
      <View style={{width: '100%', height: 40, flexDirection: 'row'}}>
        <Image source={require('../../Images/laba.png')} />
        <Text style={cardStyles.textStyle}>当前还没有记录哦</Text>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 28,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MakeBillButton />
      </View>
    </View>
  );
};

export default EmptyCard;
