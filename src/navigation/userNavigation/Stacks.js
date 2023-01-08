import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  IndividualAlbumScreen,
  IndividualSongScreen,
  AlbumListingScreen,
} from '../../screens/ScreenExports';
import {createStackNavigator} from '@react-navigation/stack';

const Stacks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AlbumListingScreen"
        component={AlbumListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IndividualAlbumScreen"
        component={IndividualAlbumScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IndividualSongScreen"
        component={IndividualSongScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
