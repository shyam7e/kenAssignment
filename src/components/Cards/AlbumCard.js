import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {memo, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Colors from '../../styles/colors';
const AlbumCard = ({item}) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.push('IndividualAlbumScreen', {item: memoizedItem});
  };
  const memoizedItem = useMemo(() => item, [item]);
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <View style={styles.image}>
        <FastImage
          source={{
            uri: `https://api.napster.com/imageserver/v2/albums/${memoizedItem.id}/images/500x500.jpg`,
            priority: FastImage.priority.high,
          }}
          style={{width: '100%', height: 120, borderRadius: 4}}
        />
      </View>
      <View style={styles.info}>
        {memoizedItem?.name && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Album name : </Text>
            {memoizedItem.name}
          </Text>
        )}
        {memoizedItem?.artistName && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Artist name : </Text>
            {memoizedItem.artistName}
          </Text>
        )}
        {memoizedItem?.trackCount && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Tracks : </Text>
            {memoizedItem.trackCount}
          </Text>
        )}
        {memoizedItem?.released && (
          <Text style={styles.infoText}>
            <Text style={styles.textHeading}>Release : </Text>
            {moment(memoizedItem.released).format('MMM YYYY')}
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
    color: Colors.white,
    fontFamily: 'VarelaRound-Regular',
  },
  textHeading: {
    fontWeight: '600',
    color: Colors.primary,
  },
});
