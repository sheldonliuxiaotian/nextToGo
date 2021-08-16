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
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

//#region Services
const getNextRaces = (count: number = 50) => {
  let url: string = `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${count}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(json => {
      let res = json as NedResponse
      let data = res.data
      return data?.race_summaries
    })
}
//#endregion

//#region Interfaces
interface NedResponse {
  status?: number;
  data?: NedReponseData;
  message?: string;
}

interface NedReponseData {
  next_to_go_ids?: string[];
  race_summaries?: { [id: string]: RaceResponse };
}

interface RaceResponse {
  race_id?: string;
  meeting_name?: string;
  race_number?: number
  category_id?: string;
  advertised_start?: { seconds?: number };
}
//#endregion

//#region Models
class Race {
  public raceId?: string;
  public meetingName?: string;
  public raceNumber: number;
  public category: RacingCategory;
  public startTime: Date;

  constructor(json: RaceResponse) {
    this.raceId = json.race_id;
    this.meetingName = json.meeting_name;
    this.raceNumber = json.race_number ?? 0;
    this.category = RACING_CATEGORIES[json.category_id ?? ''] ?? RacingCategory.Unknown;
    this.startTime = json.advertised_start?.seconds ? new Date(json.advertised_start.seconds * 1000) : new Date();
  }

  countDownTime(): string {
    let diff = (this.startTime.getTime() - new Date().getTime()) / 1000;
    let sign = Math.sign(diff);
    let timeInSeconds = Math.abs(diff);

    let seconds = Math.floor(timeInSeconds % 60);
    let timeInMinutes = Math.floor(timeInSeconds / 60);
    let minutes = Math.floor(timeInMinutes % 60);
    let hours = Math.floor(timeInMinutes / 60);

    return `${sign < 0 ? '-' : ''}${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${seconds}s`
  }

  isOneMinPast(from: Date = new Date()): boolean {
    let diff = this.startTime.getTime() - from.getTime();
    const ONE_MINUTE = -60 * 1000;
    return diff < ONE_MINUTE;
  }
}
//#endregion

//#region Enums and Constants
enum RacingCategory {
  Greyhound = 'Greyhound',
  Harness = 'Harness',
  Horse = 'Horse',
  Unknown = 'Unknown',
}

const RACING_CATEGORIES: { [id: string]: RacingCategory } = {
  '9daef0d7-bf3c-4f50-921d-8e818c60fe61': RacingCategory.Greyhound,
  '161d9be2-e909-4326-8c2c-35ed71fb460b': RacingCategory.Harness,
  '4a2788f8-e825-4d36-9894-efd4baf1cfae': RacingCategory.Horse,
}

const Constants = {
  fontSizeTitle: 32,
  fontSizeRow: 18,
  fontWeightTitle: '700',
  fontWeightRow: '600',
  paddingHorizontal: 20,
  paddingVertical: 10,
}
//#endregion

//#region Components
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
}

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

const FilterGroup: React.FC<{
  options: string[],
  onFilterChange?: (selectedOptions: string[]) => void | Promise<void>,
}> = ({ options, onFilterChange }) => {

  const [filter, setFilter] = useState<boolean[]>(Array<boolean>(options.length));
  useEffect(() => {
    let selectedOptions = options.filter((_, index) => filter[index]);
    if (onFilterChange) onFilterChange(selectedOptions);
  }, [filter]);

  return (
    <View>
      {options.map((item, index) => (
        <FilterItem
          key={index}
          title={item}
          value={filter[index]}
          onValueChange={(value) => {
            let newFilter = [...filter];
            newFilter[index] = value;
            if (newFilter.every(item => item === false)) {
              newFilter = newFilter.map(item => true);
            }
            setFilter(newFilter);
          }} />
      ))
      }
    </View>
  );
}
//#endregion

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
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
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
