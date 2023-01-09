import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const TrackCard = ({item, imageUrl, allTracks, currentTrackIndex}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.push('IndividualSongScreen', {
      item: item,
      imageUrl: imageUrl,
      allTracks: allTracks,
      currentTrackIndex: currentTrackIndex,
    });
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <View style={styles.image}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{width: 80, height: 80, borderRadius: 40, margin: 8}}
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
        {item?.playbackSeconds && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Track duration : </Text>
            {moment.utc(item.playbackSeconds * 1000).format('mm:ss')}
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
