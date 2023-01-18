import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import billsData from '../mock/billsData';

import Welcome from './components/welcome';
import EmptyCard from './components/emptyCard';
import BillsCard from './components/billsCard';
const BillDetails = () => {
  const flatRenderCard = ({item}) => (
    <View style={{marginBottom: 28}}>
      <BillsCard {...item} />
    </View>
  );
  return (
    <View>
      {JSON.stringify(billsData) === '[]' || !billsData[0] ? (
        <View>
          <View style={{marginBottom: 24}}>
            <Welcome />
          </View>
          <EmptyCard />
        </View>
      ) : (
        <FlatList
          data={billsData}
          renderItem={flatRenderCard}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{marginBottom: 24}}>
              <Welcome />
            </View>
          }
          ListFooterComponent={<View style={{height: 60}} />}
        />
      )}
    </View>
  );
};
export default BillDetails;
