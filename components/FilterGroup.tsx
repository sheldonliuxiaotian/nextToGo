import React, { useEffect, useState } from 'react';
import {
  View,
} from 'react-native';
import FilterItem from './FilterItem';

const FilterGroup: React.FC<{
  options: string[],
  onFilterChange?: (selectedOptions: string[]) => void | Promise<void>,
}> = ({ options, onFilterChange }) => {

  const [filter, setFilter] = useState<boolean[]>(Array<boolean>(options.length).fill(true));

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
              newFilter = newFilter.fill(true);
            }
            setFilter(newFilter);
          }} />
      ))
      }
    </View>
  );
}

export default FilterGroup;