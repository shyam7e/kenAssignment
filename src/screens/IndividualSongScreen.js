import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
  RepeatMode,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import PrevIcon from '../assets/Icons/skip-prev.svg';
import PlayIcon from '../assets/Icons/play-button.svg';
import PauseIcon from '../assets/Icons/pause-button.svg';
import ForwardIcon from '../assets/Icons/forward-fast.svg';
import moment from 'moment';
const IndividualSongScreen = ({route}) => {
  const {item, imageUrl, allTracks, currentTrackIndex} = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const playBackState = usePlaybackState();
  const progress = useProgress();
  useEffect(() => {
    console.log('track', item);
    setupTrackPlayer();
  }, []);

  const setupTrackPlayer = async () => {
    var allSongs = allTracks.map((item, index) => ({
      title: item.name,
      album: item.albumName,
      id: index,
      duration: item.playbackSeconds,
      artwork: imageUrl,
      url: item.previewURL,
      artist: item.artistName,
    }));
    try {
      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      var queue = await TrackPlayer.getQueue();
      if (queue.length > 0) {
        await TrackPlayer.reset();
        await TrackPlayer.add(allSongs);
        await TrackPlayer.skip(currentTrackIndex);
        await TrackPlayer.play();
      } else {
        await TrackPlayer.add(allSongs);
        await TrackPlayer.play();
      }

      setIsPlaying(true);
      getPlayerTime();
    } catch (e) {
      console.log(e);
    }
  };

  const getPlayerTime = async () => {
    const time = await TrackPlayer.getDuration();
    setTrackDuration(time);
    console.log('duration', time);
  };

  const handlePlayPause = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playBackState == State.Paused) {
        await TrackPlayer.play();
        setIsPlaying(true);
      } else {
        await TrackPlayer.pause();
        setIsPlaying(false);
      }
    }
  };
  const handleForward = async () => {
    if (progress.position + 5 < progress.duration)
      await TrackPlayer.seekTo(progress.position + 5);
  };
  const skipToNext = () => {
    // setCurrentTrack(Tracks[i+1])
  };

  const skipToPrevious = () => {
    // setCurrentTrack(Tracks[i-1])
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
              value={progress.position}
              minimunTrackTintColor={'#FFFFFF'}
              thumbTintColor={'#FFFFFF'}
              minimumValue={0}
              maximumValue={progress.duration}
              onSlidingComplete={async value => {
                await TrackPlayer.seekTo(value);
              }}
            />
          </View>
          <View style={styles.timeStamp}>
            <Text style={styles.timeText}>
              {moment.utc(progress.position * 1000).format('mm:ss')}
            </Text>
            <Text style={styles.timeText}>
              {moment.utc(progress.duration * 1000).format('mm:ss')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 12,
            }}>
            <TouchableOpacity onPress={skipToPrevious}>
              <PrevIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePlayPause(playBackState)}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToNext}>
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
    padding: 10,
    elevation: 4,
  },
});
