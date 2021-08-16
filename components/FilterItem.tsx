import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Constants } from '../Constants';

const FilterItem: React.FC<{
  title?: string,
  value?: boolean,
  onValueChange?: (value: boolean) => void | Promise<void>,
}> = ({ title = '', value, onValueChange, children }) => {

  return (
    <View style={filterItemStyles.container}
      {...children}>
      <Text style={filterItemStyles.title}>{title}</Text>
      <Switch onValueChange={value => {
        if (onValueChange) onValueChange(value);
      }} value={value} />
    </View>
  );
}

const filterItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Constants.paddingHorizontal,
    paddingVertical: Constants.paddingVertical,
  },
  title: {
    fontSize: Constants.fontSizeRow,
    fontWeight: Constants.fontWeightRow as any,
  },
});

export default FilterItem;