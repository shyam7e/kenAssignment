import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {instance} from '../../services/api';
import {useNavigation} from '@react-navigation/native';

const AlbumCard = ({item}) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('IndividualAlbumScreen', {item});
  };
  // useEffect(() => {
  //   instance
  //     .get(`/albums/${item.id}/images`)
  //     .then(res => {
  //       console.log('images', res);
  //       setImages(res.images);
  //       setImage(res.images[0]);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //       setIsLoading(false);
  //     });
  // }, []);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      {/* <Image
          source={{
            uri: `${item.links.images.href}?apikey=${NAPSTER_API_KEY}&format=json`,
          }}
          style={{height: 60, width: 60}}
        /> */}
      <View style={styles.image}>
        <Image
          source={{
            uri: `https://api.napster.com/imageserver/v2/albums/${item.id}/images/500x500.jpg`,
          }}
          style={{width: 80, height: 60}}
        />
        {/* <Image
          source={{
            uri: item.href,
          }}
          style={{width: 80, height: 60}}
        /> */}
      </View>
      <View style={styles.info}>
        {item?.name && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Album name : </Text>
            {item.name}
          </Text>
        )}
        {item?.name && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Artist name : </Text>
            {item.artistName}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    height: 80,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 4,
    fontFamily: 'VarelaRound-Regular',
    flexDirection: 'row',
    padding: 2,
  },
  image: {
    backgroundColor: '#424242',
    width: 100,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  info: {
    backgroundColor: '#424242',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
    borderRadius: 4,
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'VarelaRound-Regular',
  },
  textHeading: {
    fontWeight: 'bold',
  },
});
