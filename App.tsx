/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ScrollView, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ScrollView>
        <Text>Edruk Court</Text>
      </ScrollView>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({});

export default App;
