/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ScrollView, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Edruk Court</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({});

export default App;
