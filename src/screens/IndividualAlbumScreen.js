import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {instance} from '../services/api';
import TrackCard from '../components/Cards/TrackCard';
import Colors from '../styles/colors';

const IndividualAlbumScreen = ({route}) => {
  const {item} = route.params;
  const {height} = Dimensions.get('window');
  const [imageUrl, setImageUrl] = useState('');
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/albums/${item.id}/tracks`)
      .then(res => {
        setDatas(res.data.tracks);
        setImageUrl(
          `https://api.napster.com/imageserver/v2/albums/${item.id}/images/500x500.jpg`,
        );
        setIsLoading(false);
      })
      .catch(err => {
        console.log('error', err);
        setIsLoading(false);
      });
  }, []);
  function renderItem({item, index}) {
    return (
      <TrackCard
        item={item}
        imageUrl={imageUrl}
        allTracks={datas}
        currentTrackIndex={index}
      />
    );
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.white} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={true}
          style={styles.flatlistStyle}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll={true}
          ListHeaderComponent={() => (
            <View style={{zIndex: -10}}>
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={{
                  width: '100%',
                  height: height / 2,
                  zIndex: -1,
                }}
              />
            </View>
          )}
          data={datas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
};

export default IndividualAlbumScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#424242', alignItems: 'center'},
  infoText: {
    fontSize: 24,
    backgroundColor: '#0000',
    padding: 16,
  },
  loaderContainer: {width: '100%', height: '100%', justifyContent: 'center'},
  flatlistStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.lightblack2,
  },
});
