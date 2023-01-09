import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const AlbumCard = ({item}) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {};

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('IndividualAlbumScreen', {item: item});
      }}>
      <View style={styles.image}>
        <Image
          source={{
            uri: `https://api.napster.com/imageserver/v2/albums/${item.id}/images/500x500.jpg`,
          }}
          style={{width: '100%', height: 120, borderRadius: 4}}
        />
      </View>
      <View style={styles.info}>
        {item?.name && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Album name : </Text>
            {item.name}
          </Text>
        )}
        {item?.artistName && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Artist name : </Text>
            {item.artistName}
          </Text>
        )}
        {item?.trackCount && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Tracks : </Text>
            {item.trackCount}
          </Text>
        )}
        {item?.label && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Label : </Text>
            {item.label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(AlbumCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    // height: 80,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 4,
    fontFamily: 'VarelaRound-Regular',
    flexDirection: 'row',
    padding: 2,
  },
  image: {
    backgroundColor: '#424242',
    width: 120,
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
    fontWeight: '600',
    color: '#d3d3d3',
  },
});
