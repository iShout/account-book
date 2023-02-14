import React from 'react';
import {
  View,
  FlatList,
  DeviceEventEmitter,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import CustomCard from './components/customCard';
import user from '../mock/userInfo';

const commonFunctions = [
  {
    functionName: '预算',
    icon: require('../images/budget.png'),
    targetRoute: '',
  },
];
const otherFunctions = [
  {
    functionName: '音效',
    icon: require('../images/volume.png'),
  },
  {
    functionName: '震动',
    icon: require('../images/vibrate.png'),
  },
];

const Title = props => {
  const {titleText} = props;
  return (
    <View style={{width: '100%', height: 32, marginBottom: 8}}>
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
//常用功能组件ui封装
const CommonFuntion = props => {
  const {functionName, icon, targetRoute} = props;
  const functionStyles = StyleSheet.create({
    functionSize: {
      width: 48,
      height: 72,
      justifyContent: 'space-between',
    },
    iconContainer: {
      width: 48,
      height: 48,
    },
    imageSize: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    textStyle: {
      fontSize: 12,
      textAlign: 'center',
    },
  });
  return (
    <TouchableOpacity>
      <View style={functionStyles.functionSize}>
        <View style={functionStyles.iconContainer}>
          <Image style={functionStyles.imageSize} source={icon} />
        </View>
        <Text style={functionStyles.textStyle}>{functionName}</Text>
      </View>
    </TouchableOpacity>
  );
};
//其它组件的ui封装
const OtherFunctionListItem = props => {
  const {functionName, icon} = props;
  const funtionListItemStyle = StyleSheet.create({
    listContainer: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      height: '100%',
      marginLeft: 6,
      borderBottomColor: '#f0f0f0',
      borderBottomWidth: 1,
      alignItems: 'center',
    },
    textStyle: {
      lineHeight: 32,
      textAlign: 'left',
      fontSize: 16,
    },
    iconStyle: {
      width: 32,
      height: 32,
      resizeMode: 'center',
    },
  });
  return (
    <View style={funtionListItemStyle.listContainer}>
      <Image style={funtionListItemStyle.iconStyle} source={icon} />
      <View style={funtionListItemStyle.textContainer}>
        <Text style={funtionListItemStyle.textStyle}>{functionName}</Text>
        <Switch />
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
        <CustomCard height={180} title={<Title titleText="常用功能" />}>
          <View style={styles.commonFunctionsContainer}>
            {commonFunctions.map(func => (
              <View
                style={{width: '25%', alignItems: 'center', marginBottom: 12}}
                key={func.functionName}>
                <CommonFuntion {...func} />
              </View>
            ))}
          </View>
        </CustomCard>
      </View>
      <View style={{marginBottom: 28}}>
        <CustomCard height={180} title={<Title titleText="其它" />}>
          {otherFunctions.map(func => (
            <OtherFunctionListItem {...func} key={func.functionName} />
          ))}
        </CustomCard>
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
  commonFunctionsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default OptionPage;
