import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Foo from './Foo';
import Red from './Red';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SearchBar placeholder="Type Here..." lightTheme round /> */}
      <Red />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
});
