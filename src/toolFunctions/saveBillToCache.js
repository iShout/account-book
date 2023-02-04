import AsyncStorage from '@react-native-async-storage/async-storage';
import verifyExistDate from './verifyExistDate';

/**
 * @param {object} data 账单详情
 * @param {string} time 存入的账单数据时间
 * @param {string} storageName 存入的存储库名称
 */
const setStorageItem = async (data, time, storageName = 'BillDetails') => {
  // 获取本地存储中的所有数据,如果没有数据就直接上传，有数据合并后再上传
  await AsyncStorage.getItem(storageName).then(async res => {
    if (res) {
      const resArr = JSON.parse(res);
      let timeIsExist = false;
      resArr.forEach(item => {
        if (item.time === time) {
          timeIsExist = true;
          item.details = JSON.parse(JSON.stringify(data.details));
        }
      });
      if (!timeIsExist) {
        resArr.unshift(data);
      }
      return await AsyncStorage.setItem(storageName, JSON.stringify(resArr));
    } else {
      const newBill = [];
      newBill.push(data);
      const jsonBill = JSON.stringify(newBill);
      return await AsyncStorage.setItem(storageName, jsonBill);
    }
  });
};
/**
 * @param {object} bill 账单详情
 * @param {string} storageName 存入的存储库名称
 * @return {array | undefined} 验证账单所在的时间是否已存在账单数据
 */
const saveBillToCache = async (bill, storageName) => {
  //验证本地存储中，当前时间下是否存在数据。不存在直接上传，存在的话push进已存在的数据
  return verifyExistDate(bill.time, storageName).then(res => {
    if (res) {
      res.details.push(bill);
      setStorageItem(res, bill.time, storageName);
    } else {
      const detail = [];
      detail.push(bill);
      const template = {
        time: bill.time,
        details: detail,
      };
      setStorageItem(template, bill.time, storageName);
    }
  });
};

export default saveBillToCache;
