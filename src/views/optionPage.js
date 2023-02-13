import React from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomCard from './components/customCard';
import user from '../mock/userInfo';

const Title = props => {
  const {titleText} = props;
  return (
    <View style={{width: '100%', height: 32}}>
      <Text style={styles.titleStyle}>{titleText}</Text>
    </View>
  );
};
//用户信息组件
const UserInfo = props => {
  const {userDetail} = props;
  //头像组件
  const Avator = props => {
    const {image} = props;
    return (
      <View
        style={{width: 72, height: 72, borderRadius: 36, overflow: 'hidden'}}>
        <Image style={{width: '100%', height: '100%'}} source={image} />
      </View>
    );
  };
  //其他信息的组件
  const Details = props => {
    const detailStyle = StyleSheet.create({
      userName: {
        fontSize: 24,
        fontFamily: 'ZiZhiQuXiMaiTi',
      },
      billDaysText: {
        fontSize: 12,
        fontFamily: 'ZiZhiQuXiMaiTi',
        color: '#c2c2c2',
      },
    });
    const {user} = props;
    return (
      <View style={{width: '100%', height: 72, justifyContent: 'space-around'}}>
        <Text style={detailStyle.userName}>{user.name}</Text>
        <Text style={detailStyle.billDaysText}>
          已记账{user.makingBillDays}天
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        width: '100%',
        height: 72,
        flexDirection: 'row',
      }}>
      <Avator image={userDetail.avator} />
      <View style={{marginLeft: 24}}>
        <Details user={user} />
      </View>
    </View>
  );
};

const OptionPage = () => {
  return (
    <View style={{paddingTop: 20}}>
      <View style={{marginBottom: 28}}>
        <CustomCard height={120}>
          <UserInfo userDetail={user} />
        </CustomCard>
      </View>
      <View style={{marginBottom: 28}}>
        <CustomCard height={180} title={<Title titleText="常用功能" />} />
      </View>
      <View style={{marginBottom: 28}}>
        <CustomCard height={180} title={<Title titleText="其它" />} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontFamily: 'ZiZhiQuXiMaiTi',
    lineHeight: 32,
  },
});

export default OptionPage;
