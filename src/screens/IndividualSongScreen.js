import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import TrackPlayer, {Capability, State} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import PrevIcon from '../assets/Icons/skip-prev.svg';
import PlayIcon from '../assets/Icons/play-button.svg';
import PauseIcon from '../assets/Icons/pause-button.svg';
import ForwardIcon from '../assets/Icons/forward-fast.svg';
const IndividualSongScreen = ({route}) => {
  const {item, imageUrl} = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackDuration, setTrackDuration] = useState('');
  const [trackPositon, setTrackPosition] = useState(0);
  useEffect(() => {
    console.log('track', item);
    setupTrackPlayer();
    // return () => {
    //   TrackPlayer.destroy();
    // };
  }, []);
  const setupTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [Capability.Play, Capability.Pause],
      });
      TrackPlayer.addEventListener('playback-position', handleTrackPosition);
      await TrackPlayer.add([
        {
          title: item.name,
          album: item.albumName,
          id: item.id,
          duration: item.playbackSeconds,
          artwork: imageUrl,
          url: item.previewURL,
          artist: item.artistName,
        },
      ]);

      getPlayerTime();
    } catch (e) {
      console.log(e);
    }
  };
  const handleTrackPosition = async () => {
    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    setTrackPosition(position);
    setTrackDuration(duration);
  };
  const getPlayerTime = async () => {
    const time = await TrackPlayer.getDuration();
    setTrackDuration(time);
    console.log('duration', time);
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  };
  const handleForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 5);
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <View style={styles.playerControlContainer}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.artistName}>{item.artistName}</Text>
        <View style={{marginTop: 16}}>
          <View style={{paddingHorizontal: 6}}>
            <Slider
              value={trackPositon}
              minimunTrackTintColor={'#FFFFFF'}
              thumbTintColor={'#FFFFFF'}
            />
          </View>
          <View style={styles.timeStamp}>
            <Text style={styles.timeText}>1:00</Text>
            <Text style={styles.timeText}>{trackDuration}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity>
              <PrevIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </TouchableOpacity>
            <TouchableOpacity>
              <PrevIcon style={{transform: [{rotateY: '180deg'}]}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForward}>
              <ForwardIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default IndividualSongScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end'},
  songName: {
    color: '#ffffff',
    fontSize: 24,
    paddingHorizontal: 16,
    fontWeight: 600,
  },
  artistName: {
    color: '#ffffff',
    paddingHorizontal: 16,
  },
  timeStamp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  timeText: {
    color: '#d3d3d3',
  },
  playerControlContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    // height: '20%',
    marginBottom: 20,
    padding: 10,
    elevation: 4,
  },
});
