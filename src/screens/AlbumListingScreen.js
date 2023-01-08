import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import napsterApi from '../services/api';

const AlbumListingScreen = () => {
  useEffect(() => {
    napsterApi
      .get('/')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View>
      <Text>AlbumListingScreen</Text>
    </View>
  );
};

export default AlbumListingScreen;

const styles = StyleSheet.create({});
