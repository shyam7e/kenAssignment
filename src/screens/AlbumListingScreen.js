import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {instance} from '../services/api';
import AlbumCard from '../components/Cards/AlbumCard';
import AlbumIcon from '../assets/Icons/albumIcon.svg';
import Colors from '../styles/colors';
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
      <View style={{flex: 1, backgroundColor: Colors.lightblack}}>
        <View style={styles.albumTextHeading}>
          <AlbumIcon />
          <Text style={styles.heading}>TOP Albums</Text>
        </View>
        <FlatList
          style={styles.flatListStyle}
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
            isLoading && (
              <ActivityIndicator size={'large'} color={Colors.white} />
            )
          }
          initialNumToRender={7}
        />
      </View>
    </SafeAreaView>
  );
};

export default AlbumListingScreen;

const styles = StyleSheet.create({
  container: {flex: 1},

  loaderContainer: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Gotham Rounded Bold',
    color: '#000000',
    fontSize: 25,
    textAlign: 'center',
  },
  flatListStyle: {
    backgroundColor: Colors.primary,
  },
  albumTextHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
  },
});
