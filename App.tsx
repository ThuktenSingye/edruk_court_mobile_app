/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from './app/constant/designTokens';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.test}>Edruk Court</Text>
      </SafeAreaView>
      {/* <ScrollView></ScrollView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  test: {
    color: COLORS.primary,
  },
});

export default App;
