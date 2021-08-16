import React from 'react';
import Race from '../models/Race';
import { Constants } from '../Constants';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const RaceItemView: React.FC<{
  item: Race
}> = ({ item, children }) => {
  return (
    <View style={raceStyles.container}
      {...children}>
      <View style={raceStyles.leftContainer}>
        <Text style={raceStyles.textCategory}>[{item.category}] </Text>
        <Text style={raceStyles.textName}>{item.meetingName}</Text>
        <Text style={raceStyles.textNumber}> ({item.raceNumber})</Text>
      </View>
      <Text style={raceStyles.textTime}>{item.countDownTime()}</Text>
    </View>
  );
};

const raceStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Constants.paddingHorizontal,
    paddingVertical: Constants.paddingVertical,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  textCategory: {
    fontSize: Constants.fontSizeRow,
    fontWeight: Constants.fontWeightRow as any,
  },
  textName: {
    fontSize: Constants.fontSizeRow,
  },
  textNumber: {
    fontSize: Constants.fontSizeRow,
  },
  textTime: {
    color: 'red',
    fontSize: Constants.fontSizeRow,
  }
});

export default RaceItemView;