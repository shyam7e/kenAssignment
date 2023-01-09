import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Stacks from './src/navigation/userNavigation/Stacks';
import TrackPlayer from 'react-native-track-player';
const App = () => {
  useEffect(() => {
    setupPlayer();
  }, [])
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
