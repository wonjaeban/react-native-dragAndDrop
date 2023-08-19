/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  type Item = {
    key: string;
    label: string;
    height: number;
    width: number;
    backgroundColor: string;
  };
  const NUM_ITEMS = 10;

  function getColor(i: number) {
    const multiplier = 255 / (NUM_ITEMS - 1);
    const colorVal = i * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
  }

  const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
    const backgroundColor = getColor(index);
    return {
      key: `item-${index}`,
      label: String(index) + '',
      height: 100,
      width: 60 + Math.random() * 40,
      backgroundColor,
    };
  });

  const [originalData, setOriginalData] = useState(initialData);

  const [data, setData] = useState(initialData);

  const deleteItem = (item: Item) => {
    const newData = data.filter(each => each.key !== item.key);
    setData(newData);
  };

  const cancle = () => {
    setData(originalData);
  };

  const decide = () => {
    setOriginalData(data);
  };

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    console.log(item);
    return (
      <ScaleDecorator>
        <View
          // onLongPress={drag}
          // disabled={isActive}
          style={[styles.rowItem, {backgroundColor: item.backgroundColor}]}>
          <Text style={styles.text}>{item.label}</Text>
          <TouchableOpacity onPressIn={drag} style={{marginTop: 20}}>
            <Text>이동</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteItem(item)} style={{}}>
            <Text style={{marginTop: 20}}>삭제</Text>
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TouchableOpacity
        onPress={cancle}
        style={{alignItems: 'flex-end', marginTop: 10}}>
        <Text>수정안함</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={decide}
        style={{alignItems: 'flex-end', marginTop: 10}}>
        <Text>수정</Text>
      </TouchableOpacity>
      <DraggableFlatList
        data={data}
        onDragEnd={({data}) => setData(data)}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 120,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
