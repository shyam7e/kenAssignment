import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Player from '../components/Player';
const IndividualSongScreen = ({route}) => {
  const {item, imageUrl, allTracks, trackIndex} = route.params;
  const [currentTrack, setCurrentTrack] = useState({
    title: item.name,
    album: item.albumName,
    id: trackIndex,
    duration: item.playbackSeconds,
    artwork: imageUrl,
    url: item.previewURL,
    artist: item.artistName,
  });
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: imageUrl,
          priority: FastImage.priority.high,
        }}
        style={styles.imageStyle}
      />
      <Player
        item={item}
        allTracks={allTracks}
        trackIndex={trackIndex}
        imageUrl={imageUrl}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
    </View>
  );
};

export default IndividualSongScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end'},
  imageStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
