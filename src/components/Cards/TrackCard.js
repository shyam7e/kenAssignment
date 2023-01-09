import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const TrackCard = ({item, imageUrl}) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('IndividualSongScreen', {
      item: item,
      imageUrl: imageUrl,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <View style={styles.image}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{width: '100%', height: 80, borderRadius: 4}}
        />
      </View>
      <View style={styles.info}>
        {item?.name && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Track name : </Text>
            {item.name}
          </Text>
        )}
        {item?.artistName && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Artist name : </Text>
            {item.artistName}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(TrackCard);

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
    width: 80,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  info: {
    backgroundColor: '#111427',
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
