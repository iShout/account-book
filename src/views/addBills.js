import React, {useState, useContext, createContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import categoryColors from '../categoryColors.js';
import {randomPickArray} from '../toolFunctions/toolFunctions';
import * as icons from '../categoryIcons.js';
import lodash from 'lodash';
import addBillToggle from '../appContext';
import {verifyExistDate, saveBillToCache} from '../toolFunctions/toolFunctions';

// 支出，收入按钮
const TypeButton = props => {
  const {isTapped = false, btnText, setBillType, btnType} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        setBillType(btnType);
      }}>
      <View style={styles.typeButtonStyle}>
        {isTapped && <View style={styles.typeButtonTappedStyle} />}
        <Text
          style={{
            fontSize: 18,
            lineHeight: 36,
            color: '#fff',
            textAlign: 'center',
          }}>
          {btnText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
// categories的卡片
const CategoriesCard = props => {
  const {children} = props;
  return <View style={styles.categoriesCardStyle}>{children}</View>;
};
//category的图标
const CategoryIcon = props => {
  const {tapOpt} = props;
  const {
    icon = require('../images/categoryIcons/construction.png'),
    label = 'cafe',
  } = props;
  const themeColor = randomPickArray(categoryColors);
  const setKeyboardVisibility = useContext(addBillToggle);
  return (
    <TouchableOpacity
      onPress={() => {
        setKeyboardVisibility(true);
        tapOpt(label);
      }}>
      <View style={styles.categoryIconStyle}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: `${themeColor}`,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={icon}
            style={{width: 28, height: 28}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: 60,
            height: 18,
            borderRadius: 9,
            backgroundColor: `${themeColor}`,
          }}>
          <Text
            style={{
              textAlign: 'center',
              lineHeight: 18,
              color: '#000',
              fontSize: 12,
            }}>
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

//添加账单的键盘
const BillKeyboard = props => {
  const {type = '购物', billType, navigation} = props;
  const setKeyboardVisibility = useContext(addBillToggle);
  const [kbNumbers, setKbNumbers] = useState('0');
  const [billNote, setNote] = useState('');
  const updateKbNumbers = (label, isBackBtn = false) => {
    if (isBackBtn) {
      if (kbNumbers === '0') {
        return;
      } else {
        const backNumsArr = kbNumbers.split('');
        backNumsArr.pop();
        const backNums =
          JSON.stringify(backNumsArr) === '[]' ? '0' : backNumsArr.join('');
        setKbNumbers(backNums);
      }
    } else {
      if (kbNumbers === '0') {
        setKbNumbers(label);
      } else {
        setKbNumbers(kbNumbers + label);
      }
    }
  };
  // 按下ok键对数据进行保存
  const saveBillData = () => {
    const date = new Date();
    const month =
      date.getMonth() + 1 > 9
        ? (date.getMonth() + 1).toString()
        : '0' + (date.getMonth() + 1).toString();
    const time =
      date.getFullYear().toString() + month + date.getDate().toString();
    const group = type;
    const amount = kbNumbers;
    const note = billNote;
    const timeStamp = date.getTime();
    // const res = {time, group, amount, note};
    const res = {time, group, amount, note, billType, timeStamp};
    saveBillToCache(res)
      .then(result => {
        DeviceEventEmitter.emit('addDone', 'done');
        navigation.popToTop();
      })
      .catch(error => {
        console.error(error);
      });
  };
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const specialLetters = ['<-', '.', '0'];
  return (
    <View style={styles.keyboardStyle}>
      <View style={styles.keyboardTypeStyle}>
        <Text
          style={{
            textAlign: 'center',
            lineHeight: 28,
            fontFamily: 'ZiZhiQuXiMaiTi',
            letterSpacing: 4,
            color: '#9D9D9D',
          }}>
          {type}
        </Text>
      </View>
      <KeyboardInput amount={kbNumbers} setNote={setNote} />
      <View
        style={{
          width: '100%',
          paddingTop: 20,
          paddingBottom: 20,
          height: 234,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '75%',
            height: '100%',
            justifyContent: 'space-between',
          }}>
          {lodash.chunk(numbers, 3).map((row, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {row.map(row => (
                <KeyboardBtn
                  key={row}
                  label={row}
                  style={{width: '33.3%'}}
                  pressBtn={updateKbNumbers}
                />
              ))}
            </View>
          ))}
        </View>
        <View
          style={{
            width: '25%',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {specialLetters.map(letter => (
            <KeyboardBtn
              label={letter}
              pressBtn={updateKbNumbers}
              key={letter}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setKeyboardVisibility(false);
        }}>
        <View style={{width: '100%', height: 62, alignItems: 'center'}}>
          <KeyboardBtn label="OK" btnWidth={90} pressBtn={saveBillData} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
//键盘按钮
const KeyboardBtn = props => {
  const {label = '1', btnWidth = 48, pressBtn = () => {}} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        pressBtn(label, label === '<-');
      }}>
      <View
        style={{
          width: btnWidth,
          height: 48,
          borderRadius: 24,
          backgroundColor: '#73B0CD',
        }}>
        <Text
          style={{
            lineHeight: 48,
            textAlign: 'center',
            color: '#000',
            fontSize: 20,
            fontFamily: 'ZiZhiQuXiMaiTi',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
// 键盘输入框
const KeyboardInput = props => {
  const {amount, setNote} = props;
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F6F6F6',
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TextInput
        style={{width: '70%', height: '100%'}}
        placeholder="请在这里输入备注"
        onChangeText={text => {
          setNote(text);
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'ZiZhiQuXiMaiTi',
          lineHeight: 40,
        }}>
        ¥{amount.toLocaleString()}
      </Text>
    </View>
  );
};

//添加账单的主页面
const AddBills = ({navigation}) => {
  const [showKeyboard, setKeyboardVisibility] = useState(false);
  const [keyboardLabel, setKbLabel] = useState('');
  const [billType, setBillType] = useState('disburse');
  const billTypeMap = new Map([
    ['disburse', '支出'],
    ['income', '收入'],
  ]);
  return (
    <addBillToggle.Provider value={setKeyboardVisibility}>
      <View style={{flex: 1, paddingTop: 32}}>
        <View style={{padding: 16, flex: 1, alignItems: 'center'}}>
          <View
            style={{
              width: 288,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 46,
            }}>
            {['disburse', 'income'].map((item, index) => (
              <TypeButton
                key={item}
                btnText={billTypeMap.get(item)}
                btnType={item}
                isTapped={billType === item ? true : false}
                setBillType={setBillType}
              />
            ))}
          </View>
          <CategoriesCard>
            {lodash.chunk(icons[`${billType}Icons`], 3).map((row, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                {row.map((category, index) => (
                  <View
                    style={{width: '33.3%', alignItems: 'center'}}
                    key={index}>
                    <CategoryIcon {...category} tapOpt={setKbLabel} />
                  </View>
                ))}
              </View>
            ))}
          </CategoriesCard>
        </View>
        {showKeyboard && (
          <BillKeyboard
            type={keyboardLabel}
            billType={billType}
            navigation={navigation}
          />
        )}
      </View>
    </addBillToggle.Provider>
  );
};

const styles = StyleSheet.create({
  typeButtonStyle: {
    width: 120,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#73B0CD',
    overflow: 'hidden',
  },
  typeButtonTappedStyle: {
    width: 72,
    height: 72,
    position: 'absolute',
    bottom: -4,
    left: -14,
    zIndex: -1,
    borderRadius: 36,
    backgroundColor: '#A8DFF1',
  },
  categoriesCardStyle: {
    width: 343,
    minHeight: 348,
    paddingTop: 42,
    paddingBottom: 42,
    justifyContent: 'flex-start',
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
  categoryIconStyle: {
    width: 60,
    height: 79,
    justifyContent: 'space-between',
  },
  keyboardStyle: {
    width: 343,
    minHeight: 308,
    paddingTop: 36,
    paddingLeft: 36,
    paddingRight: 36,
    justifyContent: 'flex-start',
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
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: [{translateX: -171.5}],
  },
  keyboardTypeStyle: {
    width: 72,
    height: 28,
    borderRadius: 14,
    position: 'absolute',
    left: 20,
    top: 4,
  },
});

export default AddBills;
