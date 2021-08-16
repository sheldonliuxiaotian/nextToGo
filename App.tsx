/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import Race from './models/Race';
import { RacingCategory, Constants } from './Constants';
import { getNextRaces } from './services/Services';
import RaceItemView from './components/RaceItemView';
import FilterGroup from './components/FilterGroup';

const App = () => {
  const [list, setList] = useState<Race[]>([]);
  const [filteredList, setFilteredList] = useState<Race[]>([]);
  const [filter, setFilter] = useState<RacingCategory[]>([]);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  let timer: NodeJS.Timer;

  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      filterData(list, filter);
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [list, filter]);

  const retrieveData = (count = 50) => {
    if (isRefreshing) return;
    setRefreshing(true);
    getNextRaces(count).then(res => {
      setRefreshing(false);
      if (res) {
        let now = new Date();
        let list = Object.values(res)
          // Map json to Race
          .map(item => new Race(item))
          // Filter out old races
          .filter(item => item.isOneMinPast(now) == false)
          // Sort from earliest to lates
          .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

        setList(list);
        filterData(list, filter, count + 50);
      }
    }).catch(error => {
      Alert.alert('Error', error.toString());
    })
  }

  const filterData = (list: Race[], categories: RacingCategory[] = [], count: number = 50) => {
    if (categories.length == 0) {
      categories = Object.values(RacingCategory);
    }

    let now = new Date();

    let newlist = list
      // filter as per start time
      .filter(race => race.isOneMinPast(now) == false)
      // filter as per categories
      .filter(race => categories.includes(race.category))
      // select the top 5
      .slice(0, 5);

    if (newlist.length >= 5) {
      setFilteredList(newlist);
    } else {
      retrieveData(count);
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Next to Go</Text>
      <FilterGroup
        options={Object.values(RacingCategory).filter(item => item !== RacingCategory.Unknown)}
        onFilterChange={(categories) => {
          setFilter(categories as RacingCategory[]);
          filterData(list, categories as RacingCategory[]);
        }} />
      <FlatList
        onRefresh={() => {
          retrieveData();
        }}
        refreshing={isRefreshing}
        data={filteredList}
        keyExtractor={(item) => item.raceId ?? ''}
        renderItem={({ index, item }) => (
          <RaceItemView item={item} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Constants.fontSizeTitle,
    fontWeight: Constants.fontWeightTitle as any,
    marginTop: 32,
    paddingHorizontal: Constants.paddingHorizontal,
  },
});

export default App;
