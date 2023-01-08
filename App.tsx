import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Stacks from './src/navigation/userNavigation/Stacks';
const App = () => {
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
