import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
  RepeatMode,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import PrevIcon from '../assets/Icons/skip-prev.svg';
import PlayIcon from '../assets/Icons/play-button.svg';
import PauseIcon from '../assets/Icons/pause-button.svg';
import ForwardIcon from '../assets/Icons/forward-fast.svg';
import moment from 'moment';

const Player = ({
  allTracks,
  trackIndex,
  imageUrl,
  currentTrack,
  setCurrentTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playBackState = usePlaybackState();
  const progress = useProgress();

  const [currentTrackIndex, setCurrentTrackIndex] = useState(trackIndex);
  useEffect(() => {
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
    } catch (e) {
      console.log(e);
    }
  };

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
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
  const skipToNext = async () => {
    const queue = await TrackPlayer.getQueue();
    if (queue.length > 1) {
      if (currentTrackIndex + 1 <= queue.length - 1) {
        await skipTo(currentTrackIndex + 1);
        const track = await TrackPlayer.getTrack(currentTrackIndex + 1);
        setCurrentTrack(track);
        setCurrentTrackIndex(track.id);
      } else {
        const track = await TrackPlayer.getTrack(0);
        skipTo(0);
        setCurrentTrack(track);
        setCurrentTrackIndex(0);
      }
    } else {
      Alert.alert("There's no next song in the album");
    }
  };

  const skipToPrevious = async () => {
    const queue = await TrackPlayer.getQueue();
    if (queue.length > 1) {
      if (currentTrackIndex - 1 >= 0) {
        await skipTo(currentTrackIndex - 1);
        const track = await TrackPlayer.getTrack(currentTrackIndex - 1);
        setCurrentTrack(track);
        setCurrentTrackIndex(track.id);
      } else {
        const track = await TrackPlayer.getTrack(queue.length - 1);
        skipTo(track.id);
        setCurrentTrack(track);
        setCurrentTrackIndex(track.id);
      }
    } else {
      Alert.alert("There's no previous song in the album");
    }
  };

  return (
    <View style={styles.playerControlContainer}>
      <Text style={styles.songName}>{currentTrack.title}</Text>
      <Text style={styles.artistName}>{currentTrack.artist}</Text>
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
  );
};

export default Player;

const styles = StyleSheet.create({
  playerControlContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    elevation: 4,
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
});
