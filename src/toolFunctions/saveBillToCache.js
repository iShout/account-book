import AsyncStorage from '@react-native-async-storage/async-storage';
import verifyExistDate from './verifyExistDate';

const setStorageItem = async (data, time) => {
  // 获取本地存储中的所有数据,如果没有数据就直接上传，有数据合并后再上传
  await AsyncStorage.getItem('BillDetails').then(async res => {
    if (res) {
      const resArr = JSON.parse(res);
      resArr.forEach(item => {
        if (item.time === time) {
          item.details = JSON.parse(JSON.stringify(data.details));
        }
      });
      return await AsyncStorage.setItem('BillDetails', JSON.stringify(resArr));
    } else {
      const newBill = [];
      newBill.push(data);
      const jsonBill = JSON.stringify(newBill);
      return await AsyncStorage.setItem('BillDetails', jsonBill);
    }
  });
};
const saveBillToCache = async bill => {
  //验证本地存储中，当前时间下是否存在数据。不存在直接上传，存在的话push进已存在的数据
  return verifyExistDate(bill.time).then(res => {
    if (res) {
      res.details.push(bill);
      setStorageItem(res, bill.time);
    } else {
      const detail = [];
      detail.push(bill);
      const template = {
        time: bill.time,
        details: detail,
      };
      setStorageItem(template, bill.time);
    }
  });
};

export default saveBillToCache;
