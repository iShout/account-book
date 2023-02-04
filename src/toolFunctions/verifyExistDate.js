import AsyncStorage from '@react-native-async-storage/async-storage';
const verifyExistDate = async (dateString, storageName) => {
  return await AsyncStorage.getItem(storageName).then(jsonRes => {
    if (jsonRes === null) {
      return undefined;
    } else {
      const res = JSON.parse(jsonRes);
      const bills = res.find(bill => bill.time === dateString);
      return bills;
    }
  });
};

export default verifyExistDate;
