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
  const pageSize = 10;
  const [refresh, setRefresh] = useState(false);
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/albums/new?limit=${pageSize}&offset=${page * pageSize}`)
      .then(res => {
        // setDatas([...datas, ...res.data.albums]);
        if (res.data.albums.length > 0) {
          setDatas([...datas, ...res.data.albums]);
        } else {
          setDatas(res.data.albums);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log('error', err);
        setIsLoading(false);
      });
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: '#212121'}}>
        <Text style={styles.heading}>Top Albumsds</Text>
        <FlatList
          style={{backgroundColor: '#d3d3d3'}}
          data={datas}
          renderItem={({item}) => <AlbumCard item={item} />}
          keyExtractor={(item, key) => key}
          onEndReached={() => {
            if (!isLoading) {
              setPage(page + 1);
              setRefresh(!refresh);
              console.log(page + 1);
            }
          }}
          onEndReachedThreshold={0.7}
          extraData={datas}
          ListFooterComponent={
            isLoading && <ActivityIndicator size={'large'} color="#FFFFFF" />
          }
          initialNumToRender={7}
        />
      </View>
      {/* )} */}
    </SafeAreaView>
  );
};

export default AlbumListingScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},

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
