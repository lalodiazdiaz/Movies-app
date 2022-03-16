import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {apiY} from '../services/services';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoScreen = ({route, navigation}) => {
  const videoKey = route.params.videoKey;
  const poster = route.params.poster;
  const name = route.params.name;

  const [playing, setPlaying] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: `${poster}`}}
        resizeMode="cover"
        style={styles.image}>
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            textAlign: 'center',
            backgroundColor: 'black',
            marginBottom: 5,
          }}>
          {name}
        </Text>
        <YoutubePlayer
          height={'100%'}
          width={'100%'}
          play={playing}
          videoId={`${videoKey}`}
        />
      </ImageBackground>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '50%',
  },
});
