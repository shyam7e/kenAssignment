import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {instance} from '../services/api';
import AlbumCard from '../components/Cards/AlbumCard';

const IndividualAlbumScreen = ({route}) => {
  const {item} = route.params;
  useEffect(() => {
    instance
      .get(`/albums/${item.id}/tracks`)
      .then(res => {
        console.log('albumTracks', res);
        setDatas(res.data.tracks);
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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{flex: 1}}>
          <Image
            source={{
              uri: `https://api.napster.com/imageserver/v2/albums/${item.id}/images/500x500.jpg`,
            }}
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.5,
              position: 'absolute',
              top: 0,
            }}
          />
          <FlatList
            data={datas}
            renderItem={({item}) => <AlbumCard item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default IndividualAlbumScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  infoText: {
    fontSize: 24,
    backgroundColor: '#0000',
    padding: 16,
  },
});
