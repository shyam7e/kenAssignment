import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {instance, headers} from '../services/api';
import {NAPSTER_API_KEY, BASE_URL} from '@env';
import AlbumCard from '../components/Cards/AlbumCard';
const AlbumListingScreen = () => {
  useEffect(() => {
    instance
      .get('/albums/new')
      .then(res => {
        console.log('ress', res);
        setDatas(res.data.albums);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('error', err);
        setIsLoading(false);
      });
  }, []);
  const [refresh, setRefresh] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: '#121212'}}>
          <Text style={styles.heading}>Top albums</Text>
          <FlatList
            data={datas}
            renderItem={({item}) => <AlbumCard item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AlbumListingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},
  button: {
    backgroundColor: 'pink',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Gotham Rounded Bold',
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 45,
    marginBottom: 16,
  },
});
